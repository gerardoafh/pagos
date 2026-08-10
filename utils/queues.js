import { Queue, Worker } from 'bullmq';
import { spawn } from 'child_process';
import Redis from 'ioredis';
import pg from 'pg';
import { autoMapearProveedores } from './aiAccounting.js';
import { reclamarComplementosPendientes } from './repClaimer.js';

let ioInstance = null;
export function setIoForQueues(io) {
  ioInstance = io;
}

const { Client } = pg;
const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, 
  port: parseInt(process.env.DB_PORT || '5433', 10),
});
db.connect().catch(err => console.error("Error conectando a BD en queues.js:", err));

// En Docker, el contenedor de redis se llama "redis". En local, localhost.
const redisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  maxRetriesPerRequest: null
};

export const connection = new Redis(redisOptions);

export const satQueue = new Queue('satQueue', { connection });
export const nasQueue = new Queue('nasQueue', { connection });
export const aiQueue = new Queue('aiQueue', { connection });

// ── WORKERS DEL API ─────────────────────────────────────────────────────────────
// Procesan los trabajos encolados que corren en el servidor principal (SAT)

const satWorker = new Worker('satQueue', async (job) => {
  console.log(`[Worker SAT] Iniciando trabajo ${job.name} (Job ID: ${job.id})`);
  
  return new Promise(async (resolve, reject) => {
    const rfcList = [];
    if (job.data && job.data.rfc) {
      rfcList.push(job.data.rfc);
    } else {
      try {
        const res = await db.query('SELECT rfc FROM empresas WHERE activa = true');
        rfcList.push(...res.rows.map(r => r.rfc));
      } catch (err) {
        return reject(new Error('Error al consultar empresas en DB'));
      }
    }

    if (rfcList.length === 0) return resolve('No hay empresas activas');

    let baseCommand = '';
    if (job.name === 'downloadSat') baseCommand = 'node index.js';
    else if (job.name === 'verifySat') baseCommand = 'node verify.js';
    else if (job.name === 'reclamarREPs') {
       reclamarComplementosPendientes().then(resolve).catch(reject);
       return;
    }
    
    if (!baseCommand) return resolve('Trabajo desconocido');

    const runProcess = (rfc) => {
      return new Promise((res, rej) => {
        let command = `${baseCommand} ${rfc}`;
        if (job.name === 'downloadSat' && job.data && job.data.fechaInicio && job.data.fechaFin) {
          command += ` "${job.data.fechaInicio}" "${job.data.fechaFin}" "${job.data.estatus || 'active'}"`;
        }

        console.log(`[Worker SAT] Ejecutando: ${command}`);
        const child = spawn(command, { shell: true });
        
        child.stdout.on('data', data => {
          const str = data.toString();
          process.stdout.write(`[${rfc}] ` + str);
          if (ioInstance) {
            str.split('\n').filter(l => l.trim()).forEach(line => {
              ioInstance.emit('process-log', { tarea: job.name, linea: line, ts: new Date().toISOString() });
            });
          }
        });
        
        child.stderr.on('data', data => {
          const str = data.toString();
          process.stderr.write(`[${rfc}] ERROR: ` + str);
          if (ioInstance) {
            str.split('\n').filter(l => l.trim()).forEach(line => {
              ioInstance.emit('process-log', { tarea: job.name, linea: `❌ ${line}`, ts: new Date().toISOString() });
            });
          }
        });

        child.on('close', (code) => {
          if (code === 0) res();
          else rej(new Error(`Comando ${command} falló con código ${code}`));
        });
      });
    };

    // Run sequentially
    (async () => {
      try {
        for (const rfc of rfcList) {
          await runProcess(rfc).catch(err => console.error(`[Worker SAT] Error procesando ${rfc}:`, err.message));
        }
        resolve(`Trabajo ${job.name} completado para ${rfcList.length} empresas`);
      } catch (error) {
        reject(error);
      }
    })();
  });
}, { connection, concurrency: 1, lockDuration: 300000 }); // Solo un trabajo a la vez para no saturar al SAT

// Manejo de errores
satWorker.on('failed', (job, err) => console.error(`[Worker SAT] Trabajo ${job.id} falló:`, err));

// ── INICIALIZACIÓN DE JOBS RECURRENTES ────────────────────────────────
export async function setupRepeatableJobs() {
  console.log('⏰ Programando tareas automáticas en BullMQ (Redis)...');

  // Pedir facturas al SAT (1:00 AM)
  await satQueue.add('downloadSat', {}, {
    repeat: { pattern: '0 1 * * *' }
  });

  // Verificar y Descargar paquetes (2:00 AM)
  await satQueue.add('verifySat', {}, {
    repeat: { pattern: '0 2 * * *' }
  });

  // Barrer el NAS y armar expedientes IA (3:00 AM)
  await nasQueue.add('scanNas', {}, {
    repeat: { pattern: '0 3 * * *' }
  });

  // Zero-Touch Accounting: Clasificación automática (4:00 AM)
  await aiQueue.add('zeroTouchAccounting', {}, {
    repeat: { pattern: '0 4 * * *' }
  });

  // Tarea: Autoreclamo de REP a proveedores (Cada viernes a las 10:00 AM)
  await satQueue.add('reclamarREPs', {}, {
    repeat: { pattern: '0 10 * * 5' },
    jobId: 'reclamar-reps-job'
  });

  console.log('✅ Tareas automáticas en BullMQ configuradas (1:00 AM, 2:00 AM, 3:00 AM, 4:00 AM).');
}
