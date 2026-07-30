import bcrypt from 'bcrypt';
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

// Función de hashing usando bcrypt
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

const sqlTabla = `
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    rol VARCHAR(20) DEFAULT 'admin' CHECK (rol IN ('admin', 'viewer')),
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

async function setupUsuarios() {
  try {
    await db.connect();
    console.log("✅ Conectado a PostgreSQL para configurar tabla de usuarios.");

    await db.query(sqlTabla);
    console.log("✅ Tabla 'usuarios' creada o ya existente.");

    // Insertar usuario admin por defecto (solo si no existe)
    const existe = await db.query("SELECT id FROM usuarios WHERE usuario = 'admin'");

    if (existe.rows.length === 0) {
      const passwordDefault = 'CWM_Admin_2026!';
      const hash = hashPassword(passwordDefault);

      await db.query(
        "INSERT INTO usuarios (usuario, password_hash, rol) VALUES ($1, $2, $3)",
        ['admin', hash, 'admin']
      );

      console.log("\n================================================================");
      console.log("✅ Usuario administrador creado exitosamente:");
      console.log("================================================================");
      console.log("   👤 Usuario:    admin");
      console.log(`   🔑 Contraseña: ${passwordDefault}`);
      console.log("================================================================");
      console.log("\n⚠️  IMPORTANTE: Cambia esta contraseña después del primer inicio de sesión.");
      console.log("   Puedes volver a ejecutar este script con una contraseña diferente.\n");
    } else {
      console.log("ℹ️  El usuario 'admin' ya existe en la base de datos. No se realizaron cambios.");
    }

  } catch (error) {
    console.error("❌ Error durante la configuración de usuarios:", error);
  } finally {
    await db.end();
  }
}

setupUsuarios();
