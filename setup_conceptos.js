import pg from 'pg';

// Cargar variables de entorno nativas (.env)
process.loadEnvFile();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5433', 10),
});

async function setupConceptos() {
  try {
    await db.connect();
    console.log("✅ Conectado a PostgreSQL para crear tabla de Conceptos.");
    
    await db.query(`
      CREATE TABLE IF NOT EXISTS factura_conceptos (
        id SERIAL PRIMARY KEY,
        uuid_factura UUID REFERENCES facturas_recibidas(uuid) ON DELETE CASCADE,
        clave_prod_serv VARCHAR(20),
        no_identificacion VARCHAR(100),
        cantidad DECIMAL(14, 6),
        clave_unidad VARCHAR(20),
        unidad VARCHAR(100),
        descripcion TEXT,
        valor_unitario DECIMAL(18, 6),
        importe DECIMAL(18, 6),
        descuento DECIMAL(18, 6),
        objeto_imp VARCHAR(5)
      );
      
      -- Índice para búsquedas veloces cuando cruces reportes
      CREATE INDEX IF NOT EXISTS idx_concepto_uuid ON factura_conceptos(uuid_factura);
    `);
    
    console.log("✅ Tabla 'factura_conceptos' creada exitosamente.");
  } catch (error) {
    console.error("❌ Error configurando tabla de conceptos:", error);
  } finally {
    await db.end();
  }
}

setupConceptos();