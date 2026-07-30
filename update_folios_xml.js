import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import path from 'path';
import pg from 'pg';
import { execSync } from 'child_process';

// Cargar variables de entorno nativas (.env)
process.loadEnvFile();

const db = new pg.Pool({
  user: process.env.DB_USER,
  host: '127.0.0.1',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5433', 10),
});
import { extractCFDIData } from './utils/xmlParser.js';
import { conectarRedNas } from './utils/nasHandler.js';

// Cargar variables de entorno nativas (.env)
process.loadEnvFile();

// Función para buscar archivos XML recursivamente en subcarpetas
function buscarXMLsRecursivo(directorio, lista = []) {
  if (!existsSync(directorio)) return lista;
  
  const archivos = readdirSync(directorio);
  for (const archivo of archivos) {
    const rutaAbsoluta = path.join(directorio, archivo);
    if (statSync(rutaAbsoluta).isDirectory()) {
      buscarXMLsRecursivo(rutaAbsoluta, lista);
    } else if (archivo.toLowerCase().endsWith('.xml')) {
      lista.push(rutaAbsoluta);
    }
  }
  return lista;
}

async function actualizarFoliosRafa() {
  // 💡 Por defecto, leerá tu carpeta de Expedientes en el NAS.
  // Si tus XML están en otra carpeta local, cambia esta ruta (ej. './mis_xmls_historicos')
  let rutaDirectorioXML = process.env.EXPEDIENTES_PATH.replace(/['"]/g, '');

  try {
    console.log("🔌 Conectando a PostgreSQL 17...");
    await db.connect();
    
    console.log("Autorizando acceso al NAS...");
    conectarRedNas(rutaDirectorioXML);

    console.log(`📂 Buscando archivos XML en: ${rutaDirectorioXML}`);
    const todosLosXMLs = buscarXMLsRecursivo(rutaDirectorioXML);
    console.log(`📊 Se encontraron ${todosLosXMLs.length} archivos XML. Iniciando extracción...\n`);

    let actualizados = 0;

    for (const rutaXML of todosLosXMLs) {
      try {
        const contenido = readFileSync(rutaXML, 'utf-8');
        
        const xmlData = extractCFDIData(contenido);

        if (xmlData.tipo_comprobante === 'P') {
          continue; // Ignoramos silenciosamente este archivo ya que es un Complemento de Pago
        }

        if (xmlData.uuid) {
          const uuid = xmlData.uuid;
          const serie = xmlData.serie || '';
          const folio = xmlData.folio || '';

          
          const folioCompleto = `${serie}${folio}`.trim();

          if (folioCompleto) {
            await db.query(
              `UPDATE facturas_recibidas SET folio_interno = $1 WHERE uuid = $2`,
              [folioCompleto, uuid]
            );
            console.log(`✔️ UUID: ${uuid} -> Folio actualizado: ${folioCompleto}`);
            actualizados++;
          }
        }
      } catch (err) {
        // Si un archivo es ilegible, lo saltamos silenciosamente
      }
    }

    console.log(`\n================================================================`);
    console.log(`🎉 ¡RÁFAGA COMPLETADA!`);
    console.log(`Se actualizaron ${actualizados} facturas con su folio en la base de datos.`);
    console.log(`================================================================\n`);

  } catch (error) {
    console.error("❌ Error durante el proceso:", error);
  } finally {
    await db.end();
  }
}

actualizarFoliosRafa();