import db from './config/db.js';

// Cargar variables de entorno nativas (.env)
process.loadEnvFile();

async function runMigration() {
  try {
    console.log("Conectando a la base de datos para la migración Multi-Empresa...");
    await db.connect();

    console.log("Añadiendo columna rfc_receptor a facturas_recibidas...");
    
    await db.query(`
      ALTER TABLE facturas_recibidas 
      ADD COLUMN IF NOT EXISTS rfc_receptor VARCHAR(13);
    `);

    // Asignar un RFC por defecto a los registros existentes para mantener consistencia
    console.log("Asignando RFC por defecto a registros existentes (adEMPRESANUEVACHEONG -> CWM1410313RA por ejemplo)...");
    await db.query(`
      UPDATE facturas_recibidas 
      SET rfc_receptor = 'CWM1410313RA' 
      WHERE rfc_receptor IS NULL;
    `);

    console.log("Migración Multi-Empresa completada con éxito.");
  } catch (error) {
    console.error("Error en la migración:", error);
  } finally {
    await db.end();
  }
}

runMigration();
