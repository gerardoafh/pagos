import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import pg from 'pg';
import {
  Fiel,
  HttpsWebClient,
  FielRequestBuilder,
  Service,
  QueryParameters,
  DateTimePeriod,
  DownloadType,
  RequestType,
  DocumentStatus
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

async function iniciarMotor() {
  try {
    console.log("Conectando a PostgreSQL 17 en Windows...");
    await db.connect();
    console.log("✅ Conexión a Postgres exitosa.");

    const rutaCer = path.join('credenciales', process.env.FIEL_CER_NAME);
    const rutaKey = path.join('credenciales', process.env.FIEL_KEY_NAME);

    console.log("Cargando credenciales FIEL...");
    const fiel = Fiel.create(
      readFileSync(rutaCer, 'binary'),
      readFileSync(rutaKey, 'binary'),
      process.env.FIEL_PASSWORD
    );

    if (!fiel.isValid()) {
      console.error("❌ La FIEL no es válida o está caducada.");
      return;
    }

    // Timeout de 60s para evitar crash si el SAT tarda en responder
    const webClient = new HttpsWebClient(undefined, undefined, 60000);
    const requestBuilder = new FielRequestBuilder(fiel);
    const service = new Service(requestBuilder, webClient);
    console.log("✅ Servicio SAT inicializado. Motor listo en Windows.");

    // Leer parámetros de consola
    const argInicio = process.argv[2];
    const argFin = process.argv[3];
    const argEstatus = process.argv[4] || 'active'; // 'active' o 'cancelled'

    let fechaInicioStr = '';
    let fechaFinStr = '';

    if (argInicio && argFin) {
      console.log(`Configurando parámetros personalizados: ${argInicio} a ${argFin} (Estatus: ${argEstatus})`);
      fechaInicioStr = `${argInicio} 00:00:00`;
      fechaFinStr = `${argFin} 23:59:59`;
    } else {
      console.log("Configurando parámetros por defecto (Todo el año 2026, vigentes)...");
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      const randomSec = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      fechaInicioStr = `${year}-01-01 00:00:${randomSec}`; // Desde inicio de año
      fechaFinStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Hasta este exacto segundo
    }

    const periodo = DateTimePeriod.createFromValues(fechaInicioStr, fechaFinStr);
    
    const request = QueryParameters.create()
      .withPeriod(periodo)
      .withDownloadType(new DownloadType('received'))
      .withRequestType(new RequestType('xml'))
      .withDocumentStatus(new DocumentStatus(argEstatus));

    console.log("Enviando solicitud de descarga masiva al SAT...");
    const query = await service.query(request);

    if (!query.getStatus().isAccepted()) {
      console.error(`❌ Falló al presentar la consulta: ${query.getStatus().getMessage()}`);
      return;
    }

    const requestId = query.getRequestId();
    writeFileSync('last_request.json', JSON.stringify({ requestId, action: argEstatus }, null, 2));
    
    console.log(`\n🚀 ¡Solicitud anual aceptada con éxito por el SAT!`);
    console.log(`================================================================`);
    console.log(`ID de Solicitud (RequestId): ${requestId}`);
    console.log(`================================================================`);
    console.log(`El ID se ha guardado solo. Ahora simplemente ejecuta: node verify.js`);

  } catch (error) {
    console.error("Error crítico en la inicialización o consulta:", error);
  } finally {
    await db.end();
  }
}

iniciarMotor();