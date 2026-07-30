# Dashboard CWM - APagos 🚀

Sistema integral automatizado para la descarga masiva de facturas (CFDI) del SAT, gestión de expedientes y conciliación inteligente de pagos bancarios.

## 🌟 Características Principales

* **Sincronización SAT Automática:** Descarga masiva de comprobantes (XML) directamente del portal del SAT utilizando la e.firma (FIEL).
* **Orquestador de Expedientes en NAS:** Organización automática de XMLs y PDFs en un NAS Synology con estructura jerárquica: `Año/Mes/RFC/UUID`.
* **Conciliación Inteligente:** Vinculación automática de comprobantes de pago (PDF/Imágenes) con facturas pendientes usando un pipeline híbrido:
  * *Etapa 1:* Extracción de texto local ultra rápida (Búsqueda de Monto y RFC).
  * *Etapa 2 (Rescate):* Procesamiento con IA local (Ollama) para extraer datos de documentos estructurados de manera compleja.
* **Automatización Fantasma (Cron Jobs):** Ejecución desatendida en la madrugada para peticiones, descargas y escaneo del NAS (1:00 AM, 2:00 AM y 3:00 AM).
* **API REST:** Endpoints listos para integrarse con el frontend en React (Dashboard).

## 🛠️ Stack Tecnológico

* **Frontend:** React + Vite
* **Backend:** Node.js, Express
* **Base de Datos:** PostgreSQL 17
* **IA / Extracción Documental:** Ollama (LLM local, glm-4.7-flash)
* **Almacenamiento:** Red NAS Synology (Protocolo SMB)

## ⚙️ Configuración (.env)

Para ejecutar los scripts de procesamiento y el API de este proyecto, se requiere configurar las siguientes variables de entorno:

```env
# Base de Datos
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=5433

# Credenciales SAT (FIEL)
FIEL_CER_NAME=
FIEL_KEY_NAME=
FIEL_PASSWORD=

# Rutas y NAS
EXPEDIENTES_PATH=
NAS_PAYMENTS_PATH=
NAS_USER=
NAS_PASSWORD=

# Inteligencia Artificial (Ollama)
OLLAMA_API_URL=http://192.168.1.56:11434/api/chat
OLLAMA_MODEL=glm-4.7-flash
```

## 🚀 Uso del Backend / Scripts

El sistema cuenta con varios flujos independientes orquestados por el servidor principal:

* `node api_server.js`: Inicia el servidor web (Express) y habilita los cron jobs.
* `node synology_scanner.js`: Ejecuta el pipeline de conciliación para encontrar y emparentar los recibos de pago con facturas pendientes.
* `node verify.js`: Verifica el estado de una petición de descarga al SAT y detona su ingesta si ya está lista.
* `node update_folios.js`: Escanea el NAS y actualiza los folios internos leyendo la información cruda de los XMLs.
