import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import pg from 'pg';
import {
  Fiel,
  HttpsWebClient,
  FielRequestBuilder,
  Service
} from '@nodecfdi/sat-ws-descarga-masiva';

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

let intentosDesconocidos = 0;

async function verificarSolicitud() {
  const rfcArgument = process.argv[2];
  if (!rfcArgument) {
    console.error("❌ Falta el parámetro RFC de la empresa");
    process.exit(1);
  }

  const reqFile = `last_request_${rfcArgument}.json`;
  
  let requestId, action;

  if (existsSync(reqFile)) {
    // Leer del archivo local (ejecución directa)
    const requestData = JSON.parse(readFileSync(reqFile, 'utf8'));
    requestId = requestData.requestId.trim();
    action = requestData.action || 'active';
  } else {
    // Fallback: buscar en la base de datos (ejecución desde Docker Worker)
    try {
      await db.connect();
      const result = await db.query(
        `SELECT request_id, action FROM sat_solicitudes WHERE rfc = $1 ORDER BY fecha_solicitud DESC LIMIT 1`,
        [rfcArgument]
      );
      if (result.rows.length === 0) {
        console.error(`❌ No se encontró una solicitud previa para ${rfcArgument}. Ejecuta 'node index.js ${rfcArgument}' primero.`);
        return;
      }
      requestId = result.rows[0].request_id;
      action = result.rows[0].action || 'active';
      console.log(`📋 RequestId recuperado de la base de datos: ${requestId}`);
    } catch (dbErr) {
      console.error(`❌ No se encontró una solicitud previa para ${rfcArgument}. Ejecuta 'node index.js ${rfcArgument}' primero.`);
      return;
    }
  }

  try {
    await db.connect();
    
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

    // Timeout de 60s para evitar crash duro por TypeError: webError.getResponse is not a function
    const webClient = new HttpsWebClient(undefined, undefined, 60000);
    const requestBuilder = new FielRequestBuilder(fiel);
    const service = new Service(requestBuilder, webClient);
    console.log("✅ Servicio SAT inicializado para verificación.");

    console.log(`Consultando estado del RequestId: ${requestId}...`);
    const verifyResult = await service.verify(requestId);

    // Obtener los estatus internos analizando las clases del código fuente
    const estadoPeticion = verifyResult.getStatusRequest(); // Instancia de StatusRequest
    const codigoResultado = verifyResult.getCodeRequest();

    console.log(`\n================================================================`);
    console.log(`Estatus en el SAT: ${estadoPeticion.toJSON().message} (${estadoPeticion.getEntryId()})`);
    console.log(`Código de Respuesta: ${codigoResultado.toJSON().message}`);
    console.log(`================================================================`);

    // Comprobamos si el estado ya es 'Finished' (Terminada)
    if (estadoPeticion.isTypeOf('Finished')) {
      const paquetes = verifyResult.getPackageIds();
      console.log(`✅ ¡El SAT ha terminado de empaquetar tus datos!`);
      console.log(`Total de CFDI encontrados: ${verifyResult.getNumberCfdis()}`);
      console.log(`Total de paquetes generados: ${verifyResult.countPackages()}`);
      console.log(`IDs de los paquetes listos:`, paquetes);
      
      // Enviar Notificación de Éxito (Ejemplo: Telegram)
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
        try {
          const mensaje = `✅ *APagos SAT*\nSe encontraron ${verifyResult.getNumberCfdis()} CFDI en ${verifyResult.countPackages()} paquete(s).\nIniciando descarga e ingesta automática... 🚀`;
          const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: mensaje, parse_mode: 'Markdown' })
          }).catch(err => console.error("Error en la red al enviar Telegram:", err));
        } catch (e) { console.error("Error preparando notificación:", e); }
      }

      console.log(`\n🚀 Detonando descarga e ingesta de paquetes automáticamente (Modo: ${action})...`);
      for (const packageId of paquetes) {
        execSync(`node download.js ${rfcArgument} ${packageId} ${action}`, { stdio: 'inherit' });
      }
    } else if (estadoPeticion.isTypeOf('InProgress') || estadoPeticion.isTypeOf('Accepted')) {
      console.log("⏳ El SAT sigue armando los XML físicos. Volviendo a preguntar en 60 segundos...\n");
      setTimeout(verificarSolicitud, 60000); // Reintenta solito en 1 minuto
    } else if (estadoPeticion.isTypeOf('Unknown') && intentosDesconocidos < 5) {
      intentosDesconocidos++;
      console.log(`⚠️ El SAT no devolvió un estado claro (timeout o error temporal). Reintento ${intentosDesconocidos}/5 en 60s...`);
      setTimeout(verificarSolicitud, 60000);
    } else {
      console.log("❌ La solicitud fue rechazada, falló o expiró en los servidores del SAT (o se agotaron los reintentos).");
      process.exit(1); // Importante salir con código de error para que no diga "descarga finalizada"
    }

  } catch (error) {
    console.error("❌ Ocurrió un error en la verificación:", error.message || error);
  } finally {
    await db.end();
  }
}

verificarSolicitud();