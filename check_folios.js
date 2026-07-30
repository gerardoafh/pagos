import pg from 'pg';
import path from 'path';

// Cargar variables de entorno nativas (.env)
process.loadEnvFile();

import { conectarRedNas } from './utils/nasHandler.js';

const db = new pg.Pool({
  user: process.env.DB_USER,
  host: '127.0.0.1',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5433', 10),
});

async function check() {
  console.log("Autorizando acceso al NAS...");
  conectarRedNas(process.env.EXPEDIENTES_PATH.replace(/['"]/g, ''));
  try {
    const result = await db.query(`
      SELECT fecha_emision, nombre_emisor, uuid, folio_interno 
      FROM facturas_recibidas 
      ORDER BY fecha_emision DESC 
      LIMIT 5
    `);
    console.table(result.rows);

    const fs = await import('fs/promises');
    for (const row of result.rows) {
      const fecha = new Date(row.fecha_emision);
      const anio = fecha.getFullYear().toString();
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      // Encontrar el RFC del emisor para la ruta
      const rfcResult = await db.query('SELECT rfc_emisor, url_expediente FROM facturas_recibidas WHERE uuid = $1', [row.uuid]);
      const rfc = rfcResult.rows[0].rfc_emisor;
      const urlExpediente = rfcResult.rows[0].url_expediente;
      
      console.log(`UUID: ${row.uuid}`);
      console.log(`-> DB url_expediente: ${urlExpediente || 'NULL (No hay archivo asignado en la BD)'}`);
    }

  } catch(e) {
    console.error(e);
  } finally {
    db.end();
  }
}

check();
