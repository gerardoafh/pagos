import pg from 'pg';

// Cargar variables de entorno nativas (.env)
process.loadEnvFile();

const { Client } = pg;

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5433', 10),
});

const sqlQueries = `
-- 1. Tabla para almacenar el listado del Art. 69-B (EFOS)
CREATE TABLE IF NOT EXISTS sat_efos (
    rfc VARCHAR(13) PRIMARY KEY,
    nombre_contribuyente VARCHAR(255),
    situacion VARCHAR(50), -- Ej. 'Definitivo', 'Presunto'
    fecha_publicacion DATE
);

-- 2. Agregar banderas de seguridad a las facturas
ALTER TABLE facturas_recibidas ADD COLUMN IF NOT EXISTS alerta_efos BOOLEAN DEFAULT FALSE;
ALTER TABLE facturas_recibidas ADD COLUMN IF NOT EXISTS estatus_fiscal VARCHAR(20) DEFAULT 'vigente';
`;

async function setupEfos() {
  try {
    await db.connect();
    console.log("✅ Conectado a PostgreSQL para configurar auditoría EFOS.");
    await db.query(sqlQueries);
    console.log("✅ Tabla 'sat_efos' y columnas de seguridad creadas exitosamente.");
  } catch (error) {
    console.error("❌ Error configurando auditoría fiscal:", error);
  } finally {
    await db.end();
  }
}

setupEfos();