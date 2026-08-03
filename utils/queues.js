import { Queue, Worker } from 'bullmq';
import { spawn } from 'child_process';
import Redis from 'ioredis';
import { autoMapearProveedores } from './aiAccounting.js';
import { reclamarComplementosPendientes } from './repClaimer.js';

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
  
  return new Promise((resolve, reject) => {
    let command = '';
    if (job.name === 'downloadSat') {
      command = 'node index.js';
      if (job.data && job.data.fechaInicio && job.data.fechaFin) {
        command += ` "${job.data.fechaInicio}" "${job.data.fechaFin}" "${job.data.estatus || 'active'}"`;
      }
    }
    else if (job.name === 'verifySat') command = 'node verify.js';
    else if (job.name === 'reclamarREPs') {
       reclamarComplementosPendientes().then(resolve).catch(reject);
       return;
    }
    
    if (!command) return resolve('Trabajo desconocido');

    const child = spawn(command, { shell: true });
    
    child.stdout.on('data', data => {
      process.stdout.write(data);
      // Opcional: Emitir a WebSocket globalmente (requeriría pasar io)
    });
    
    child.stderr.on('data', data => {
      process.stderr.write(data);
    });

    child.on('close', (code) => {
      if (code === 0) resolve(`Trabajo ${job.name} completado con éxito`);
      else reject(new Error(`Trabajo ${job.name} falló con código ${code}`));
    });
  });
}, { connection, concurrency: 1 }); // Solo un trabajo a la vez para no saturar al SAT

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
