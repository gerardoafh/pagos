# APagos CWM — Sistema de Tesorería Automatizada

Motor de descarga masiva SAT, conciliación bancaria y expedientes digitales para CWM.

---

## Tabla de Contenidos

- [Resumen del Sistema](#resumen-del-sistema)
- [Arquitectura](#arquitectura)
- [Requisitos](#requisitos)
- [Instalación Rápida (Docker)](#instalación-rápida-docker)
- [Instalación Manual (Desarrollo)](#instalación-manual-desarrollo)
- [Variables de Entorno](#variables-de-entorno)
- [Base de Datos](#base-de-datos)
- [API REST](#api-rest)
- [WebSockets](#websockets)
- [Frontend (Dashboard)](#frontend-dashboard)
- [Scripts del Motor SAT](#scripts-del-motor-sat)
- [Automatización (Cron Jobs)](#automatización-cron-jobs)
- [Seguridad](#seguridad)
- [Docker](#docker)
- [Estructura NAS](#estructura-de-carpetas-nas)

---

## Resumen del Sistema

**APagos** conecta tres mundos en un pipeline completamente automatizado:

| Fuente | Qué obtiene |
|--------|-------------|
| **SAT** (SOAP Web Services) | XMLs de facturas recibidas (CFDIs) |
| **NAS Synology** | Comprobantes de pago (PDFs/imágenes) |
| **PostgreSQL 17** | Almacén central de todo |

El proceso nocturno corre solo, sin intervención humana:

```
1:00 AM  Solicita descarga masiva al SAT
2:00 AM  Descarga paquetes ZIP, extrae XMLs, ingesta a BD y copia al NAS
3:00 AM  Escanea el NAS con IA (Ollama) y concilia comprobantes vs facturas
10:00 AM (Viernes) Reclamo automático de REP a proveedores morosos
```

Además, cuenta con capacidades de IA para detectar **anomalías en precios** (>30% de inflación) y extraer datos de **tickets no fiscales (imágenes/PDFs)** mediante OCR multimodal.

---

## Arquitectura

```
apagos/
|- api_server.js              Servidor Express + Socket.io + Cron Jobs (:3000)
|- index.js                   Solicitar descarga masiva al SAT
|- verify.js                  Verificar estado de paquetes SAT y descargar
|- download.js                Extraer XMLs de ZIPs e insertar en BD
|- synology_scanner.js        Conciliación NAS con IA (Ollama)
|- conciliar_complementos.js  Cruzar complementos de pago XML
|- config/
|   db.js                     Pool de conexión PostgreSQL
|- utils/
|   |- nasHandler.js          Utilidades NAS (rutas, autenticación SMB)
|   `- xmlParser.js           Parser de XML con fast-xml-parser
|- credenciales/              FIEL del SAT (.cer y .key)
`- dashboard-cwm/             Frontend React (Vite + Tailwind v4)
    `- src/
        |- App.jsx            Dashboard principal (tabla + KPIs)
        |- api.js             Constantes de URL del backend
        |- components/
        |   |- Login.jsx
        |   |- LogPanel.jsx
        |   |- MapeoContable.jsx
        |   |- ReporteConceptos.jsx
        |   `- Configuracion.jsx
        `- pages/
            `- Gastos.jsx
```

---

## Requisitos

### Producción (Docker)

- Docker Desktop con WSL2 o Linux
- Acceso de red al Synology NAS (`//192.168.1.15`)
- Acceso al servidor Ollama (`http://192.168.1.56:11434`)
- FIEL vigente del SAT (archivos `.cer` y `.key`)

### Desarrollo Local

- Node.js 22 o superior (ESM nativo)
- PostgreSQL 17 corriendo en puerto `5433`
- Credenciales SAT en `credenciales/`

---

## Instalación Rápida (Docker)

```bash
# 1. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus datos reales

# 2. Colocar la FIEL en credenciales/
#    credenciales/cercwm.cer
#    credenciales/fielcwm.key

# 3. Levantar servicios
docker compose up -d

# 4. Ver logs
docker compose logs -f api
```

Disponible en:
- **API**: `http://localhost:3000`
- **Dashboard**: `http://localhost` (Nginx sirve el build de React)

---

## Desarrollo Local con Docker

Hay tres formas de levantar el entorno. La **Opción A** es la recomendada para desarrollo activo.

---

### Opción A — Solo la BD en Docker (recomendado para dev)

Levanta únicamente PostgreSQL en un contenedor y corre el backend y frontend de forma nativa con hot-reload.

**Paso 1: Levantar solo la base de datos**

```bash
docker compose up db -d
```

Esto levanta PostgreSQL en `localhost:5433` con las credenciales del `.env`. El volumen `postgres_data` persiste los datos entre reinicios.

Verifica que está corriendo:
```bash
docker compose ps
# apagos_db   running (healthy)
```

**Paso 2: Ajustar el `.env` para desarrollo nativo**

El backend va a correr en tu máquina, así que `DB_HOST` debe apuntar a `localhost` (no a `host.docker.internal`):

```env
DB_HOST=localhost
DB_PORT=5433
CORS_ORIGIN=http://localhost:5173
```

**Paso 3: Iniciar el backend**

```bash
# Desde la raíz del proyecto
npm install
npm start
# API en http://localhost:3000
```

En el primer arranque verás:
```
✅ Base de datos conectada al API Web
✅ Auto-setup de base de datos completado.
✅ Usuario admin creado. Contraseña: CWM_Admin_2026!
⏰ Programando tareas automáticas (Cron Jobs)...
🚀 Servidor API corriendo en http://localhost:3000
```

**Paso 4: Iniciar el frontend con hot-reload**

```bash
cd dashboard-cwm
npm install
npm run dev
# Dashboard en http://localhost:5173
```

El frontend en modo dev usa `VITE_API_URL=http://localhost:3000` por defecto (ver `src/api.js`), así que apunta directamente al backend nativo. No necesitas configurar nada adicional.

Resumen de puertos en este modo:

| Servicio | URL |
|---------|-----|
| Dashboard (Vite dev) | http://localhost:5173 |
| API Backend | http://localhost:3000 |
| PostgreSQL | localhost:5433 |

---

### Opción B — Todo en Docker (igual que producción)

Útil para probar el build final de producción o cuando no quieres instalar Node localmente.

```bash
# Construir las imágenes y levantar todo
docker compose up --build -d

# Ver logs de todos los servicios
docker compose logs -f

# Ver logs solo del API
docker compose logs -f api

# Ver logs solo del frontend (nginx)
docker compose logs -f frontend
```

En este modo el `.env` debe tener:

```env
DB_HOST=host.docker.internal   # El contenedor api accede al contenedor db por DNS interno
CORS_ORIGIN=http://localhost
```

Puertos disponibles:

| Servicio | URL |
|---------|-----|
| Dashboard (Nginx) | http://localhost |
| API Backend | http://localhost:3000 |
| PostgreSQL | localhost:5433 |

> **Nota**: En Docker, Nginx hace proxy reverso de `/api/` y `/socket.io/` hacia el contenedor `api:3000`. Por eso el frontend compila con `VITE_API_URL=""` — todas las llamadas son relativas y Nginx las enruta internamente.

**Reconstruir solo el backend después de cambios en el código:**

```bash
docker compose up --build api -d
```

**Reconstruir solo el frontend después de cambios en el dashboard:**

```bash
docker compose up --build frontend -d
```

---

### Opción C — Todo nativo (sin Docker)

Necesitas PostgreSQL 17 instalado localmente en el puerto `5433`.

```bash
# Backend
npm install
npm start

# Frontend (otra terminal)
cd dashboard-cwm
npm install
npm run dev
```

`.env` para este modo:

```env
DB_HOST=localhost
DB_PORT=5433
CORS_ORIGIN=http://localhost:5173
```

---

### Comandos útiles durante el desarrollo

```bash
# Detener todos los contenedores (conserva los datos)
docker compose down

# Detener y borrar todos los datos de la BD
docker compose down -v

# Ver estado de los contenedores
docker compose ps

# Entrar al contenedor del backend para debug
docker exec -it apagos_api sh

# Ver logs de la BD
docker compose logs db

# Reiniciar solo la BD sin perder datos
docker compose restart db
```

---

## Variables de Entorno

Archivo `.env` en la raíz del proyecto:

```env
# Base de Datos PostgreSQL
DB_USER=postgres
DB_HOST=localhost
DB_NAME=tesoreria
DB_PASSWORD=tu_password
DB_PORT=5433

# FIEL SAT
FIEL_PASSWORD=tu_password_fiel
FIEL_CER_NAME=cercwm.cer
FIEL_KEY_NAME=fielcwm.key

# Synology NAS
NAS_PAYMENTS_PATH=//192.168.1.15/bancos/CWM
EXPEDIENTES_PATH=//192.168.1.15/pagos/CWM
NAS_USER=api
NAS_PASSWORD=tu_password_nas

# Ollama (IA para conciliacion)
OLLAMA_API_URL=http://192.168.1.56:11434/api/chat
OLLAMA_MODEL=glm-4.7-flash

# Seguridad
JWT_SECRET=clave_larga_aleatoria_y_segura_aqui
ADMIN_PASSWORD=CWM_Admin_2026!

# CORS
CORS_ORIGIN=http://localhost
PORT=3000
```

> **IMPORTANTE**: Cambia `ADMIN_PASSWORD` inmediatamente después del primer arranque.  
> El sistema crea el usuario `admin` automáticamente si no existe.

---

## Base de Datos

El servidor crea todas las tablas automáticamente al arrancar (idempotente con `IF NOT EXISTS`). No se requieren migraciones manuales.

### Tablas

| Tabla | Descripción |
|-------|-------------|
| `facturas_recibidas` | CFDIs del SAT. Tabla central del sistema |
| `factura_conceptos` | Conceptos (líneas) de cada CFDI |
| `cuentas_contables` | Catálogo contable (códigos y nombres) |
| `configuracion_contable_proveedor` | Mapeo RFC a cuentas de Gasto/Pasivo/IVA |
| `polizas` | Pólizas contables generadas |
| `movimientos_poliza` | Movimientos Debe/Haber de cada póliza |
| `sat_efos` | Lista negra Art. 69-B SAT |
| `usuarios` | Usuarios del sistema con hash bcrypt |

### Columnas Clave de facturas_recibidas

```
uuid                UUID PRIMARY KEY    -- Folio fiscal del CFDI
rfc_emisor          VARCHAR(13)
nombre_emisor       VARCHAR(255)
fecha_emision       TIMESTAMP WITH TIME ZONE
total               DECIMAL(18,2)
subtotal            DECIMAL(18,2)       -- IVA calculado del XML
iva                 DECIMAL(18,2)
iva_retenido        DECIMAL(18,2)
isr_retenido        DECIMAL(18,2)
estatus_pago        VARCHAR(20)         -- pendiente | pagado
estatus_fiscal      VARCHAR(20)         -- vigente | cancelado
tipo_comprobante    VARCHAR(5)          -- I | E | P | N
metodo_pago         VARCHAR(3)          -- PUE | PPD
tiene_complemento   BOOLEAN             -- TRUE si llegó el REP
url_expediente      TEXT                -- Ruta carpeta en NAS
moneda              VARCHAR(10)
tipo_cambio         DECIMAL(10,4)
aprobado            BOOLEAN             -- Aprobación manual
alerta_efos         BOOLEAN             -- Proveedor en lista negra
```

### Scripts de Setup Adicionales

```bash
npm run importar-cuentas       # Importar catálogo contable desde CSV
npm run importar-historicos    # Importar histórico de XMLs del NAS
npm run update-folios          # Actualizar folios/tipo desde XMLs
npm run setup-efos             # Configurar tabla EFOS
```

---

## API REST

Todos los endpoints (excepto `/api/login`) requieren:

```
Authorization: Bearer <token_jwt>
```

---

### Autenticación

#### POST /api/login

Autentica al usuario y retorna un JWT con 8 horas de expiración.

Request:
```json
{ "usuario": "admin", "password": "CWM_Admin_2026!" }
```

Response:
```json
{ "token": "eyJ...", "mensaje": "Autenticación exitosa" }
```

---

### Facturas

#### GET /api/facturas

Retorna todas las facturas con datos calculados para el dashboard (subtotal, IVA, tipo CFDI, etc.).

#### GET /api/gastos

Retorna el reporte de gastos con conceptos y cuentas contables mapeadas por proveedor.

#### POST /api/facturas/:uuid/aprobar

Toggle del campo `aprobado` en la factura. Retorna el nuevo estado.

---

### Comprobantes y Expedientes

#### POST /api/subir-pago/:uuid

Recibe un archivo (PDF/imagen) via multipart, lo copia al expediente del NAS y marca la factura como `pagado`.

#### POST /api/subir-aprobacion/:uuid

Recibe un archivo de aprobación y lo guarda en la carpeta del expediente en el NAS.

#### DELETE /api/eliminar-pago/:uuid

Borra la carpeta del expediente en el NAS y regresa el estatus a `pendiente`.

#### POST /api/abrir-expediente

Body: `{ "ruta": "//NAS/pagos/CWM/..." }`  
Abre la carpeta en el Explorador de Windows. Solo funciona cuando el servidor corre en Windows.

---

### Tareas Automatizadas

Rate limit: 5 ejecuciones por hora por IP.

#### POST /api/sat/sync

Inicia `node index.js && node verify.js` en segundo plano. Progreso via WebSocket.

#### POST /api/escanear-nas

Inicia `node synology_scanner.js` en segundo plano. Progreso via WebSocket.

#### POST /api/conciliar-xml

Inicia `npm run conciliar-xml` en segundo plano. Resultado via WebSocket.

---

### Conciliación Bancaria

#### POST /api/bancos/conciliar

Recibe un archivo CSV del estado de cuenta bancario. Busca coincidencias por monto exacto en facturas pendientes. Usa el RFC en el concepto para desempatar múltiples matches.

Formato CSV esperado:
```
Fecha, Concepto, Cargo, Abono, Saldo
```

Response:
```json
{
  "mensaje": "Conciliación completa: 12 facturas aplicadas.",
  "reporte": [
    { "concepto": "Pago PROVEEDOR SA DE CV", "monto": 5800.00, "estatus": "Conciliada", "uuid": "...", "proveedor": "..." }
  ]
}
```

---

### Módulo Contable

#### GET /api/contabilidad/proveedores-sin-mapeo

Lista RFCs en `facturas_recibidas` que no tienen cuentas asignadas en `configuracion_contable_proveedor`.

#### GET /api/contabilidad/cuentas

Retorna el catálogo completo de cuentas contables ordenado por tipo.

#### POST /api/contabilidad/mapear-proveedor

```json
{
  "rfc_emisor": "ABC123456789",
  "cuenta_gasto_id": 6,
  "cuenta_pasivo_id": 4,
  "cuenta_iva_pendiente_id": 3
}
```

Usa `ON CONFLICT DO UPDATE` para actualizar si ya existe el mapeo.

#### GET /api/contabilidad/exportar-contpaqi

Genera el archivo TXT de Pólizas de Diario para importar en CONTPAQi. También guarda las pólizas en la BD (`polizas` y `movimientos_poliza`).

Parámetros: `?anio=2026&mes=07&dia=Todos`

#### GET /api/contabilidad/exportar-egresos

Genera el archivo TXT de Pólizas de Egreso para CONTPAQi (facturas pagadas del periodo).

Parámetros: `?anio=2026&mes=07&dia=Todos`

#### GET /api/contabilidad/exportar-diot

Genera el CSV del Reporte DIOT (Declaración Informativa de Operaciones con Terceros) con BOM UTF-8 para Excel.

Parámetros: `?anio=2026&mes=07&dia=Todos`

#### GET /api/contabilidad/exportar-conceptos

Exporta todos los conceptos del periodo (UUID, fecha, RFC, proveedor, clave SAT, descripción, cantidad, precio, importe, descuento) en CSV.

Parámetros: `?anio=2026&mes=07&dia=Todos`

---

### Inteligencia de Compras

#### GET /api/conceptos/buscar

Query param: `?q=papelería`  
Busca en `descripcion`, `clave_prod_serv` y `nombre_emisor` con ILIKE. Retorna hasta 1,000 resultados ordenados por fecha.

---

### Cumplimiento Fiscal

#### POST /api/fiscal/verificar-estatus-sat

Consulta el Web Service SOAP del SAT para verificar si un CFDI está vigente o cancelado. Actualiza `estatus_fiscal` en la BD.

```json
{
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "rfcEmisor": "ABC123456789",
  "rfcReceptor": "XYZ987654321",
  "total": "1160.00"
}
```

---

### Configuración

#### GET /api/config

Lee el archivo `.env` y retorna las variables como JSON. Las contraseñas (`DB_PASSWORD`, `FIEL_PASSWORD`, `NAS_PASSWORD`, `JWT_SECRET`) se reemplazan por `***`.

#### POST /api/config

Actualiza variables del `.env`. Solo se aceptan las variables de la lista blanca:
`NAS_PAYMENTS_PATH`, `EXPEDIENTES_PATH`, `NAS_USER`, `FIEL_CER_NAME`, `FIEL_KEY_NAME`, `OLLAMA_API_URL`, `OLLAMA_MODEL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `CORS_ORIGIN`, `PORT`.

---

## WebSockets

El servidor emite los siguientes eventos via Socket.io:

| Evento | Payload | Cuándo |
|--------|---------|--------|
| `process-log` | `{ tarea, linea, ts }` | Cada línea de stdout/stderr de los scripts |
| `sync-progress` | `{ task, message }` | Mensajes con prefijo `[PROGRESS]` |
| `task-completed` | `{ task, message }` | Al finalizar exitosamente |
| `task-error` | `{ task, error }` | Al terminar con código != 0 |

Para emitir progreso desde un script personalizado:
```javascript
console.log('[PROGRESS] Procesando XML 150 de 3000...');
```

El `LogPanel` del dashboard captura todos estos eventos y los muestra en la terminal flotante.

---

## Frontend (Dashboard)

### Dashboard Principal (App.jsx)

Vista de inicio después del login.

- **KPIs** (4 tarjetas): Obligaciones Pendientes (sin E/P), Conciliado este Mes, Archivos Procesados, Retenciones Pendientes
- **Tabla de facturas** con paginación de 50 registros por página
- **Filtros**: Año, mes, tipo CFDI (facturas/complementos), estatus (pendiente/pagado/todos)
- **Búsqueda** por proveedor, RFC, folio o UUID
- **Acciones por fila**:
  - Abrir carpeta del expediente en Windows Explorer
  - Subir comprobante de pago (PDF/imagen) → marca como pagado
  - Tomar foto con cámara del dispositivo móvil
  - Eliminar pago / deshacer conciliación
  - Copiar UUID al portapapeles
  - **Aprobar Factura**: Marcar como aprobada para pago (Escudo)
  - **Verificar en SAT**: Consulta SOAP en tiempo real para verificar vigencia (Lupa)
- **Carga Manual OCR (Tickets)**: Sube tickets no fiscales con Inteligencia Artificial (Ollama) directamente.
- **Indicador PPD**: Candado rojo en facturas PPD pagadas sin Complemento de Pago (REP)
- **Panel de logs** flotante en tiempo real via WebSocket
- **Gráfica de Flujo de Efectivo** interactiva proyectando Egresos vs Pasivos
- **Toasts Push** notificaciones en tiempo real impulsadas por Socket.io

### Conciliación Bancaria (pages/Conciliacion.jsx)

Interfaz automática para procesar estados de cuenta.

- Arrastra y suelta (Drag & Drop) del archivo CSV bancario
- Procesamiento y cruce de datos automático contra la base de facturas pendientes
- Visualización de tarjetas de resultados (procesadas, exitosas, no encontradas)
- Detalle tabular de las transacciones con estatus individual

### Gastos (pages/Gastos.jsx)

Vista tabular estilo hoja de cálculo.

- ~25 columnas incluyendo conceptos desglosados, cuentas contables y estado de aprobación
- Filtros por año, mes y búsqueda libre
- Subida de archivos de aprobación por fila
- Exportación completa a CSV

### Inteligencia de Compras (components/ReporteConceptos.jsx)

Análisis de precios históricos por producto o proveedor.

- Buscador por descripción de concepto, clave SAT o nombre de proveedor
- Gráfica de línea de tendencia de precios unitarios (Recharts v3)
- Tarjeta de detalle al hacer clic en un punto de la gráfica
- Selector de periodo (año/mes/día)
- **Exportación de Conceptos**: Descarga de todos los conceptos del periodo seleccionado (o total) directamente a un archivo CSV/Excel.

### Contabilidad (components/MapeoContable.jsx)

Módulo de mapeo contable y exportación para CONTPAQi.

- Lista de proveedores "huérfanos" (sin cuentas asignadas)
- Formulario de mapeo: Cuenta Gasto, Cuenta Pasivo, Cuenta IVA por RFC
- Selector de periodo para exportaciones
- **Previsualización de Pólizas**: Modal dinámico para inspeccionar asientos contables (cargos/abonos) generados por el backend en JSON, antes de exportar.
- Botones de exportación:
  - **Pólizas de Diario** (momento de recepción de facturas)
  - **Pólizas de Egreso** (momento de pago)
  - **DIOT** (declaración informativa mensual)

> [!TIP]
> Existe un cliente PowerShell local (`puente_contpaqi.ps1`) que puede ejecutarse en el servidor Windows para inyectar estas pólizas directamente al SDK de CONTPAQi, con soporte *Multi-Tenant* (Múltiples Empresas).

### Configuración (components/Configuracion.jsx)

Editor visual del archivo `.env`.

- Muestra todas las variables del `.env` agrupadas
- Las contraseñas siempre aparecen como `***`
- Guarda solo las variables de la lista blanca de seguridad

---

## Scripts del Motor SAT

### npm start — Servidor API

Levanta Express en el puerto 3000. Registra los 3 cron jobs automáticamente. Ejecuta `autoSetup()` para crear tablas y usuario admin si no existen.

### node index.js — Solicitar al SAT

Usa `@nodecfdi/sat-ws-descarga-masiva` con la FIEL. Solicita la descarga de CFDIs recibidos del año en curso (tipo XML, solo vigentes). Guarda el `RequestId` en `last_request.txt` para que `verify.js` lo consulte en la siguiente ejecución.

### node verify.js — Verificar y Descargar

Lee el `RequestId` de `last_request.txt`. Consulta el SAT si los paquetes están disponibles. Por cada paquete con estado "Disponible", llama a `download.js` de forma síncrona. Al completar el ciclo, envía notificación por Telegram con el resumen.

### node download.js — Procesar Paquetes

Para cada ZIP descargado del SAT:
1. Extrae los XMLs del ZIP (maneja ZIPs anidados de hasta 2 niveles)
2. Parsea cada XML con `fast-xml-parser`
3. Extrae: UUID, RFC emisor/receptor, fecha, total, subtotal, IVA, retenciones, método de pago, tipo de comprobante, conceptos
4. Inserta en `facturas_recibidas` y `factura_conceptos` (ignora duplicados por UUID)
5. Copia el XML al NAS: `EXPEDIENTES_PATH/YYYY/MM/RFC/UUID/factura.xml`
6. Autentica contra el NAS via `net use` si es necesario

### node synology_scanner.js — Orquestador IA

Lee hasta 1,000 archivos más recientes de `NAS_PAYMENTS_PATH`.

**Etapa 1 — Conciliación Local:**
- Para archivos PDF: extrae texto y busca RFC en el contenido
- Para cualquier archivo: busca el nombre del proveedor como keywords en el nombre del archivo
- Busca facturas pendientes que coincidan por RFC + monto exacto
- Estrategia FIFO para desempatar múltiples facturas del mismo proveedor

**Etapa 2 — Conciliación con IA:**
- Si no hay match local, convierte el archivo a base64 y lo envía a Ollama
- El prompt pide al modelo extraer RFC y monto total del documento
- Vuelve a buscar en la BD con los datos extraídos por la IA

Si se encuentra match: copia el comprobante a la carpeta del expediente y actualiza `estatus_pago = 'pagado'` en la BD.

**OCR Multimodal para Recibos No Fiscales:**
Si se suben imágenes (JPG/PNG) o PDFs escaneados de tickets de restaurante/gasolina, el sistema utiliza `poppler` y `graphicsmagick` para renderizarlos, enviándolos al cerebro multimodal de Ollama (Llava/Minicpm) para extraer Fecha, Monto, Nombre y Concepto, insertándolos como facturas "No Fiscales" (Tipo `N`).

### Detección de Anomalías de Precios (`utils/aiAnomalies.js`)

Escanea el historial de los últimos 6 meses del proveedor y calcula el precio promedio unitario. Si en una factura nueva detecta un sobreprecio > 30%, marca `anomalia_precio = TRUE` y genera una bitácora de auditoría.

### Reclamo Automático de REP (`utils/repClaimer.js`)

Ejecutado por BullMQ todos los viernes a las 10:00 AM. Busca facturas `PPD` pagadas que no tienen complemento asociado tras varios días. Si encuentra morosos, envía automáticamente un correo exigiendo el REP al `correo_contacto` del proveedor.

### npm run conciliar-xml — Complementos de Pago

Lee XMLs de tipo `P` (Complemento de Pago / REP) del NAS. Cruza el UUID del CFDI relacionado contra `facturas_recibidas`. Si la factura existe y tiene método de pago PPD, actualiza `tiene_complemento = TRUE`.

---

## Automatización (Cron Jobs)

El servidor programa automáticamente 3 cron jobs al arrancar. No requieren configuración adicional.

| Hora | Script | Qué hace |
|------|--------|----------|
| 1:00 AM | `node index.js` | Solicita descarga masiva al SAT. Guarda RequestId |
| 2:00 AM | `node verify.js` | Descarga paquetes listos, extrae XMLs, ingesta a BD y NAS. Notifica por Telegram |
| 3:00 AM | `node synology_scanner.js` | Concilia comprobantes del NAS con facturas pendientes usando IA |

Para disparar manualmente desde el dashboard, usa los botones de la barra superior o los endpoints de la API.

---

## Seguridad

### Implementado

| Mecanismo | Detalle |
|-----------|---------|
| Autenticación JWT | bcrypt para hashing, JWT firmado con `JWT_SECRET`, expiración de 8h |
| Auto-provisioning | Usuario `admin` creado automáticamente en el primer arranque |
| Rate limiting global | 150 peticiones por 15 minutos por IP |
| Rate limiting tareas pesadas | 5 ejecuciones por hora para SAT/NAS |
| Sanitización de rutas | Valida contra rutas NAS autorizadas antes de ejecutar explorer |
| Lista blanca .env | Solo 11 variables no sensibles son modificables desde el frontend |
| JWT_SECRET obligatorio | El servidor no arranca sin esta variable definida |
| CORS restrictivo | Solo acepta peticiones del origen definido en `CORS_ORIGIN` |

### Pendiente

- Roles más granulares que admin/viewer
- Log de auditoría (quién hizo qué y cuándo)
- 2FA para login

---

## Dependencias Principales

### Backend (package.json)

| Paquete | Versión | Uso |
|---------|---------|-----|
| `@nodecfdi/sat-ws-descarga-masiva` | ^2.0.0 | Descarga masiva SAT SOAP |
| `@nodecfdi/credentials` | ^3.2.0 | FIEL del SAT |
| `express` | ^5.2.1 | Servidor HTTP |
| `socket.io` | ^4.8.1 | WebSockets en tiempo real |
| `pg` | ^8.21.0 | PostgreSQL driver (Pool) |
| `bcrypt` | ^6.0.0 | Hash de contraseñas |
| `jsonwebtoken` | ^9.0.2 | Autenticación JWT |
| `fast-xml-parser` | ^5.10.1 | Parseo de CFDIs XML |
| `multer` | ^2.1.1 | Subida de archivos multipart |
| `node-cron` | ^4.2.1 | Tareas programadas |
| `express-rate-limit` | ^7.5.1 | Rate limiting |
| `adm-zip` | ^0.5.17 | Extracción de ZIPs |
| `pdf-parse` | ^2.4.5 | Extracción de texto de PDFs |

### Frontend (dashboard-cwm/package.json)

| Paquete | Versión | Uso |
|---------|---------|-----|
| `react` | ^19.2.6 | Framework UI |
| `vite` | ^8.0.12 | Bundler y dev server |
| `tailwindcss` | ^4.3.0 | Estilos (Tailwind v4) |
| `recharts` | ^3.10.1 | Gráficas de tendencias |
| `lucide-react` | ^1.16.0 | Íconos |
| `socket.io-client` | ^4.8.3 | WebSockets cliente |

---

## Docker

El `docker-compose.yml` orquesta dos contenedores:

| Servicio | Puerto | Descripción |
|---------|--------|-------------|
| `api` | 3000 | Node.js API server |
| `dashboard` | 80 | Nginx sirviendo el build de React |

```bash
# Construir imágenes
docker compose build

# Iniciar en producción
docker compose up -d

# Ver logs en vivo
docker compose logs -f

# Detener
docker compose down
```

---

## Estructura de Carpetas NAS

```
//192.168.1.15/
|
|- bancos/CWM/              Comprobantes de pago originales (entrada del scanner)
|   |- Transferencia_HSBC_2026.pdf
|   `- ...
|
`- pagos/CWM/               Expedientes digitales organizados (salida)
    `- 2026/
        `- 07/
            `- ABC123456789/        RFC del proveedor
                `- uuid-del-cfdi/
                    |- factura.xml
                    |- Pago_Manual_comprobante.pdf
                    `- Aprobacion_autorizado.pdf
```

---

*Sistema desarrollado para CWM — Tesorería Automatizada 2026.*

docker compose up --build -d
