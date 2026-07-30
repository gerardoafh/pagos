import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import {
  Fiel,
  HttpsWebClient,
  FielRequestBuilder,
  Service
} from '@nodecfdi/sat-ws-descarga-masiva';

// Cargar variables de entorno (.env en local, vars de docker-compose en Docker)
try { process.loadEnvFile(); } catch (_) {}

let intentosDesconocidos = 0;

async function verificarSolicitud() {
  if (!existsSync('last_request.json')) {
    console.error("❌ No se encontró una solicitud previa. Ejecuta 'node index.js' primero.");
    return;
  }
  
  // Leemos el RequestId y Action automáticamente
  const requestData = JSON.parse(readFileSync('last_request.json', 'utf8'));
  const requestId = requestData.requestId.trim();
  const action = requestData.action || 'active';

  try {

    console.log("Cargando credenciales FIEL...");
    const rutaCer = path.join('credenciales', process.env.FIEL_CER_NAME);
    const rutaKey = path.join('credenciales', process.env.FIEL_KEY_NAME);

    const fiel = Fiel.create(
      readFileSync(rutaCer, 'binary'),
      readFileSync(rutaKey, 'binary'),
      process.env.FIEL_PASSWORD
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
        execSync(`node download.js ${packageId} ${action}`, { stdio: 'inherit' });
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
    console.error("Error durante la verificación:", error);
  }
}

verificarSolicitud();