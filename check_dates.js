import pg from 'pg';
import path from 'path';

process.loadEnvFile();

const db = new pg.Pool({
  user: process.env.DB_USER,
  host: '127.0.0.1',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5433', 10),
});

async function run() {
  const result = await db.query(`
    SELECT uuid, nombre_emisor, fecha_emision 
    FROM facturas_recibidas 
    WHERE uuid IN ('e7a358be-8d7e-42cf-baf8-deda5fc91a9d', '6374f095-32f3-dc45-8744-dbe932c1d9c7')
  `);
  console.table(result.rows);
  db.end();
}

run();
