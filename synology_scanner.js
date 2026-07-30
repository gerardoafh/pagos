import { readdirSync, readFileSync, existsSync, mkdirSync, copyFileSync, statSync } from 'fs';
import path from 'path';
import pg from 'pg';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

// Cargar variables de entorno nativas (.env)
try { process.loadEnvFile(); } catch (_) {}

import db from './config/db.js';
import { extractCFDIData } from './utils/xmlParser.js';
import { conectarRedNas } from './utils/nasHandler.js';

// Cargar variables de entorno nativas (.env)
try { process.loadEnvFile(); } catch (_) {}

// Limpieza local de palabras clave para la validación comercial (Etapa 1)
function obtenerKeywordsProveedor(nombre) {
  const ignorar = new Set(['sa', 'de', 'cv', 's', 'rl', 'grupo', 'gpo', 'mexico', 'mx', 'co', 'cwm', 'pago', 'comprobante', 'download', 'vlmz', 'vlmt']);
  return nombre.toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(' ')
    .filter(word => word.length > 3 && !ignorar.has(word));
}

// ETAPA 2: Recurso de rescate - Consulta directa a Ollama en Linux (192.168.1.56)
async function consultarOllamaComoUltimoRecurso(nombreArchivo, base64Data, extension) {
  try {
    console.log(`   🤖 [ETAPA 2] Pasando control a Ollama (192.168.1.56)...`);
    
    let promptText = `Analiza este comprobante de pago llamado "${nombreArchivo}". Necesito que extraigas el RFC del emisor del pago y el monto total de la operacion. Devuelve estrictamente el resultado en este formato exacto: "rfc: xxxxxxxxxx monto: xxxxx.xx". No agregues saludos ni explicaciones adicionales.`;
    
    const cuerpoPeticion = {
      model: process.env.OLLAMA_MODEL || "glm-4.7-flash",
      messages: [
        {
          role: "user",
          content: promptText
        }
      ],
      stream: false
    };

    // Si es una imagen real (.png/.jpg), se inyecta nativamente en su matriz de visión
    if (extension !== '.pdf') {
      cuerpoPeticion.messages[0].images = [base64Data];
    }

    const respuesta = await fetch(process.env.OLLAMA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpoPeticion),
    });

    if (!respuesta.ok) throw new Error(`Ollama status: ${respuesta.status}`);

    const data = await respuesta.json();
    return data.message?.content?.toLowerCase().replace(/,/g, '') || '';
  } catch (error) {
    console.log(`   ⚠️ Falló el rescate de Ollama: ${error.message}`);
    return '';
  }
}

async function escanearSynology() {
  let rutaNasOrigen = process.env.NAS_PAYMENTS_PATH;
  let rutaNasDestino = process.env.EXPEDIENTES_PATH;

  if (!rutaNasOrigen || !rutaNasDestino) {
    console.error("❌ Error Crítico: No se pudieron cargar las rutas del .env.");
    return;
  }

  rutaNasOrigen = rutaNasOrigen.replace(/['"]/g, '');
  rutaNasDestino = rutaNasDestino.replace(/['"]/g, '');

  try {
    console.log("Conectando a PostgreSQL 17...");
    await db.connect();
    console.log("✅ Conexión a Postgres exitosa.");

    conectarRedNas(rutaNasOrigen);
    conectarRedNas(rutaNasDestino);

    // Letreros de progreso obligatorios para mitigar el delay del protocolo SMB de red
    console.log("\n📂 [Progreso] Solicitando el listado completo de archivos al Synology...");
    console.log("⏳ Leyendo metadatos de red (+8,000 archivos). Esto puede demorar un momento, espera...");
    
    const todosLosArchivos = readdirSync(rutaNasOrigen);
    
    console.log("✅ Inventario recibido con éxito desde el NAS.");
    console.log("扫 Filtrando extensiones válidas (PDF/Imágenes)...");

    const archivosPagoFiltrados = todosLosArchivos.filter(archivo => {
      const ext = archivo.toLowerCase();
      return ext.endsWith('.pdf') || ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png');
    });

    console.log(`📊 Se detectaron ${archivosPagoFiltrados.length} documentos válidos para análisis.`);
    console.log("⏱️ Leyendo fechas de modificación para ordenar cronológicamente...");

    // Mapeo dinámico con barra de estado cada 2000 archivos
    const archivosOrdenados = archivosPagoFiltrados
      .map((archivo, index) => {
        if (index % 2000 === 0 && index > 0) {
          console.log(`   ... Analizando marcas de tiempo: ${index} archivos mapeados`);
        }
        const rutaCompleta = path.join(rutaNasOrigen, archivo);
        try {
          const info = statSync(rutaCompleta);
          return { nombre: archivo, modificadoEn: info.mtime };
        } catch (e) {
          return { nombre: archivo, modificadoEn: new Date(0) };
        }
      })
      .sort((a, b) => b.modificadoEn - a.modificadoEn);

    // Selección controlada: Solo los más nuevos de la cola
    const archivosPago = archivosOrdenados.slice(0, 1000).map(item => item.nombre);

    console.log(`\n🚀 PIPELINE HÍBRIDO LISTO: Procesando lote de los ${archivosPago.length} archivos más recientes.`);

    const queryFacturas = await db.query(
      `SELECT uuid, rfc_emisor, nombre_emisor, total, fecha_emision, url_expediente 
       FROM facturas_recibidas 
       WHERE estatus_pago = 'pendiente'`
    );
    const facturasPendientes = queryFacturas.rows;
    console.log(`Facturas en el sistema esperando conciliación: ${facturasPendientes.length}\n`);

    if (facturasPendientes.length === 0) {
      console.log("🎉 ¡No hay obligaciones pendientes en la base de datos!");
      return;
    }

    let conciliados = 0;
    let indice = 1;

    for (const archivo of archivosPago) {
      const origenArchivo = path.join(rutaNasOrigen, archivo);
      const extension = path.extname(archivo).toLowerCase();
      const nombreArchivoLower = archivo.toLowerCase();
      console.log(`----------------------------------------------------------------`);
      console.log(`[PROGRESS] Procesando documento (${indice++}/${archivosPago.length}): ${archivo}...`);

      let facturaMatch = null;
      let textoPDFLocal = "";

      // ==========================================================
      // 🔍 ETAPA 1: VALIDACIÓN LOCAL POR CADENA (Milisegundos)
      // ==========================================================
      console.log(`   🔍 [ETAPA 1] Ejecutando reglas de análisis de cadena...`);
      
      if (extension === '.pdf') {
        try {
          const dataBuffer = readFileSync(origenArchivo);
          const parsedPdf = await pdf(dataBuffer);
          textoPDFLocal = parsedPdf.text.toLowerCase().replace(/,/g, '');
        } catch (err) {
          // Avanza usando solo el título si el PDF falla
        }
      }

      // 1.1: Match Estricto (RFC + Monto en texto interno o título)
      for (const factura of facturasPendientes) {
        const rfcLower = factura.rfc_emisor.toLowerCase();
        const montoExacto = factura.total.toString();
        const montoFixed = parseFloat(factura.total).toFixed(2);

        const coincideRFC = (textoPDFLocal && textoPDFLocal.includes(rfcLower)) || nombreArchivoLower.includes(rfcLower);
        const coincideMonto = (textoPDFLocal && (textoPDFLocal.includes(montoExacto) || textoPDFLocal.includes(montoFixed))) || 
                              nombreArchivoLower.includes(montoExacto) || nombreArchivoLower.includes(montoFixed);

        if (coincideRFC && coincideMonto) {
          facturaMatch = factura;
          console.log(`      ✅ Match local exitoso por datos duros.`);
          break;
        }
      }

      // 1.2: Match por Palabras Clave del Emisor + Criterio Contable FIFO (Saldos vencidos antiguos primero)
      if (!facturaMatch) {
        const facturasFIFO = [...facturasPendientes].sort((a, b) => new Date(a.fecha_emision) - new Date(b.fecha_emision));
        for (const factura of facturasFIFO) {
          const keywords = obtenerKeywordsProveedor(factura.nombre_emisor);
          const coincideKeyword = keywords.length > 0 && keywords.some(keyword => nombreArchivoLower.includes(keyword));

          if (coincideKeyword) {
            facturaMatch = factura;
            console.log(`      ✅ Match local exitoso vía palabras clave comerciales (FIFO).`);
            break;
          }
        }
      }

      // ==========================================================
      // 🤖 ETAPA 2: RECURSO DE EMERGENCIA CON OLLAMA (Servidor Linux)
      // ==========================================================
      if (!facturaMatch) {
        console.log(`      ❌ La Etapa 1 local no arrojó resultados concluyentes.`);
        const archivoBuffer = readFileSync(origenArchivo);
        const base64Data = archivoBuffer.toString('base64');
        
        const respuestaIA = await consultarOllamaComoUltimoRecurso(archivo, base64Data, extension);

        if (respuestaIA) {
          for (const factura of facturasPendientes) {
            const rfcLower = factura.rfc_emisor.toLowerCase();
            const montoExacto = factura.total.toString();

            if (respuestaIA.includes(rfcLower) && respuestaIA.includes(montoExacto)) {
              facturaMatch = factura;
              console.log(`      🎯 ¡Rescate exitoso desde Ollama Server!`);
              break;
            }
          }
        }
      }

      // ==========================================================
      // 📂 MOVIMIENTO OPERATIVO Y ACTUALIZACIÓN EN POSTGRES
      // ==========================================================
      if (facturaMatch) {
        console.log(`   🎯 EXPEDIENTE ENLAZADO -> Proveedor: ${facturaMatch.nombre_emisor} | Total: $${facturaMatch.total}`);

        // Usamos la carpeta generada por el SAT si existe, sino la creamos
        let carpetaDossier = facturaMatch.url_expediente;
        
        if (!carpetaDossier) {
          const fecha = new Date(facturaMatch.fecha_emision);
          const anio = fecha.getFullYear().toString();
          const mes = String(fecha.getMonth() + 1).padStart(2, '0');
          carpetaDossier = path.join(rutaNasDestino, anio, mes, facturaMatch.rfc_emisor, facturaMatch.uuid);
        }

        if (!existsSync(carpetaDossier)) {
          mkdirSync(carpetaDossier, { recursive: true });
        }

        const destinoArchivo = path.join(carpetaDossier, `Pago_Validado_${archivo}`);
        copyFileSync(origenArchivo, destinoArchivo);
        console.log(`   📂 Archivo movido al dossier unificado en red.`);

        await db.query(
          `UPDATE facturas_recibidas 
           SET estatus_pago = 'pagado', url_expediente = $1 
           WHERE uuid = $2`,
          [carpetaDossier, facturaMatch.uuid]
        );

        console.log(`   ✅ Base de datos actualizada a estatus 'pagado'.`);
        facturasPendientes.splice(facturasPendientes.indexOf(facturaMatch), 1);
        conciliados++;
      } else {
        console.log(`   ❌ Archivo omitido: Imposible conciliar por ninguna de las dos etapas.`);
      }
    }

    console.log(`\n================================================================`);
    console.log(`🎉 CORRIDA DEL LOTE CONCLUIDA`);
    console.log(`================================================================`);
    console.log(`================================================================`);

    // ==========================================================
    // BARRIDO DE APROBACIONES EN EXPEDIENTES
    // ==========================================================
    console.log(`\n🔍 Iniciando barrido de aprobaciones en ${rutaNasDestino}...`);
    const queryGastos = await db.query(`SELECT uuid, url_expediente FROM facturas_recibidas WHERE aprobado = false AND url_expediente IS NOT NULL`);
    let aprobadosNuevos = 0;
    
    for (const gasto of queryGastos.rows) {
      if (!gasto.url_expediente) continue;
      try {
        if (existsSync(gasto.url_expediente)) {
          const archivosExp = readdirSync(gasto.url_expediente);
          if (archivosExp.some(archivo => archivo.toLowerCase().includes('aprob'))) {
            await db.query(`UPDATE facturas_recibidas SET aprobado = true WHERE uuid = $1`, [gasto.uuid]);
            aprobadosNuevos++;
            console.log(`   ✅ Aprobación detectada para UUID: ${gasto.uuid}`);
          }
        }
      } catch (err) {
        // Ignorar si no existe la carpeta o no hay permisos
      }
    }
    
    console.log(`✅ Barrido de aprobaciones finalizado. Nuevos aprobados: ${aprobadosNuevos}`);

  } catch (error) {
    console.error("❌ Error crítico en la ejecución del pipeline:", error);
  } finally {
    await db.end();
    console.log("🔌 Conexión a PostgreSQL cerrada limpiamente.");
  }
}

escanearSynology();