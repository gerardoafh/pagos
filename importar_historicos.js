import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import path from 'path';
import pg from 'pg';
import { execSync } from 'child_process';

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

function conectarRedNas(rutaNas) {
  try {
    const rutaWindows = rutaNas.replace(/\//g, '\\');
    const match = rutaWindows.match(/^(\\\\[^\\]+\\[^\\]+)/);
    const recursoRaiz = match ? match[1] : rutaWindows;
    execSync(`net use "${recursoRaiz}" "${process.env.NAS_PASSWORD}" /user:${process.env.NAS_USER} /persistent:no`, { stdio: 'ignore' });
  } catch (error) { }
}

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

async function importarHistoricos() {
  let rutaDirectorioXML = process.env.EXPEDIENTES_PATH.replace(/['"]/g, '');

  try {
    console.log("🔌 Conectando a PostgreSQL 17...");
    await db.connect();
    conectarRedNas(rutaDirectorioXML);

    console.log(`📂 Buscando archivos XML históricos en: ${rutaDirectorioXML}`);
    const todosLosXMLs = buscarXMLsRecursivo(rutaDirectorioXML);
    console.log(`📊 Se encontraron ${todosLosXMLs.length} archivos XML. Iniciando importación masiva...\n`);

    let insertadas = 0;
    let yaExistian = 0;

    for (const rutaXML of todosLosXMLs) {
      try {
        const contenidoXML = readFileSync(rutaXML, 'utf-8');
        
        const uuidMatch = contenidoXML.match(/UUID\s*=\s*["']([^"']+)["']/i);
        if (!uuidMatch) continue;
        
        const uuid = uuidMatch[1].toLowerCase();
        const rfcEmisor = (contenidoXML.match(/<cfdi:Emisor[^>]+Rfc=["']([^"']+)["']/i) || [])[1] || '';
        const nombreEmisor = (contenidoXML.match(/<cfdi:Emisor[^>]+Nombre=["']([^"']+)["']/i) || [])[1] || '';
        const fechaEmision = (contenidoXML.match(/Fecha=["']([^"']+)["']/i) || [])[1] || '';
        const monto = parseFloat((contenidoXML.match(/Total=["']([^"']+)["']/i) || [])[1] || '0');
        const folioCompleto = `${(contenidoXML.match(/Serie=["']([^"']+)["']/i) || [])[1] || ''}${(contenidoXML.match(/Folio=["']([^"']+)["']/i) || [])[1] || ''}`.trim();
        const tipo = (contenidoXML.match(/TipoDeComprobante=["']([^"']+)["']/i) || [])[1]?.toUpperCase() || 'I';
        const metodoPago = (contenidoXML.match(/MetodoPago=["']([^"']+)["']/i) || [])[1]?.toUpperCase() || 'PUE';
        const regimenFiscalEmisor = (contenidoXML.match(/<cfdi:Emisor[^>]+RegimenFiscal=["']([^"']+)["']/i) || [])[1] || '';
        const cpEmisor = (contenidoXML.match(/LugarExpedicion=["']([^"']+)["']/i) || [])[1] || '';

        // --- EXTRACCIÓN DE CONCEPTOS ---
        const conceptos = [];
        const conceptoRegex = /<cfdi:Concepto\s+([^>]+)>/gi;
        let matchConcepto;
        while ((matchConcepto = conceptoRegex.exec(contenidoXML)) !== null) {
          const attrs = matchConcepto[1];
          conceptos.push({
            claveProdServ: (attrs.match(/ClaveProdServ=["']([^"']+)["']/i) || [])[1] || '',
            noIdentificacion: (attrs.match(/NoIdentificacion=["']([^"']+)["']/i) || [])[1] || '',
            cantidad: parseFloat((attrs.match(/Cantidad=["']([^"']+)["']/i) || [])[1] || '0'),
            claveUnidad: (attrs.match(/ClaveUnidad=["']([^"']+)["']/i) || [])[1] || '',
            unidad: (attrs.match(/Unidad=["']([^"']+)["']/i) || [])[1] || '',
            descripcion: (attrs.match(/Descripcion=["']([^"']+)["']/i) || [])[1] || '',
            valorUnitario: parseFloat((attrs.match(/ValorUnitario=["']([^"']+)["']/i) || [])[1] || '0'),
            importe: parseFloat((attrs.match(/Importe=["']([^"']+)["']/i) || [])[1] || '0'),
            descuento: parseFloat((attrs.match(/Descuento=["']([^"']+)["']/i) || [])[1] || '0'),
            objetoImp: (attrs.match(/ObjetoImp=["']([^"']+)["']/i) || [])[1] || ''
          });
        }
        // ---------------------------------

        if (tipo === 'N') continue; // Ignoramos recibos de Nómina

        const carpetaDossier = path.dirname(rutaXML);

        const resultado = await db.query(
          `INSERT INTO facturas_recibidas (uuid, rfc_emisor, nombre_emisor, regimen_fiscal_emisor, cp_emisor, fecha_emision, total, estatus_pago, folio_interno, tipo_comprobante, url_expediente, metodo_pago)
           VALUES ($1, $2, $3, $4, $5, $6, $7, 'pendiente', $8, $9, $10, $11)
           ON CONFLICT (uuid) DO UPDATE SET 
             url_expediente = EXCLUDED.url_expediente, 
             metodo_pago = EXCLUDED.metodo_pago,
             tipo_comprobante = EXCLUDED.tipo_comprobante,
             regimen_fiscal_emisor = EXCLUDED.regimen_fiscal_emisor,
             cp_emisor = EXCLUDED.cp_emisor
           RETURNING (xmax = 0) AS fue_insert`,
          [uuid, rfcEmisor, nombreEmisor, regimenFiscalEmisor, cpEmisor, fechaEmision, monto, folioCompleto, tipo, carpetaDossier, metodoPago]
        );

        // Guardar conceptos asociados a la factura
        await db.query(`DELETE FROM factura_conceptos WHERE uuid_factura = $1`, [uuid]);
        for (const c of conceptos) {
          await db.query(
            `INSERT INTO factura_conceptos (uuid_factura, clave_prod_serv, no_identificacion, cantidad, clave_unidad, unidad, descripcion, valor_unitario, importe, descuento, objeto_imp)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [uuid, c.claveProdServ, c.noIdentificacion, c.cantidad, c.claveUnidad, c.unidad, c.descripcion, c.valorUnitario, c.importe, c.descuento, c.objetoImp]
          );
        }

        resultado.rows[0]?.fue_insert ? insertadas++ : yaExistian++;
      } catch (err) {}
    }

    console.log(`\n🎉 ¡IMPORTACIÓN HISTÓRICA COMPLETADA!`);
    console.log(`✅ Facturas nuevas agregadas al Dashboard: ${insertadas}`);
    console.log(`🔄 Facturas que ya estaban en la base de datos: ${yaExistian}`);

  } catch (error) {
    console.error("❌ Error durante el proceso:", error);
  } finally {
    await db.end();
  }
}

importarHistoricos();