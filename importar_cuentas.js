import fs from 'fs';
import path from 'path';
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

// Función inteligente para leer CSV ignorando comas dentro de textos entre comillas
function leerLineaCSV(texto) {
  const resultado = [];
  let actual = '';
  let entreComillas = false;
  for (let i = 0; i < texto.length; i++) {
    const char = texto[i];
    if (char === '"') entreComillas = !entreComillas;
    else if (char === ',' && !entreComillas) {
      resultado.push(actual.trim());
      actual = '';
    } else actual += char;
  }
  resultado.push(actual.trim());
  return resultado;
}

// Normalizar el tipo de cuenta de CONTPAQi a los 5 permitidos por PostgreSQL
function normalizarTipo(tipoCrudo) {
  const t = tipoCrudo || '';
  if (t.includes('activo')) return 'activo';
  if (t.includes('pasivo')) return 'pasivo';
  if (t.includes('capital')) return 'capital';
  if (t.includes('resultados acreedora')) return 'ingreso';
  if (t.includes('resultados deudora')) return 'gasto';
  if (t.includes('ingreso') || t.includes('producto')) return 'ingreso';
  if (t.includes('gasto') || t.includes('costo')) return 'gasto';
  return 'gasto'; // Fallback por seguridad
}

async function importarCuentas() {
  const archivoCSV = path.join(process.cwd(), 'cuentas.csv');

  if (!fs.existsSync(archivoCSV)) {
    console.error(`❌ No se encontró el archivo: ${archivoCSV}`);
    console.log("Crea un archivo llamado 'cuentas.csv' en la carpeta apagos con tu catálogo.");
    return;
  }

  const contenido = fs.readFileSync(archivoCSV, 'utf-8');
  const lineas = contenido.split('\n').filter(line => line.trim() !== '');

  try {
    await db.connect();
    console.log("✅ Conectado a PostgreSQL. Importando cuentas...");

    // Leer encabezados para detectar dinámicamente en qué columna está cada dato
    const cabecera = leerLineaCSV(lineas[0].toLowerCase());
    const idxCodigo = cabecera.indexOf('codigo_cuenta');
    const idxNombre = cabecera.indexOf('nombre_cuenta');
    const idxTipo = cabecera.indexOf('tipo_cuenta');

    if (idxCodigo === -1 || idxNombre === -1 || idxTipo === -1) {
      console.error("❌ Error: Tu CSV debe tener en la primera fila (encabezados) las columnas: codigo_cuenta, nombre_cuenta, tipo_cuenta");
      return;
    }

    let procesadas = 0;

    // Empezamos en i=1 para saltar los encabezados
    for (let i = 1; i < lineas.length; i++) {
      const partes = leerLineaCSV(lineas[i]);
      if (partes.length < 3) continue; // Ignorar líneas vacías o rotas

      const codigo = partes[idxCodigo];
      const nombre = partes[idxNombre]?.replace(/['"]/g, '');
      const tipoCrudo = partes[idxTipo]?.toLowerCase();
      const tipo = normalizarTipo(tipoCrudo);

      if (codigo && nombre && tipo) {
        await db.query(
          `INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta) 
           VALUES ($1, $2, $3)
           ON CONFLICT (codigo_cuenta) DO UPDATE 
           SET nombre_cuenta = EXCLUDED.nombre_cuenta, tipo_cuenta = EXCLUDED.tipo_cuenta`,
          [codigo, nombre, tipo]
        );
        procesadas++;
      }
    }

    console.log(`🎉 ¡Importación completada! ${procesadas} cuentas subidas/actualizadas.`);
  } catch (error) {
    console.error("❌ Error al importar:", error);
  } finally {
    await db.end();
  }
}

importarCuentas();