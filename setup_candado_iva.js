import pg from 'pg';

// Cargar variables de entorno
process.loadEnvFile();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5433', 10),
});

async function setupCandado() {
  try {
    await db.connect();
    console.log("✅ Conectado a PostgreSQL para configurar Candado IVA (PPD vs PUE).");
    
    await db.query(`ALTER TABLE facturas_recibidas ADD COLUMN IF NOT EXISTS metodo_pago VARCHAR(3) DEFAULT 'PUE';`);
    await db.query(`ALTER TABLE facturas_recibidas ADD COLUMN IF NOT EXISTS tiene_complemento BOOLEAN DEFAULT FALSE;`);
    
    console.log("✅ Columnas 'metodo_pago' y 'tiene_complemento' creadas con éxito.");
  } catch (error) {
    console.error("❌ Error configurando candado:", error);
  } finally {
    await db.end();
  }
}
setupCandado();