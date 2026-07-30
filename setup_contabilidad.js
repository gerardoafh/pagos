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
-- 1. Catálogo de Cuentas Contables (Se queda igual)
CREATE TABLE IF NOT EXISTS cuentas_contables (
    id SERIAL PRIMARY KEY,
    codigo_cuenta VARCHAR(50) UNIQUE NOT NULL, 
    nombre_cuenta VARCHAR(150) NOT NULL,       
    tipo_cuenta VARCHAR(20) CHECK (tipo_cuenta IN ('activo', 'pasivo', 'capital', 'ingreso', 'gasto'))
);

-- 2. Mapeo por Proveedor (CORREGIDO)
CREATE TABLE IF NOT EXISTS configuracion_contable_proveedor (
    rfc_emisor VARCHAR(13) PRIMARY KEY, -- Solo es llave primaria aquí, sin REFERENCES
    cuenta_pasivo_id INT REFERENCES cuentas_contables(id), 
    cuenta_gasto_id INT REFERENCES cuentas_contables(id),  
    cuenta_iva_pendiente_id INT REFERENCES cuentas_contables(id) 
);

-- 3. Tabla para Pólizas (Diario y Egreso)
CREATE TABLE IF NOT EXISTS polizas (
    id SERIAL PRIMARY KEY,
    uuid_factura UUID REFERENCES facturas_recibidas(uuid),
    tipo_poliza VARCHAR(20) CHECK (tipo_poliza IN ('diario', 'egreso')),
    fecha DATE NOT NULL,
    concepto TEXT,
    creada_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla para los Movimientos de cada Póliza (Cargos y Abonos)
CREATE TABLE IF NOT EXISTS movimientos_poliza (
    id SERIAL PRIMARY KEY,
    poliza_id INT REFERENCES polizas(id) ON DELETE CASCADE,
    cuenta_id INT REFERENCES cuentas_contables(id),
    debe DECIMAL(14, 2) DEFAULT 0.00, -- Cargo
    haber DECIMAL(14, 2) DEFAULT 0.00, -- Abono
    concepto TEXT
);
`;

const sqlInsertCuentas = `
-- Insertar catálogo de cuentas base (Evita duplicados si ya existen por el ON CONFLICT)
INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta) VALUES
    ('102.01', 'Bancos Nacionales', 'activo'),
    ('118.01', 'IVA Acreditable Pagado', 'activo'),
    ('119.01', 'IVA Pendiente de Pago', 'activo'),
    ('201.01', 'Proveedores Nacionales', 'pasivo'),
    ('205.01', 'Acreedores Diversos', 'pasivo'),
    ('501.01', 'Costo por Servicios', 'gasto'),
    ('601.84', 'Papelería y Artículos de Oficina', 'gasto'),
    ('601.85', 'Mantenimiento de Equipo', 'gasto'),
    ('601.87', 'Honorarios Profesionales', 'gasto'),
    ('601.88', 'Servicios de Telefonía e Internet', 'gasto')
ON CONFLICT (codigo_cuenta) DO NOTHING;
`;

async function setupDatabase() {
  try {
    await db.connect();
    console.log("✅ Conectado a PostgreSQL para configurar tablas de contabilidad.");

    await db.query(sqlQueries);
    console.log("✅ Tablas de contabilidad creadas o ya existentes.");

    await db.query(sqlInsertCuentas);
    console.log("✅ Catálogo de cuentas estándar insertado correctamente.");

    console.log("\n💡 ¡Tablas y catálogo listos! Ahora ve a React a probar el Mapeo Contable.");

  } catch (error) {
    console.error("❌ Error durante la configuración de la base de datos contable:", error);
  } finally {
    await db.end();
  }
}

setupDatabase();
