import { Worker } from 'bullmq';
import { spawn } from 'child_process';
import { connection, nasQueue, aiQueue } from './utils/queues.js';
import { autoMapearProveedores } from './utils/aiAccounting.js';
import { detectarAnomaliasPrecios } from './utils/aiAnomalies.js';

console.log("🚀 Iniciando AI/NAS Worker Dedicado...");

const nasWorker = new Worker('nasQueue', async (job) => {
  console.log(`[Worker NAS] Iniciando trabajo ${job.name} (Job ID: ${job.id})`);
  
  return new Promise((resolve, reject) => {
    if (job.name !== 'scanNas') return resolve('Trabajo desconocido');

    const child = spawn('node synology_scanner.js', { shell: true });
    
    child.stdout.on('data', data => process.stdout.write(data));
    child.stderr.on('data', data => process.stderr.write(data));

    child.on('close', (code) => {
      if (code === 0) resolve(`Trabajo ${job.name} completado con éxito`);
      else reject(new Error(`Trabajo ${job.name} falló con código ${code}`));
    });
  });
}, { connection, concurrency: 1, lockDuration: 300000 });

const aiWorker = new Worker('aiQueue', async (job) => {
  console.log(`[Worker AI] Iniciando trabajo ${job.name}`);
  if (job.name === 'zeroTouchAccounting') {
    await autoMapearProveedores();
    await detectarAnomaliasPrecios();
    return 'Clasificación contable y detección de anomalías exitosas';
  }
  return 'Trabajo desconocido';
}, { connection, concurrency: 1, lockDuration: 300000 });

nasWorker.on('failed', (job, err) => console.error(`[Worker NAS] Trabajo ${job.id} falló:`, err));
aiWorker.on('failed', (job, err) => console.error(`[Worker AI] Trabajo ${job.id} falló:`, err));

console.log("✅ Worker escuchando las colas NAS y AI...");
