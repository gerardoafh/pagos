import pg from 'pg';
import path from 'path';

// Asegurarse de cargar las variables de entorno
if (!process.env.DB_USER) {
  process.loadEnvFile(path.join(process.cwd(), '.env'));
}

const db = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5433', 10),
});

db.on('error', (err) => {
  console.error('Error inesperado en PostgreSQL client:', err);
});

export default db;
