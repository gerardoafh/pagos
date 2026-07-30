import fs from 'fs';
import path from 'path';
import readline from 'readline';
import db from './config/db.js';

// Cargar variables de entorno nativas (.env)
process.loadEnvFile();

const CSV_PATH = path.join(process.cwd(), 'efos.csv');

async function importarEfos() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`❌ No se encontró el archivo ${CSV_PATH}. Por favor descárgalo del SAT y colócalo en la raíz.`);
    process.exit(1);
  }

  console.log('⏳ Conectando a PostgreSQL...');
  await db.connect();
  console.log('✅ Conexión establecida.');

  const fileStream = fs.createReadStream(CSV_PATH, { encoding: 'latin1' }); // Usualmente el SAT usa Latin1 o UTF-8
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  console.log('🚀 Iniciando lectura y parseo del archivo CSV (Listado 69-B)...');

  let procesados = 0;
  let insertados = 0;
  let omitidos = 0;
  let saltarLineas = 2; // El SAT suele incluir 1 o 2 líneas de encabezados inútiles antes de la tabla real

  for await (const line of rl) {
    if (saltarLineas > 0) {
      saltarLineas--;
      continue;
    }

    // Dividimos por coma respetando posibles comillas.
    // Una expresión regular simple para CSVs estándar:
    const regexCSV = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
    const columnas = line.split(regexCSV).map(str => str.replace(/^"|"$/g, '').trim());

    if (columnas.length < 4) {
      omitidos++;
      continue; // Línea incompleta o vacía
    }

    // El SAT cambia el orden a veces, pero por convención reciente:
    // [0] = No., [1] = RFC, [2] = Nombre del Contribuyente, [3] = Situación del contribuyente...
    const rfc = columnas[1];
    const nombre = columnas[2];
    const situacion = columnas[3];

    // Ignorar líneas donde el RFC no tenga un formato lógico
    if (!rfc || rfc.length < 12 || rfc.length > 13) {
      omitidos++;
      continue;
    }

    procesados++;

    try {
      await db.query(
        `INSERT INTO sat_efos (rfc, nombre_contribuyente, situacion) 
         VALUES ($1, $2, $3)
         ON CONFLICT (rfc) DO UPDATE 
         SET nombre_contribuyente = EXCLUDED.nombre_contribuyente,
             situacion = EXCLUDED.situacion`,
        [rfc, nombre, situacion]
      );
      insertados++;

      if (insertados % 1000 === 0) {
        console.log(`   [PROGRESS] Importados: ${insertados} EFOS...`);
      }
    } catch (err) {
      console.error(`Error al insertar RFC ${rfc}:`, err.message);
    }
  }

  console.log(`\n================================================================`);
  console.log(`✅ Importación de Lista 69-B completada.`);
  console.log(`   Procesados: ${procesados}`);
  console.log(`   Guardados/Actualizados: ${insertados}`);
  console.log(`   Líneas omitidas (basura/vacías): ${omitidos}`);
  console.log(`================================================================`);

  // Paso 2: Cruzar con facturas existentes y encender las alarmas
  console.log('🔍 Ejecutando análisis forense en el inventario de facturas...');
  
  const resultAlarma = await db.query(`
    UPDATE facturas_recibidas f
    SET alerta_efos = true, estatus_fiscal = '69-B ' || e.situacion
    FROM sat_efos e
    WHERE f.rfc_emisor = e.rfc
    RETURNING f.uuid, f.rfc_emisor, e.situacion;
  `);

  if (resultAlarma.rowCount > 0) {
    console.log(`🚨 ¡ALERTA! Se han detectado ${resultAlarma.rowCount} facturas vinculadas a EFOS (Empresas Fantasma).`);
    console.log(`   La bandera 'alerta_efos' ha sido activada para bloquear su contabilidad.`);
  } else {
    console.log(`🎉 Excelente: No se encontró ninguna coincidencia con EFOS en tu base de datos actual.`);
  }

  await db.end();
  console.log('🔌 Conexión cerrada.');
}

importarEfos().catch(err => {
  console.error(err);
  process.exit(1);
});
