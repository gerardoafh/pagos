import fs from 'fs';
import path from 'path';
import pg from 'pg';

process.loadEnvFile();
const { Client } = pg;

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5433', 10),
});

function mapearTipo(tipoCrudo) {
  const t = (tipoCrudo || '').toLowerCase().trim();
  if (t.includes('activo')) return 'activo';
  if (t.includes('pasivo')) return 'pasivo';
  if (t.includes('capital')) return 'capital';
  if (t.includes('resultados acreedora')) return 'ingreso';
  if (t.includes('resultados deudora')) return 'gasto';
  if (t.includes('ingreso')) return 'ingreso';
  if (t.includes('gasto') || t.includes('costos')) return 'gasto';
  return 'gasto';
}

function limpiarTexto(html) {
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
}

async function importar() {
  console.log("Iniciando script de importacion HTML...");
  const archivo = path.join(process.cwd(), 'Listado de Cuentas.html');

  if (!fs.existsSync(archivo)) {
    console.error('❌ Archivo no encontrado: ' + archivo);
    process.exit(1);
  }

  console.log('📂 Leyendo archivo HTML...');
  const lineas = fs.readFileSync(archivo, 'utf-8').split('\n');

  const cuentas = [];
  let enFila = false;
  let celdas = [];

  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i].trim();
    if (linea.startsWith('<tr')) {
      enFila = true;
      celdas = [];
    } else if (linea.startsWith('</tr>')) {
      enFila = false;
      if (celdas.length >= 3) {
        const codigo = celdas[0].replace(/\s/g, '');
        // Valida que sea un código numérico
        if (/^\d{6,15}$/.test(codigo)) {
          cuentas.push({
            codigo,
            nombre: celdas[1].replace(/\s+/g, ' '),
            tipo: mapearTipo(celdas[2])
          });
        }
      }
    } else if (enFila && linea.startsWith('<td')) {
      celdas.push(limpiarTexto(linea));
    }
  }

  console.log('📋 ' + cuentas.length + ' cuentas validas detectadas.');
  if (cuentas.length === 0) {
    console.error('No se detectaron cuentas.');
    process.exit(1);
  }

  try {
    await db.connect();
    console.log('✅ Conectado a PostgreSQL. Guardando en BD...');

    let insertadas = 0, actualizadas = 0;
    for (const c of cuentas) {
      const r = await db.query(
        `INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
         VALUES ($1, $2, $3)
         ON CONFLICT (codigo_cuenta) DO UPDATE
           SET nombre_cuenta = EXCLUDED.nombre_cuenta, tipo_cuenta = EXCLUDED.tipo_cuenta
         RETURNING (xmax = 0) AS fue_insertada`,
        [c.codigo, c.nombre, c.tipo]
      );
      if (r.rows[0]?.fue_insertada) insertadas++; else actualizadas++;
    }
    console.log(`🎉 Importacion exitosa. Insertadas: ${insertadas} | Actualizadas: ${actualizadas}`);
  } catch (err) {
    console.error('❌ Error de DB:', err);
  } finally {
    await db.end();
  }
}

importar();
