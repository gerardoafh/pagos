import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import pg from 'pg';
import AdmZip from 'adm-zip';
import {
  Fiel,
  HttpsWebClient,
  FielRequestBuilder,
  Service
} from '@nodecfdi/sat-ws-descarga-masiva';
import { extractCFDIData } from './utils/xmlParser.js';

// Cargar variables de entorno (.env en local, vars de docker-compose en Docker)
try { process.loadEnvFile(); } catch (_) {}

const { Client } = pg;

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, 
  port: parseInt(process.env.DB_PORT || '5433', 10),
});

// ==========================================================
// EXTRACTOR UNIVERSAL DE XMLs (maneja ZIP plano y ZIP anidado)
// ==========================================================
function extraerXMLsDelZip(zipPath) {
  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();
  const xmls = [];

  console.log(`\n📦 Contenido del ZIP (${entries.length} entradas):`);
  entries.forEach(e => {
    console.log(`   - [${e.isDirectory ? 'DIR' : 'FILE'}] ${e.entryName} (${e.header.size} bytes)`);
  });
  console.log('');

  for (const entry of entries) {
    if (entry.isDirectory) continue;

    const nombreLower = entry.entryName.toLowerCase();

    // CASO 1: XML directo dentro del ZIP
    if (nombreLower.endsWith('.xml')) {
      xmls.push({
        nombre: entry.entryName,
        contenido: entry.getData().toString('utf8'),
      });
      continue;
    }

    // CASO 2: ZIP anidado dentro del ZIP (el SAT hace esto con paquetes grandes)
    if (nombreLower.endsWith('.zip')) {
      console.log(`   🗜️ ZIP anidado detectado: ${entry.entryName} — extrayendo internamente...`);
      try {
        const zipInterno = new AdmZip(entry.getData());
        const entriesInternas = zipInterno.getEntries();
        for (const entryInterna of entriesInternas) {
          if (!entryInterna.isDirectory && entryInterna.entryName.toLowerCase().endsWith('.xml')) {
            xmls.push({
              nombre: entryInterna.entryName,
              contenido: entryInterna.getData().toString('utf8'),
            });
          }
        }
      } catch (err) {
        console.warn(`   ⚠️ No se pudo abrir ZIP anidado ${entry.entryName}: ${err.message}`);
      }
    }
  }

  return xmls;
}

async function descargarYProcesar() {
  const rfcArgument = process.argv[2];
  const packageId = process.argv[3];
  const action = process.argv[4] || 'active'; // 'active' o 'cancelled'

  if (!rfcArgument || !packageId) {
    console.error("❌ Error: Faltan argumentos. (Ejemplo: node download.js <RFC> <PACKAGE_ID>)");
    return;
  }

  try {
    console.log("Conectando a PostgreSQL 17 en Windows...");
    await db.connect();
    console.log("✅ Conexión a Postgres exitosa.");

    const empresaData = await db.query('SELECT fiel_cer_path, fiel_key_path, fiel_password FROM empresas WHERE rfc = $1', [rfcArgument]);
    if (empresaData.rows.length === 0) {
      console.error(`❌ Empresa con RFC ${rfcArgument} no encontrada en la BD.`);
      process.exit(1);
    }

    const { fiel_cer_path, fiel_key_path, fiel_password } = empresaData.rows[0];
    if (!fiel_cer_path || !fiel_key_path || !fiel_password) {
      console.error(`❌ La empresa ${rfcArgument} no tiene configurada su FIEL.`);
      process.exit(1);
    }

    console.log(`Cargando credenciales FIEL para ${rfcArgument}...`);
    const fiel = Fiel.create(
      readFileSync(fiel_cer_path, 'binary'),
      readFileSync(fiel_key_path, 'binary'),
      fiel_password
    );

    // Timeout de 60s para evitar crashes si el SAT demora mucho en la descarga
    const webClient = new HttpsWebClient(undefined, undefined, 60000);
    const requestBuilder = new FielRequestBuilder(fiel);
    const service = new Service(requestBuilder, webClient);
    console.log("✅ Servicio SAT inicializado para descarga.");

    let downloadResult;
    let packageContent;
    let intentosDescarga = 0;
    const MAX_INTENTOS = 5;

    while (intentosDescarga < MAX_INTENTOS) {
      console.log(`Solicitando descarga del paquete: ${packageId} (Intento ${intentosDescarga + 1}/${MAX_INTENTOS})...`);
      downloadResult = await service.download(packageId);
      packageContent = downloadResult.getPackageContent();

      if (!packageContent || packageContent.length === 0) {
        const codigo = downloadResult.getStatus().getCode();
        console.error(`❌ El paquete no contiene datos. Respuesta del SAT: ${downloadResult.getStatus().getMessage()} (Código: ${codigo})`);
        
        if (codigo === '5008' || codigo === 5008 || codigo === '5004' || codigo === 5004) {
          console.log("💡 SOLUCIÓN: El paquete expiró o alcanzó el límite de descargas. Solicita uno nuevo desde la web.");
          return;
        }

        if (codigo === '404' || codigo === 404) {
          console.log(`⏳ El SAT aún no replica el archivo en sus nodos (Error 404). Esperando 30 segundos antes del próximo intento...`);
          intentosDescarga++;
          await new Promise(resolve => setTimeout(resolve, 30000));
          continue; // Volver a intentar
        }
        
        // Otro error distinto
        return;
      }
      
      // Si llegamos aquí, ¡el paquete se descargó con éxito!
      break;
    }

    if (!packageContent || packageContent.length === 0) {
      console.error(`🛑 Se agotaron los ${MAX_INTENTOS} intentos. El SAT no entregó el paquete físico.`);
      return;
    }

    console.log(`✅ Paquete descargado con éxito (${downloadResult.getPackageSize()} bytes).`);

    if (!existsSync('temp_paquetes')) mkdirSync('temp_paquetes');

    const zipPath = path.join('temp_paquetes', `${packageId}.zip`);
    console.log(`Guardando archivo comprimido en: ${zipPath}...`);
    writeFileSync(zipPath, Buffer.from(packageContent, 'base64'));

    console.log("Extrayendo archivos XML del paquete...");
    const xmlsEncontrados = extraerXMLsDelZip(zipPath);
    console.log(`📊 Total de XMLs encontrados dentro del paquete: ${xmlsEncontrados.length}`);

    if (xmlsEncontrados.length === 0) {
      console.error("❌ El ZIP no contiene ningún archivo XML. Revisa el contenido listado arriba.");
      return;
    }

    const rutaNasDestino = process.env.EXPEDIENTES_PATH.replace(/['"]/g, '');
    let insertadas = 0;
    let nominasIgnoradas = 0;
    let yaExistian = 0;

    console.log("\nProcesando XMLs y creando expedientes en NAS...");

    for (const { nombre, contenido: contenidoXML } of xmlsEncontrados) {
      console.log(`   📄 Procesando: ${nombre}`);

      const xmlData = extractCFDIData(contenidoXML);
      if (!xmlData || !xmlData.uuid) {
        console.log(`      ⚠️ Sin UUID o XML inválido — omitido.`);
        continue;
      }
      
      const { 
        total: monto, subtotal, iva, iva_retenido, isr_retenido, fecha: fechaEmision, 
        rfc_emisor: rfcEmisor, nombre_emisor: nombreEmisor, rfc_receptor,
        folio, serie, tipo_comprobante: tipo, conceptos, relacionados, metodo_pago: metodoPago,
        regimen_fiscal_emisor, cp_emisor,
        sello_cfd, sello_sat, no_certificado, no_certificado_sat, fecha_timbrado, uuid
      } = xmlData;

      const folioCompleto = [serie, folio].filter(Boolean).join('-') || null;

      // Si la acción es Canceladas, eliminamos de BD y de NAS
      if (action === 'cancelled') {
        try {
          const resDel = await db.query(`DELETE FROM facturas_recibidas WHERE uuid = $1 RETURNING *`, [uuid]);
          if (resDel.rowCount > 0) {
            console.log(`      🗑️ CANCELADA: Eliminada factura UUID ${uuid}`);
            insertadas++; // Reusamos la variable para conteo
          } else {
            console.log(`      ➖ CANCELADA: UUID ${uuid} no existía en BD`);
            yaExistian++;
          }
          // Intentar borrar del NAS
          const fechaObj = new Date(xmlData.fecha);
          const anio = isNaN(fechaObj.getTime()) ? '0000' : fechaObj.getFullYear().toString();
          const mes = isNaN(fechaObj.getTime()) ? '00' : String(fechaObj.getMonth() + 1).padStart(2, '0');
          const carpetaDossier = path.join(rutaNasDestino, anio, mes, rfcEmisor, uuid);
          if (existsSync(carpetaDossier)) {
            await fsp.rm(carpetaDossier, { recursive: true, force: true });
          }
        } catch (delErr) {
          console.error(`      ❌ Error al eliminar UUID ${uuid}:`, delErr.message);
        }
        continue;
      }

      // ======= FLUJO NORMAL (VIGENTES) =======
      const emisorNom = xmlData.nombre_emisor || 'Sin Nombre';
      
      // Variables ya extraidas en la linea 190, renombramos folioCompleto para usar los datos ya extraidos
      const folioCompVigente = [serie, folio].filter(Boolean).join('-') || null;

      // ESCUDO: IGNORAR NÓMINAS
      if (tipo === 'N') {
        console.log(`      🔒 Nómina bloqueada.`);
        nominasIgnoradas++;
        continue;
      }

      // Crear carpeta del expediente en NAS
      const fechaObj = new Date(fechaEmision);
      const anio = isNaN(fechaObj.getTime()) ? '0000' : fechaObj.getFullYear().toString();
      const mes = isNaN(fechaObj.getTime()) ? '00' : String(fechaObj.getMonth() + 1).padStart(2, '0');
      const carpetaDossier = path.join(rutaNasDestino, anio, mes, rfcEmisor, uuid);

      if (!existsSync(carpetaDossier)) await fsp.mkdir(carpetaDossier, { recursive: true });
      await fsp.writeFile(path.join(carpetaDossier, `${uuid}.xml`), contenidoXML);

      try {
        const resultado = await db.query(
            `INSERT INTO facturas_recibidas 
             (uuid, rfc_emisor, nombre_emisor, regimen_fiscal_emisor, cp_emisor, fecha_emision, total, subtotal, iva, iva_retenido, isr_retenido, estatus_pago, folio_interno, tipo_comprobante, url_expediente, metodo_pago, rfc_receptor, sello_cfd, sello_sat, no_certificado, no_certificado_sat, fecha_timbrado)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pendiente', $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
           ON CONFLICT (uuid) DO UPDATE 
             SET url_expediente = EXCLUDED.url_expediente,
                 folio_interno   = COALESCE(facturas_recibidas.folio_interno, EXCLUDED.folio_interno),
                 tipo_comprobante = EXCLUDED.tipo_comprobante,
                 metodo_pago = EXCLUDED.metodo_pago,
                 subtotal = EXCLUDED.subtotal,
                 iva = EXCLUDED.iva,
                 iva_retenido = EXCLUDED.iva_retenido,
                 isr_retenido = EXCLUDED.isr_retenido,
                 rfc_receptor = EXCLUDED.rfc_receptor,
                 regimen_fiscal_emisor = EXCLUDED.regimen_fiscal_emisor,
                 cp_emisor = EXCLUDED.cp_emisor,
                 sello_cfd = EXCLUDED.sello_cfd,
                 sello_sat = EXCLUDED.sello_sat,
                 no_certificado = EXCLUDED.no_certificado,
                 no_certificado_sat = EXCLUDED.no_certificado_sat,
                 fecha_timbrado = EXCLUDED.fecha_timbrado
           RETURNING (xmax = 0) AS fue_insert`,
          [uuid, rfcEmisor, nombreEmisor, regimen_fiscal_emisor, cp_emisor, fechaEmision, monto, subtotal, iva, iva_retenido, isr_retenido, folioCompleto, tipo, carpetaDossier, metodoPago, rfc_receptor, sello_cfd, sello_sat, no_certificado, no_certificado_sat, fecha_timbrado]
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

        // Guardar relaciones del REP (si existen)
        if (tipo === 'P' && relacionados && relacionados.length > 0) {
          await db.query(`DELETE FROM complemento_relaciones WHERE uuid_pago = $1`, [uuid]);
          for (const r of relacionados) {
            await db.query(
              `INSERT INTO complemento_relaciones (uuid_pago, uuid_relacionado, importe_pagado, moneda)
               VALUES ($1, $2, $3, $4)`,
              [uuid, r.uuid_relacionado, r.importe_pagado, r.moneda]
            );
          }
        }

        // xmax = 0 → fue INSERT real; xmax != 0 → fue UPDATE (ya existía)
        if (resultado.rows[0]?.fue_insert) {
          console.log(`      ✅ NUEVA: ${rfcEmisor} | $${monto} | Folio: ${folioCompleto || 'N/A'}`);
          insertadas++;
        } else {
          console.log(`      🔄 YA EXISTÍA (expediente actualizado): ${uuid}`);
          yaExistian++;
        }
      } catch (dbError) {
        console.error(`      ❌ Error BD UUID ${uuid}:`, dbError.message);
      }
    }

    console.log(`\n================================================================`);
    console.log(`🎉 ¡PROCESO DE INGESTA DE AP COMPLETADO CON ÉXITO!`);
    console.log(`================================================================`);
    console.log(`================================================================`);
    if (action === 'cancelled') {
      console.log(`🗑️ Facturas canceladas eliminadas de Postgres: ${insertadas}`);
      console.log(`➖ Facturas canceladas que no estaban en BD:   ${yaExistian}`);
    } else {
      console.log(`✅ Facturas NUEVAS insertadas en Postgres:   ${insertadas}`);
      console.log(`🔄 Facturas ya existentes (expediente sync): ${yaExistian}`);
    }
    console.log(`🔒 Recibos de Nómina bloqueados/ignorados:   ${nominasIgnoradas}`);
    console.log(`📦 Total de XMLs procesados:                 ${xmlsEncontrados.length}`);
    console.log(`================================================================`);

  } catch (error) {
    console.error("Error crítico durante la descarga o procesamiento:", error);
  } finally {
    await db.end();
  }
}

descargarYProcesar();