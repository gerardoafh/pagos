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

    const rfcArgument = process.argv[2];
    if (!rfcArgument) {
      console.error("❌ Falta el parámetro RFC de la empresa");
      process.exit(1);
    }

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

    const rutaCer = fiel_cer_path;
    const rutaKey = fiel_key_path;

    console.log(`Cargando credenciales FIEL para ${rfcArgument}...`);
    const fiel = Fiel.create(
      readFileSync(rutaCer, 'binary'),
      readFileSync(rutaKey, 'binary'),
      fiel_password
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

    // Leer parámetros de consola (el 2 ya es rfcArgument)
    const argInicio = process.argv[3];
    const argFin = process.argv[4];
    const argEstatus = process.argv[5] || 'active'; // 'active' o 'cancelled'

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
    writeFileSync(`last_request_${rfcArgument}.json`, JSON.stringify({ requestId, action: argEstatus, rfc: rfcArgument }, null, 2));
    
    // Guardar también en la base de datos (compartida entre contenedores Docker)
    await db.query(
      `INSERT INTO sat_solicitudes (rfc, request_id, action) VALUES ($1, $2, $3)`,
      [rfcArgument, requestId, argEstatus]
    );
    
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