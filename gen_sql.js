/**
 * gen_sql.js
 * Lee el HTML de CONTPAQi y genera un archivo SQL con INSERTs listos para
 * ejecutar dentro del contenedor Docker via psql.
 *
 * Uso:
 *   node gen_sql.js
 * Genera: cuentas_import.sql
 */

import fs from 'fs';
import path from 'path';

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
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&iacute;/g, 'í')
    .replace(/&eacute;/g, 'é')
    .replace(/&aacute;/g, 'á')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&amp;/g, '&')
    .trim();
}

function escapeSql(str) {
  return str.replace(/'/g, "''");
}

const archivo = path.join(process.cwd(), 'Listado de Cuentas.html');
if (!fs.existsSync(archivo)) {
  console.error('❌ No encontrado: ' + archivo);
  process.exit(1);
}

console.log('📂 Leyendo HTML...');
const lineas = fs.readFileSync(archivo, 'utf-8').split('\n');

const cuentas = [];
let enFila = false;
let celdas = [];

for (const linea of lineas) {
  const l = linea.trim();
  if (l.startsWith('<tr')) {
    enFila = true;
    celdas = [];
  } else if (l.startsWith('</tr>')) {
    enFila = false;
    if (celdas.length >= 3) {
      const codigo = celdas[0].replace(/\s/g, '');
      if (/^\d{6,15}$/.test(codigo)) {
        cuentas.push({
          codigo,
          nombre: celdas[1].replace(/\s+/g, ' ').trim(),
          tipo: mapearTipo(celdas[2])
        });
      }
    }
  } else if (enFila && l.startsWith('<td')) {
    celdas.push(limpiarTexto(l));
  }
}

console.log('📋 ' + cuentas.length + ' cuentas detectadas.');

// Resumen por tipo
const resumen = cuentas.reduce((a, c) => { a[c.tipo] = (a[c.tipo]||0)+1; return a; }, {});
Object.entries(resumen).forEach(([t, n]) => console.log('   ' + t.padEnd(8) + ': ' + n));

// Generar SQL
let sql = '-- Importar cuentas contables CONTPAQi\n';
sql += '-- Generado el: ' + new Date().toISOString() + '\n\n';
sql += 'BEGIN;\n\n';

for (const c of cuentas) {
  const nombre = escapeSql(c.nombre).substring(0, 149); // max 150 chars
  sql += `INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)\n`;
  sql += `  VALUES ('${c.codigo}', '${nombre}', '${c.tipo}')\n`;
  sql += `  ON CONFLICT (codigo_cuenta) DO UPDATE\n`;
  sql += `    SET nombre_cuenta = EXCLUDED.nombre_cuenta,\n`;
  sql += `        tipo_cuenta   = EXCLUDED.tipo_cuenta;\n\n`;
}

sql += 'COMMIT;\n';
sql += `\\echo '✅ ${cuentas.length} cuentas importadas/actualizadas.'\n`;

const salida = path.join(process.cwd(), 'cuentas_import.sql');
fs.writeFileSync(salida, sql, 'utf-8');
console.log('\n✅ Archivo generado: ' + salida);
console.log('\n👉 Ahora ejecuta:');
console.log('   docker exec -i apagos_db psql -U postgres -d tesoreria < cuentas_import.sql');
