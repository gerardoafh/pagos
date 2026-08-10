/**
 * importar_contpaq.js
 * Parsea el catalogo de cuentas en formato nativo CONTPAQi (fixed-width)
 * e importa los registros a la tabla cuentas_contables de PostgreSQL.
 *
 * Uso:
 *   node importar_contpaq.js                       -> lee catalogo_cuentas.txt
 *   node importar_contpaq.js ruta\al\catalogo.txt  -> archivo personalizado
 *
 * Formato de entrada (lineas que empiezan con C):
 *   C  <codigo9d>  <Nombre Espanol>   <NombreIngles>   <padre9d>  <tipo> ...
 *   RF <ref_diot>   (se ignoran)
 *   F  <filtro>     (se ignoran)
 */

import fs   from 'fs';
import path from 'path';
import pg   from 'pg';

process.loadEnvFile();
const { Client } = pg;

const db = new Client({
  user    : process.env.DB_USER,
  host    : process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port    : parseInt(process.env.DB_PORT || '5433', 10),
});

// Mapeo tipo CONTPAQi -> tipo PostgreSQL
function mapearTipo(letra) {
  switch ((letra || '').toUpperCase()) {
    case 'A': return 'activo';
    case 'P': return 'pasivo';
    case 'C': return 'capital';
    case 'I': return 'ingreso';
    case 'G': return 'gasto';
    case 'D': return 'gasto';   // Deudora de resultados
    default : return 'gasto';
  }
}

// Parsear una linea de cuenta CONTPAQi
function parsearLinea(linea) {
  // Solo lineas de tipo cuenta
  if (!linea.startsWith('C ')) return null;

  const cuerpo = linea.slice(3);

  // 1) Codigo de cuenta: digitos consecutivos al inicio
  const m1 = cuerpo.match(/^(\d+)\s+/);
  if (!m1) return null;
  const codigo     = m1[1];
  const trasCodigo = cuerpo.slice(m1[0].length);

  // 2) Codigo padre: 9 digitos seguidos de espacios + letra de tipo (A/P/C/I/G/D)
  //    Usamos \s{2,} para no confundir numeros dentro del nombre de la cuenta
  const mPadre = trasCodigo.match(/\s{2,}(\d{9})\s+([APCIGD])\s/);
  if (!mPadre) return null;

  const codigoPadre = mPadre[1];
  const tipoLetra   = mPadre[2];

  // 3) Nombre: texto entre el codigo y el codigo padre
  //    Si hay nombre en ingles (separado por 3+ espacios), tomar solo el espanol
  const seccionNombre = trasCodigo.slice(0, mPadre.index).trim();
  const nombre = seccionNombre.split(/\s{3,}/)[0].replace(/\s{2,}/g, ' ').trim();

  if (!codigo || !nombre) return null;

  return {
    codigo,
    nombre,
    codigoPadre,
    tipo: mapearTipo(tipoLetra),
  };
}

async function importar() {
  const archivo = process.argv[2] || path.join(process.cwd(), 'catalogo_cuentas.txt');

  if (!fs.existsSync(archivo)) {
    console.error('\n❌ Archivo no encontrado: ' + archivo);
    console.log('\n👉 Pasos para usarlo:');
    console.log('   1. Abre CONTPAQi y exporta el catalogo de cuentas como texto plano');
    console.log('      (o copia el contenido que pegaste en el chat y guardalo como)');
    console.log('      catalogo_cuentas.txt  dentro de  d:\\apagos\\');
    console.log('   2. Ejecuta:  node importar_contpaq.js\n');
    process.exit(1);
  }

  console.log('\n📂 Leyendo: ' + archivo);

  const contenido = fs.readFileSync(archivo, 'utf-8');
  const lineas    = contenido.split(/\r?\n/);
  const cuentas   = [];

  for (const linea of lineas) {
    const parsed = parsearLinea(linea);
    if (parsed) cuentas.push(parsed);
  }

  console.log('📋 ' + cuentas.length + ' cuentas encontradas en el archivo.');

  if (cuentas.length === 0) {
    console.error('❌ No se detectaron cuentas. Verifica el formato del archivo.');
    process.exit(1);
  }

  console.log('\n── Muestra (primeras 5 cuentas) ─────────────────────────────────────');
  cuentas.slice(0, 5).forEach(c =>
    console.log('  ' + c.codigo.padEnd(15) + ' [' + c.tipo.padEnd(7) + '] ' + c.nombre.substring(0, 55))
  );
  console.log('─────────────────────────────────────────────────────────────────────\n');

  try {
    await db.connect();
    console.log('✅ Conectado a PostgreSQL. Importando...\n');

    let insertadas = 0, actualizadas = 0, errores = 0;

    for (const c of cuentas) {
      try {
        const r = await db.query(
          `INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
           VALUES ($1, $2, $3)
           ON CONFLICT (codigo_cuenta) DO UPDATE
             SET nombre_cuenta = EXCLUDED.nombre_cuenta,
                 tipo_cuenta   = EXCLUDED.tipo_cuenta
           RETURNING (xmax = 0) AS fue_insertada`,
          [c.codigo, c.nombre, c.tipo]
        );
        if (r.rows[0]?.fue_insertada) insertadas++; else actualizadas++;
      } catch (e) {
        errores++;
        console.warn('  ⚠️  Error en cuenta ' + c.codigo + ': ' + e.message);
      }
    }

    console.log('─────────────────────────────────────────────');
    console.log('🎉 Importacion completada:');
    console.log('   ✅ Nuevas insertadas : ' + insertadas);
    console.log('   🔄 Actualizadas      : ' + actualizadas);
    if (errores > 0) console.log('   ❌ Con errores       : ' + errores);
    console.log('─────────────────────────────────────────────\n');
    console.log('💡 Recarga el Modulo Contable en el dashboard para ver los nuevos registros.');

  } catch (err) {
    console.error('❌ Error de conexion a PostgreSQL: ' + err.message);
  } finally {
    await db.end();
  }
}

importar();
