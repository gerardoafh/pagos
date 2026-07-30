import db from './config/db.js';

async function runMigration() {
  try {
    console.log("Conectando a la base de datos para la migración...");
    await db.connect();

    console.log("Añadiendo columnas (subtotal, iva, retenciones, aprobado) a facturas_recibidas...");
    
    await db.query(`
      ALTER TABLE facturas_recibidas 
      ADD COLUMN IF NOT EXISTS subtotal numeric,
      ADD COLUMN IF NOT EXISTS iva numeric,
      ADD COLUMN IF NOT EXISTS iva_retenido numeric,
      ADD COLUMN IF NOT EXISTS isr_retenido numeric,
      ADD COLUMN IF NOT EXISTS aprobado boolean DEFAULT false;
    `);

    console.log("Migración completada con éxito.");
  } catch (error) {
    console.error("Error en la migración:", error);
  } finally {
    await db.end();
  }
}

runMigration();
