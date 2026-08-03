import fs from 'fs';
import path from 'path';
import pg from 'pg';

// Cargar variables de entorno
try { process.loadEnvFile(); } catch (_) {}

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5433', 10),
});

// Escáner recursivo para encontrar todos los XML dentro del NAS
function obtenerArchivosXml(directorio, archivos = []) {
  if (!fs.existsSync(directorio)) return archivos;
  
  const lista = fs.readdirSync(directorio);
  for (const archivo of lista) {
    const rutaCompleta = path.join(directorio, archivo);
    try {
      const stat = fs.statSync(rutaCompleta);
      if (stat.isDirectory()) {
        obtenerArchivosXml(rutaCompleta, archivos);
      } else if (archivo.toLowerCase().endsWith('.xml')) {
        archivos.push(rutaCompleta);
      }
    } catch (e) {
      // Ignorar archivos protegidos o ilegibles
    }
  }
  return archivos;
}

async function procesarComplementos() {
  try {
    await db.connect();
    console.log("✅ Conectado a PostgreSQL 17.");
    
    const rutaBase = process.env.EXPEDIENTES_PATH.replace(/['"]/g, '');
    console.log(`📂 Escaneando XMLs en el NAS: ${rutaBase}`);
    
    const archivosXml = obtenerArchivosXml(rutaBase);
    console.log(`📊 Se encontraron ${archivosXml.length} archivos XML.`);
    
    let actualizados = 0;

    for (const rutaArchivo of archivosXml) {
      const contenido = fs.readFileSync(rutaArchivo, 'utf8');
      
      // Verificar si es comprobante tipo P (Pago)
      if (/(?:TipoDeComprobante\s*=\s*["']P["'])/i.test(contenido)) {
        // Expresión regular para extraer cualquier IdDocumento asociado
        const regex = /IdDocumento=["']([A-Fa-f0-9\-]{36})["']/gi;
        let coincidencia;
        
        while ((coincidencia = regex.exec(contenido)) !== null) {
          const uuidPadre = coincidencia[1].toLowerCase();
          const resultado = await db.query(`UPDATE facturas_recibidas SET estatus_pago = 'pagado', tiene_complemento = true, fecha_pago = CURRENT_TIMESTAMP WHERE uuid = $1 AND estatus_pago = 'pendiente'`, [uuidPadre]);
          
          if (resultado.rowCount > 0) {
            console.log(`   ✅ Factura ${uuidPadre} conciliada gracias al Complemento: ${path.basename(rutaArchivo)}`);
            actualizados++;
          }
        }
      }
    }
    console.log(`\n🎉 Conciliación XML terminada. ${actualizados} facturas marcadas como pagadas.`);
  } catch (error) { console.error("❌ Error:", error); } finally { await db.end(); }
}
procesarComplementos();