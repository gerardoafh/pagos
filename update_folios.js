import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import path from 'path';
import pg from 'pg';
import { execSync } from 'child_process';

// Cargar variables de entorno nativas (.env)
process.loadEnvFile();

import db from './config/db.js';
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

async function actualizarFoliosYTipo() {
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
        
        // Expresiones regulares para los atributos del SAT
        const uuidMatch = contenido.match(/UUID\s*=\s*["']([^"']+)["']/i);
        const serieMatch = contenido.match(/Serie\s*=\s*["']([^"']+)["']/i);
        const folioMatch = contenido.match(/Folio\s*=\s*["']([^"']+)["']/i);
        
        // NUEVO: Extracción del Tipo de Comprobante
        const tipoMatch = contenido.match(/TipoDeComprobante\s*=\s*["']([^"']+)["']/i);
        const metodoPagoMatch = contenido.match(/MetodoPago\s*=\s*["']([^"']+)["']/i);

        if (uuidMatch) {
          const uuid = uuidMatch[1].toLowerCase();
          const serie = serieMatch ? serieMatch[1] : '';
          const folio = folioMatch ? folioMatch[1] : '';
          const tipo = tipoMatch ? tipoMatch[1].toUpperCase() : 'I'; // Por defecto 'I' de Ingreso
          const metodoPago = metodoPagoMatch ? metodoPagoMatch[1].toUpperCase() : 'PUE';
          
          const folioCompleto = `${serie}${folio}`.trim();
          const rutaExpediente = path.dirname(rutaXML); // Extraemos la ruta exacta de la carpeta

          // Ejecutamos la actualización
          // Usamos COALESCE para que si no encuentra folio en el XML, no borre el que ya tenías en BD
          const resultado = await db.query(
            `UPDATE facturas_recibidas 
             SET folio_interno = COALESCE(NULLIF($1, ''), folio_interno), 
                 tipo_comprobante = $2,
                 url_expediente = COALESCE(url_expediente, $4),
                 metodo_pago = $5
             WHERE LOWER(uuid) = $3`,
            [folioCompleto, tipo, uuid, rutaExpediente, metodoPago]
          );

          if (resultado.rowCount > 0) {
            console.log(`✔️ UUID: ${uuid} -> Folio: ${folioCompleto || 'N/A'} | Tipo: ${tipo} | Método: ${metodoPago}`);
            actualizados++;
          }
        }
      } catch (err) {
        // Si un archivo es ilegible, lo saltamos silenciosamente
      }
    }

    console.log(`\n================================================================`);
    console.log(`🎉 ¡RÁFAGA COMPLETADA!`);
    console.log(`Se actualizaron ${actualizados} facturas con folio y tipo de comprobante.`);
    console.log(`================================================================\n`);

  } catch (error) {
    console.error("❌ Error durante el proceso:", error);
  } finally {
    await db.end();
  }
}

actualizarFoliosYTipo();