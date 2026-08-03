import express from 'express';
import cors from 'cors';
import { isValidNASPath } from './utils/nasHandler.js';
import pg from 'pg';
import { exec, spawn } from 'child_process';
import multer from 'multer';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import rateLimit from 'express-rate-limit'; // <-- Seguridad Rate Limiting
import jwt from 'jsonwebtoken'; // <-- Tokens JWT
import bcrypt from 'bcrypt'; // <-- Hashing seguro de contraseñas
import { createServer } from 'http'; // <-- Servidor HTTP para WebSockets
import { Server } from 'socket.io'; // <-- WebSockets
import { registerComprasEndpoints } from './routes/compras.js'; // Inteligencia de Compras

// Cargar variables de entorno nativas (.env) — Solo en desarrollo local.
// En Docker, las variables se inyectan vía env_file / environment en docker-compose.
try {
  process.loadEnvFile();
} catch (_) {
  // En Docker no existe el .env físico — las vars ya están en process.env
}

const app = express();
const server = createServer(app);

// 🛡️ Configuración de WebSockets (Socket.io)
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Inyectar io en la app para usarlo en endpoints y middlewares
app.set('io', io);

// 🛡️ Configuración segura de CORS
const corsOptions = {
  // Vite usa por defecto el puerto 5173. Puedes cambiar esto en tu .env con CORS_ORIGIN
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());

// 🛡️ Rate Limiting Global: Máximo 150 peticiones cada 15 minutos por IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 150, 
  message: { error: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// Configuración de Multer para recibir el archivo temporalmente en el servidor Node
const upload = multer({ dest: 'temp_uploads/' });

// Conexión a PostgreSQL 17 (Mejora: Uso de Pool para estabilidad y reconexión automática)
import db from './config/db.js';

db.query('SELECT NOW()')
  .then(() => console.log('✅ Base de datos conectada al API Web'))
  .catch(err => console.error('❌ Error de conexión a BD:', err));

// ==========================================================
// AUTO-SETUP: Crear tablas y usuario admin si no existen
// Se ejecuta en cada arranque — safe porque usa IF NOT EXISTS
// ==========================================================
async function autoSetup() {
  try {
    // 1. Tabla de Empresas (Multi-Tenant)
    await db.query(`
      CREATE TABLE IF NOT EXISTS empresas (
        id SERIAL PRIMARY KEY,
        rfc VARCHAR(13) UNIQUE NOT NULL,
        razon_social VARCHAR(255) NOT NULL,
        activa BOOLEAN DEFAULT TRUE,
        creada_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Insertar la empresa principal por defecto si no existe
      INSERT INTO empresas (rfc, razon_social) 
      VALUES ('CWM020627SJ7', 'CHEONG WOON MEXICO SA DE CV')
      ON CONFLICT (rfc) DO NOTHING;
    `);

    // 2. Tabla principal de facturas
    await db.query(`
      CREATE TABLE IF NOT EXISTS facturas_recibidas (
        uuid UUID PRIMARY KEY,
        rfc_emisor VARCHAR(13),
        nombre_emisor VARCHAR(255),
        regimen_fiscal_emisor VARCHAR(10),
        cp_emisor VARCHAR(10),
        fecha_emision TIMESTAMP WITH TIME ZONE,
        total DECIMAL(18, 2),
        subtotal DECIMAL(18, 2),
        iva DECIMAL(18, 2),
        iva_retenido DECIMAL(18, 2),
        isr_retenido DECIMAL(18, 2),
        total_retenciones DECIMAL(18, 2) DEFAULT 0,
        estatus VARCHAR(20) DEFAULT 'pendiente',
        estatus_fiscal VARCHAR(20) DEFAULT 'vigente',
        estatus_pago VARCHAR(20) DEFAULT 'pendiente',
        folio_interno VARCHAR(50),
        tipo_comprobante VARCHAR(5),
        url_expediente TEXT,
        metodo_pago VARCHAR(3) DEFAULT 'PUE',
        tiene_complemento BOOLEAN DEFAULT FALSE,
        alerta_efos BOOLEAN DEFAULT FALSE,
        aprobado BOOLEAN DEFAULT FALSE,
        moneda VARCHAR(10) DEFAULT 'MXN',
        tipo_cambio DECIMAL(10, 4) DEFAULT 1,
        id_transaccion_banco VARCHAR(100),
        fecha_pago TIMESTAMP WITH TIME ZONE,
        importado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        rfc_receptor VARCHAR(13) REFERENCES empresas(rfc)
      );
    `);

    // Migración para bases de datos existentes
    await db.query(`
      ALTER TABLE facturas_recibidas 
      ADD COLUMN IF NOT EXISTS rfc_receptor VARCHAR(13),
      ADD COLUMN IF NOT EXISTS aprobado BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS alerta_efos BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS tiene_complemento BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS moneda VARCHAR(10) DEFAULT 'MXN',
      ADD COLUMN IF NOT EXISTS tipo_cambio DECIMAL(10, 4) DEFAULT 1,
      ADD COLUMN IF NOT EXISTS id_transaccion_banco VARCHAR(100),
      ADD COLUMN IF NOT EXISTS importado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      ADD COLUMN IF NOT EXISTS regimen_fiscal_emisor VARCHAR(10),
      ADD COLUMN IF NOT EXISTS cp_emisor VARCHAR(10),
      ADD COLUMN IF NOT EXISTS fecha_pago TIMESTAMP WITH TIME ZONE;
      
      -- Añadir Foreign Key si no existe
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'fk_empresa_receptor'
        ) THEN
          ALTER TABLE facturas_recibidas 
          ADD CONSTRAINT fk_empresa_receptor FOREIGN KEY (rfc_receptor) REFERENCES empresas(rfc);
        END IF;
      END $$;
    `);

    // Migración para bases de datos existentes
    await db.query(`
      ALTER TABLE facturas_recibidas 
      ADD COLUMN IF NOT EXISTS rfc_receptor VARCHAR(13),
      ADD COLUMN IF NOT EXISTS aprobado BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS alerta_efos BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS tiene_complemento BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS moneda VARCHAR(10) DEFAULT 'MXN',
      ADD COLUMN IF NOT EXISTS tipo_cambio DECIMAL(10, 4) DEFAULT 1,
      ADD COLUMN IF NOT EXISTS id_transaccion_banco VARCHAR(100),
      ADD COLUMN IF NOT EXISTS importado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
    `);

    // 2. Conceptos de factura
    await db.query(`
      CREATE TABLE IF NOT EXISTS factura_conceptos (
        id SERIAL PRIMARY KEY,
        uuid_factura UUID REFERENCES facturas_recibidas(uuid) ON DELETE CASCADE,
        clave_prod_serv VARCHAR(20),
        no_identificacion VARCHAR(100),
        cantidad DECIMAL(14, 6),
        clave_unidad VARCHAR(20),
        unidad VARCHAR(100),
        descripcion TEXT,
        valor_unitario DECIMAL(18, 6),
        importe DECIMAL(18, 6),
        descuento DECIMAL(18, 6),
        objeto_imp VARCHAR(5),
        anomalia_precio BOOLEAN DEFAULT FALSE,
        anomalia_detalles TEXT
      );
      
      -- Migración para la tabla existente
      DO $$
      BEGIN
        ALTER TABLE factura_conceptos ADD COLUMN IF NOT EXISTS anomalia_precio BOOLEAN DEFAULT FALSE;
        ALTER TABLE factura_conceptos ADD COLUMN IF NOT EXISTS anomalia_detalles TEXT;
      EXCEPTION
        WHEN others THEN null;
      END $$;
      
      CREATE INDEX IF NOT EXISTS idx_concepto_uuid ON factura_conceptos(uuid_factura);
    `);

    // 2.5 Relaciones de Complementos de Pago
    await db.query(`
      CREATE TABLE IF NOT EXISTS complemento_relaciones (
        id SERIAL PRIMARY KEY,
        uuid_pago UUID REFERENCES facturas_recibidas(uuid) ON DELETE CASCADE,
        uuid_relacionado UUID,
        importe_pagado DECIMAL(14, 2),
        moneda VARCHAR(10)
      );
      CREATE INDEX IF NOT EXISTS idx_relacion_pago ON complemento_relaciones(uuid_pago);
      CREATE INDEX IF NOT EXISTS idx_relacion_factura ON complemento_relaciones(uuid_relacionado);
    `);

    // 3. Catálogo de cuentas contables
    await db.query(`
      CREATE TABLE IF NOT EXISTS cuentas_contables (
        id SERIAL PRIMARY KEY,
        codigo_cuenta VARCHAR(50) UNIQUE NOT NULL,
        nombre_cuenta VARCHAR(150) NOT NULL,
        tipo_cuenta VARCHAR(20) CHECK (tipo_cuenta IN ('activo', 'pasivo', 'capital', 'ingreso', 'gasto'))
      );
      INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta) VALUES
        ('102.01', 'Bancos Nacionales', 'activo'),
        ('118.01', 'IVA Acreditable Pagado', 'activo'),
        ('119.01', 'IVA Pendiente de Pago', 'activo'),
        ('201.01', 'Proveedores Nacionales', 'pasivo'),
        ('205.01', 'Acreedores Diversos', 'pasivo'),
        ('501.01', 'Costo por Servicios', 'gasto'),
        ('601.84', 'Papelería y Artículos de Oficina', 'gasto'),
        ('601.85', 'Mantenimiento de Equipo', 'gasto'),
        ('601.87', 'Honorarios Profesionales', 'gasto'),
        ('601.88', 'Servicios de Telefonía e Internet', 'gasto')
      ON CONFLICT (codigo_cuenta) DO NOTHING;
    `);

    // 4. Mapeo contable por proveedor y datos de contacto
    await db.query(`
      CREATE TABLE IF NOT EXISTS configuracion_contable_proveedor (
        rfc_emisor VARCHAR(13) PRIMARY KEY,
        cuenta_pasivo_id INT REFERENCES cuentas_contables(id),
        cuenta_gasto_id INT REFERENCES cuentas_contables(id),
        cuenta_iva_pendiente_id INT REFERENCES cuentas_contables(id),
        correo_contacto VARCHAR(150)
      );
      
      DO $$
      BEGIN
        ALTER TABLE configuracion_contable_proveedor ADD COLUMN IF NOT EXISTS correo_contacto VARCHAR(150);
      EXCEPTION
        WHEN others THEN null;
      END $$;
    `);

    // 5. Pólizas contables
    await db.query(`
      CREATE TABLE IF NOT EXISTS polizas (
        id SERIAL PRIMARY KEY,
        uuid_factura UUID REFERENCES facturas_recibidas(uuid),
        tipo_poliza VARCHAR(20) CHECK (tipo_poliza IN ('diario', 'egreso')),
        fecha DATE NOT NULL,
        concepto TEXT,
        creada_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 6. Movimientos de póliza
    await db.query(`
      CREATE TABLE IF NOT EXISTS movimientos_poliza (
        id SERIAL PRIMARY KEY,
        poliza_id INT REFERENCES polizas(id) ON DELETE CASCADE,
        cuenta_id INT REFERENCES cuentas_contables(id),
        debe DECIMAL(14, 2) DEFAULT 0.00,
        haber DECIMAL(14, 2) DEFAULT 0.00,
        concepto TEXT
      );
    `);

    // 7. EFOS (Art. 69-B SAT)
    await db.query(`
      CREATE TABLE IF NOT EXISTS sat_efos (
        rfc VARCHAR(13) PRIMARY KEY,
        nombre_contribuyente VARCHAR(255),
        situacion VARCHAR(50),
        fecha_publicacion DATE
      );
    `);

    // 8. Usuarios del sistema
    // Migrar primero el tipo de dato o constraint si existía
    await db.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'usuarios_rol_check'
        ) THEN
          ALTER TABLE usuarios DROP CONSTRAINT usuarios_rol_check;
        END IF;
      END $$;
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        usuario VARCHAR(50) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        rol VARCHAR(20) DEFAULT 'admin',
        activo BOOLEAN DEFAULT TRUE,
        creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Restaurar/Crear la nueva restricción con los nuevos roles
      DO $$
      BEGIN
        ALTER TABLE usuarios ADD CONSTRAINT usuarios_rol_check 
        CHECK (rol IN ('admin', 'contador', 'auditor', 'auxiliar'));
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // 8.5. Tabla de Auditoría (Audit Logs)
    await db.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
        usuario_nombre VARCHAR(50),
        accion VARCHAR(100) NOT NULL,
        entidad VARCHAR(50),
        entidad_id VARCHAR(100),
        ip_address VARCHAR(50),
        detalles JSONB,
        creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 9. Crear usuario admin por defecto si no existe
    const existe = await db.query("SELECT id FROM usuarios WHERE usuario = 'admin'");
    if (existe.rows.length === 0) {
      const passwordDefault = process.env.ADMIN_PASSWORD || 'CWM_Admin_2026!';
      const hash = await bcrypt.hash(passwordDefault, 10);
      await db.query(
        "INSERT INTO usuarios (usuario, password_hash, rol) VALUES ($1, $2, $3)",
        ['admin', hash, 'admin']
      );
      console.log('✅ Usuario admin creado. Contraseña:', passwordDefault);
      console.log('⚠️  IMPORTANTE: Cambia esta contraseña en producción.');
    }

    console.log('✅ Auto-setup de base de datos completado.');
  } catch (err) {
    console.error('❌ Error en auto-setup de BD:', err.message);
  }
}

autoSetup();

// 🛡️ Validación obligatoria del JWT_SECRET al arrancar
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('❌ FATAL: La variable JWT_SECRET no está definida en el archivo .env.');
  console.error('   Agrega JWT_SECRET=tu_clave_secreta al archivo .env y reinicia el servidor.');
  process.exit(1);
}

// 🛡️ Utilidades de hashing de contraseñas (usando bcrypt)
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function verifyPassword(password, storedHash) {
  return bcrypt.compareSync(password, storedHash);
}

// ==========================================================
import { setupRepeatableJobs, satQueue, nasQueue } from './utils/queues.js';
import { cacheMiddleware, clearCachePrefix } from './utils/cache.js';
import { requireRole } from './utils/rbac.js';
import { registrarAuditoria } from './utils/audit.js';
import { procesarReciboOCR } from './utils/ocr.js';

// Inicializar colas y workers (sustituye a node-cron)
setupRepeatableJobs().catch(err => console.error('Error al inicializar BullMQ:', err));

// 🛡️ Rate Limiting Estricto para tareas pesadas (SAT, NAS): Max 5 peticiones por hora
const heavyTasksLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  limit: 5,
  message: { error: 'Has alcanzado el límite de ejecuciones pesadas (5 por hora). Por favor, intenta más tarde.' }
});

// 🛡️ Middleware de validación JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Soporta formato Bearer (fetch) o por Query String (descargas directas window.open)
  const token = (authHeader && authHeader.split(' ')[1]) || req.query.token;

  if (!token) return res.status(401).json({ error: 'Acceso denegado. Se requiere un token (Bearer).' });

  const secret = JWT_SECRET;
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: 'El token es inválido o ha expirado.' });
    req.user = user;
    next(); // El usuario está autenticado, continuar a la ruta
  });
};

// ==========================================================
// ENDPOINT 0: LOGIN (AUTENTICACIÓN SEGURA CON BD)
// ==========================================================
app.post('/api/login', async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos.' });
  }

  try {
    const result = await db.query(
      'SELECT id, usuario, password_hash, rol FROM usuarios WHERE usuario = $1 AND activo = true',
      [usuario]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = result.rows[0];

    if (!verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, usuario: user.usuario, rol: user.rol },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    console.log(`✅ Login exitoso: ${user.usuario} (${user.rol})`);
    res.json({ token, mensaje: 'Autenticación exitosa' });
  } catch (err) {
    console.error('❌ Error en autenticación:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// ==========================================================
// ENDPOINT 1: OBTENER FACTURAS PARA EL DASHBOARD
// ==========================================================
app.get('/api/facturas', authenticateToken, cacheMiddleware(60), async (req, res) => {
  const empresaRfc = req.headers['x-empresa-rfc'];
  try {
    let whereClause = '';
    const params = [];
    if (empresaRfc) {
      whereClause = 'WHERE rfc_receptor = $1';
      params.push(empresaRfc);
    }

    const result = await db.query(
      `SELECT 
        uuid, 
        rfc_emisor as rfc, 
        nombre_emisor as proveedor, 
        COALESCE(subtotal, ROUND((total / 1.16), 2)) as subtotal,
        COALESCE(iva, ROUND((total - (total / 1.16)), 2)) as iva,
        total, 
        TO_CHAR(fecha_emision, 'YYYY-MM-DD') as fecha_emision, 
        estatus_pago as estatus, 
        url_expediente as expediente,
        folio_interno,
        tipo_comprobante,
        CASE 
          WHEN tipo_comprobante = 'I' THEN 'Factura (Ingreso)'
          WHEN tipo_comprobante = 'E' THEN 'Nota de Crédito (Egreso)'
          WHEN tipo_comprobante = 'P' THEN 'Complemento de Pago'
          WHEN tipo_comprobante = 'N' THEN 'Nómina'
          ELSE tipo_comprobante 
        END as tipo_cfdi
       ,CONCAT_WS(' - ', tipo_comprobante, metodo_pago) as tipo_metodo_cfdi
       ,total_retenciones
       ,metodo_pago
       ,tiene_complemento
       ,moneda as moneda_original
       ,tipo_cambio as tipo_cambio_xml
       ,alerta_efos
       ,estatus_fiscal
       ,aprobado
       ,rfc_receptor
       FROM facturas_recibidas 
       ${whereClause}
       ORDER BY fecha_emision DESC`, params
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener facturas:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================================
// ENDPOINT 1.5: OBTENER DATOS PARA LA VENTANA DE GASTOS
// ==========================================================
app.get('/api/gastos', authenticateToken, cacheMiddleware(300), async (req, res) => {
  const empresaRfc = req.headers['x-empresa-rfc'];
  try {
    let whereClause = `tipo_comprobante = 'I' AND estatus_pago = 'pendiente'`;
    const params = [];
    if (empresaRfc) {
      whereClause += ` AND rfc_receptor = $1`;
      params.push(empresaRfc);
    }

    const result = await db.query(
      `SELECT 
        TO_CHAR(f.fecha_emision, 'YYYY-MM-DD') as fecha,
        f.folio_interno as factura,
        COALESCE(f.moneda, 'MXN') as moneda,
        f.nombre_emisor as proveedor,
        c.descripcion as concepto,
        COALESCE(f.subtotal, ROUND((f.total / 1.16), 2)) as subtotal,
        COALESCE(f.iva, ROUND((f.total - (f.total / 1.16)), 2)) as iva,
        COALESCE(f.iva_retenido, 0) as ret_iva,
        0 as ieps_trasladado,
        COALESCE(f.isr_retenido, 0) as ret_isr,
        0 as local_trasladado,
        f.total,
        '' as observaciones,
        f.tipo_cambio as tc,
        '' as area,
        '' as centro_beneficio,
        '' as planta,
        f.uuid,
        f.url_expediente as expediente,
        f.rfc_emisor as rfc,
        ccg.codigo_cuenta as cuenta,
        c.importe,
        cciva.codigo_cuenta as cuenta_iva,
        '' as cuenta_complementaria,
        '' as clasif,
        CASE WHEN f.aprobado THEN 'Aprobado' ELSE 'Pendiente' END as aprobacion
       FROM facturas_recibidas f
       LEFT JOIN factura_conceptos c ON f.uuid = c.uuid_factura
       LEFT JOIN configuracion_contable_proveedor ccp ON f.rfc_emisor = ccp.rfc_emisor
       LEFT JOIN cuentas_contables ccg ON ccp.cuenta_gasto_id = ccg.id
       LEFT JOIN cuentas_contables cciva ON ccp.cuenta_iva_pendiente_id = cciva.id
       ORDER BY f.fecha_emision DESC`
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener gastos:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================================
// ENDPOINT 2: APROBAR UNA FACTURA
// ==========================================================
app.post('/api/facturas/:uuid/aprobar', authenticateToken, requireRole(['admin', 'contador']), async (req, res) => {
  const { uuid } = req.params;
  try {
    const result = await db.query(
      `UPDATE facturas_recibidas 
       SET aprobado = NOT aprobado 
       WHERE uuid = $1 
       RETURNING aprobado, rfc_receptor, total`,
      [uuid]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Factura no encontrada' });
    
    // Invalida el caché cuando hay una aprobación
    await clearCachePrefix('/api/facturas');
    await clearCachePrefix('/api/gastos');
    
    const nuevoEstatus = result.rows[0].aprobado;
    
    // Guardar en la bitácora
    await registrarAuditoria(req, 
      nuevoEstatus ? 'Aprobación de Factura' : 'Des-aprobación de Factura',
      'facturas_recibidas',
      uuid,
      { 
        nuevo_estatus: nuevoEstatus,
        rfc_receptor: result.rows[0].rfc_receptor,
        total: result.rows[0].total
      }
    );

    res.json({ mensaje: 'Estatus actualizado', aprobado: nuevoEstatus });
  } catch (err) {
    console.error("Error al aprobar:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================================
// ENDPOINT 2.5: CONCILIACIÓN BANCARIA REAL
// ==========================================================
const uploadCsv = multer({ storage: multer.memoryStorage() });

app.post('/api/bancos/conciliar', authenticateToken, uploadCsv.single('estadoCuenta'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });
  
  try {
    const csvContent = req.file.buffer.toString('utf-8');
    const lines = csvContent.split(/\r?\n/).filter(line => line.trim() !== '');
    
    // Asumimos CSV sin cabeceras o ignoramos la cabecera heurísticamente
    // Formato esperado: Fecha, Concepto, Cargo, Abono, Saldo
    let conciliadas = 0;
    const report = [];

    // Pre-cargar proveedores para heurística Knapsack
    const proveedoresResult = await db.query('SELECT DISTINCT rfc_emisor, nombre_emisor FROM facturas_recibidas');
    const proveedores = proveedoresResult.rows;

    function findSubsetSum(arr, target, tolerance = 0.01) {
      arr.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));
      const maxItems = Math.min(arr.length, 20); // Limitar a 20 para evitar explosión
      
      function solve(index, currentTarget, currentSubset) {
        if (Math.abs(currentTarget) <= tolerance) return currentSubset;
        if (currentTarget < -tolerance || index >= maxItems) return null;
        
        const val = parseFloat(arr[index].total);
        if (val - currentTarget > tolerance) {
            return solve(index + 1, currentTarget, currentSubset);
        }
        
        let res = solve(index + 1, currentTarget - val, [...currentSubset, arr[index]]);
        if (res) return res;
        
        return solve(index + 1, currentTarget, currentSubset);
      }
      return solve(0, target, []);
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Ignorar cabecera común
      if (line.toLowerCase().includes('cargo') && line.toLowerCase().includes('abono')) continue;
      
      // Parser básico de CSV
      const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
      if (cols.length < 3) continue;

      const concepto = cols[1];
      const cargoStr = cols[2];
      
      const cargo = parseFloat(cargoStr.replace(/[^0-9.-]+/g, ''));
      if (isNaN(cargo) || cargo <= 0) continue;

      // Buscar factura con ese total exacto y pendiente
      const matchQuery = await db.query(
        `SELECT uuid, rfc_emisor, nombre_emisor 
         FROM facturas_recibidas 
         WHERE total = $1 AND estatus_pago = 'pendiente'`,
        [cargo]
      );

      const facturas = matchQuery.rows;
      if (facturas.length === 0) {
        // --- INICIO KNAPSACK ---
        const posibleProveedor = proveedores.find(p => 
          (p.rfc_emisor && concepto.toUpperCase().includes(p.rfc_emisor.toUpperCase())) || 
          (p.nombre_emisor && concepto.toUpperCase().includes(p.nombre_emisor.toUpperCase()))
        );

        if (posibleProveedor) {
          const pendingQuery = await db.query(
            `SELECT uuid, total, nombre_emisor FROM facturas_recibidas WHERE rfc_emisor = $1 AND estatus_pago = 'pendiente'`,
            [posibleProveedor.rfc_emisor]
          );
          
          if (pendingQuery.rows.length > 0) {
            const subset = findSubsetSum(pendingQuery.rows, cargo, 0.01);
            if (subset && subset.length > 0) {
              const uuids = subset.map(s => s.uuid);
              await db.query(
                `UPDATE facturas_recibidas 
                 SET estatus_pago = 'pagado', id_transaccion_banco = $1, fecha_pago = CURRENT_TIMESTAMP
                 WHERE uuid = ANY($2)`,
                [`MANUAL-CSV-${Date.now()}`, uuids]
              );
              conciliadas += subset.length;
              report.push({ concepto, monto: cargo, estatus: 'Conciliadas múltiples (Knapsack)', uuid: uuids.join(', '), proveedor: posibleProveedor.nombre_emisor });
              continue;
            }
          }
        }
        // --- FIN KNAPSACK ---

        report.push({ concepto, monto: cargo, estatus: 'No match exacto' });
        continue;
      }

      let match = null;
      if (facturas.length === 1) {
        match = facturas[0];
      } else {
        // Desempate por RFC en el concepto
        match = facturas.find(f => concepto.toUpperCase().includes(f.rfc_emisor.toUpperCase()));
      }

      if (match) {
        // Actualizar estatus a pagado
        await db.query(
          `UPDATE facturas_recibidas 
           SET estatus_pago = 'pagado', id_transaccion_banco = $1, fecha_pago = CURRENT_TIMESTAMP
           WHERE uuid = $2`,
          [`MANUAL-CSV-${Date.now()}`, match.uuid]
        );
        conciliadas++;
        report.push({ concepto, monto: cargo, estatus: 'Conciliada', uuid: match.uuid, proveedor: match.nombre_emisor });
      } else {
        report.push({ concepto, monto: cargo, estatus: 'Ambigüedad (Múltiples facturas)' });
      }
    }

    res.json({ mensaje: `Conciliación completa: ${conciliadas} facturas aplicadas.`, reporte: report });
  } catch (err) {
    console.error("Error en conciliación:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================================
// ENDPOINT 2: DISPARAR EL ORQUESTADOR IA (SYNOLOGY SCANNER)
// ==========================================================
app.post('/api/escanear-nas', authenticateToken, requireRole(['admin', 'auxiliar']), heavyTasksLimiter, async (req, res) => {
  console.log("🚀 Encolando escaneo del NAS...");
  const tarea = 'Escaneo Synology NAS';
  io.emit('process-log', { tarea, linea: '🚀 Escaneo del NAS añadido a la cola...', ts: new Date().toISOString() });

  try {
    await nasQueue.add('scanNas', {});
    await registrarAuditoria(req, 'Disparo Manual Escaneo NAS', 'nasQueue', 'N/A', {});
    res.json({ mensaje: "Escaneo del NAS encolado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo encolar la tarea" });
  }
});


// ==========================================================
// ENDPOINT 3: DESCARGA DEL SAT (MOCK POR AHORA)
// ==========================================================
app.post('/api/sat/sync', authenticateToken, requireRole(['admin', 'auxiliar']), heavyTasksLimiter, async (req, res) => {
  const { fechaInicio, fechaFin, estatus } = req.body || {};
  console.log(`☁️ Sincronización SAT encolada. Rango: ${fechaInicio} a ${fechaFin}. Estatus: ${estatus}`);
  const tarea = 'Sincronización SAT';
  io.emit('process-log', { tarea, linea: `☁️ Sincronización SAT añadida a la cola (Estatus: ${estatus})...`, ts: new Date().toISOString() });

  try {
    await satQueue.add('downloadSat', { fechaInicio, fechaFin, estatus });
    
    await registrarAuditoria(req, 'Disparo Sincronización SAT', 'satQueue', 'N/A', {
      fechaInicio,
      fechaFin,
      estatus
    });

    // Nota: El verifySat correrá en la madrugada mediante cron, o podemos encolarlo secuencialmente en el worker
    res.json({ mensaje: "Proceso SAT encolado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo encolar la tarea" });
  }
});

// ==========================================================
// ENDPOINT 4: VISOR DE AUDITORÍA (SOLO ADMIN/AUDITOR)
// ==========================================================
app.get('/api/audit-logs', authenticateToken, requireRole(['admin', 'auditor']), async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, usuario_nombre, accion, entidad, entidad_id, ip_address, detalles, creado_en 
       FROM audit_logs 
       ORDER BY creado_en DESC 
       LIMIT 100`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener audit logs:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================================
// ENDPOINT 4.5: AUDITORÍA DE REPS HUÉRFANOS
// ==========================================================
app.get('/api/auditoria/reps-huerfanos', authenticateToken, requireRole(['admin', 'auditor', 'contador']), async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        cr.uuid_pago as uuid,
        'Falta Factura Origen' as anomalia,
        f_pago.nombre_emisor as proveedor,
        TO_CHAR(f_pago.fecha_emision, 'YYYY-MM-DD') as fecha,
        cr.importe_pagado as monto,
        cr.moneda
      FROM complemento_relaciones cr
      JOIN facturas_recibidas f_pago ON f_pago.uuid = cr.uuid_pago
      WHERE NOT EXISTS (
        SELECT 1 FROM facturas_recibidas f_origen WHERE f_origen.uuid = cr.uuid_relacionado
      )
      UNION ALL
      SELECT
        f.uuid,
        'Falta REP (Pago)' as anomalia,
        f.nombre_emisor as proveedor,
        TO_CHAR(f.fecha_emision, 'YYYY-MM-DD') as fecha,
        f.total as monto,
        f.moneda
      FROM facturas_recibidas f
      WHERE f.tipo_comprobante = 'I' AND f.metodo_pago = 'PPD'
      AND NOT EXISTS (
        SELECT 1 FROM complemento_relaciones cr WHERE cr.uuid_relacionado = f.uuid
      )
      ORDER BY fecha DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener REPs huérfanos:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================================
// ENDPOINT 5: OCR MULTIMODAL PARA RECIBOS NO FISCALES
// ==========================================================
app.post('/api/recibos/subir', authenticateToken, requireRole(['admin', 'auxiliar', 'contador']), upload.single('documento'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se envió ningún documento' });
  
  const { rfc_receptor } = req.body;
  
  try {
    const filePath = req.file.path;
    const originalName = req.file.originalname;
    
    // Extraer datos usando la IA Multimodal (Ollama)
    const datosRecibo = await procesarReciboOCR(filePath, originalName);
    
    // Generar un UUID falso/local para facturas_recibidas
    const { randomUUID } = await import('crypto');
    const localUuid = randomUUID();
    
    // Insertar el gasto en facturas_recibidas como Tipo 'N' (No fiscal)
    await db.query(
      `INSERT INTO facturas_recibidas 
       (uuid, rfc_emisor, nombre_emisor, fecha_emision, total, estatus, estatus_fiscal, tipo_comprobante, rfc_receptor)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        localUuid, 
        'XAXX010101000', // RFC Genérico Nacional
        datosRecibo.proveedor || 'Proveedor Desconocido',
        datosRecibo.fecha || new Date().toISOString().split('T')[0],
        datosRecibo.monto || 0,
        'pendiente',
        'no_fiscal',
        'N', // Tipo N para identificarlo en el Dashboard
        rfc_receptor || null
      ]
    );

    // Insertar el concepto (para que aparezca en el Módulo de Compras/Conceptos)
    await db.query(
      `INSERT INTO factura_conceptos 
       (uuid_factura, clave_prod_serv, descripcion, valor_unitario, importe)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        localUuid,
        '01010101', // Clave genérica "No existe en el catálogo"
        datosRecibo.concepto || 'Gasto no fiscal',
        datosRecibo.monto || 0,
        datosRecibo.monto || 0
      ]
    );

    // Invalida el caché
    await clearCachePrefix('/api/facturas');
    await clearCachePrefix('/api/gastos');
    
    await registrarAuditoria(req, 'Carga Recibo No Fiscal (OCR)', 'facturas_recibidas', localUuid, { datosExtraidos: datosRecibo });

    // Borrar el archivo temporal
    fs.unlinkSync(filePath);

    res.json({ mensaje: 'Recibo procesado e ingresado exitosamente.', datosExtraidos: datosRecibo });
  } catch (err) {
    console.error('Error procesando recibo no fiscal:', err);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: 'No se pudo procesar el recibo usando IA.' });
  }
});

// ==========================================================
// ENDPOINT 5.5: SUBIDA DE TICKET DESDE CELULAR (QR CROSS-DEVICE)
// ==========================================================
// No usa authenticateToken porque la sesión del celular es temporal/anónima
app.post('/api/recibos/upload-qr/:sessionId', upload.single('documento'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se envió ningún documento' });
  const { sessionId } = req.params;
  
  try {
    const filePath = req.file.path;
    const originalName = req.file.originalname;
    
    // Extraer datos usando la IA Multimodal (Ollama)
    const datosRecibo = await procesarReciboOCR(filePath, originalName);
    
    // Generar un UUID falso/local para facturas_recibidas
    const { randomUUID } = await import('crypto');
    const localUuid = randomUUID();
    
    // Insertar el gasto en facturas_recibidas como Tipo 'N' (No fiscal)
    await db.query(
      `INSERT INTO facturas_recibidas 
       (uuid, rfc_emisor, nombre_emisor, fecha_emision, total, estatus, estatus_fiscal, tipo_comprobante, rfc_receptor)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        localUuid, 
        'XAXX010101000', 
        datosRecibo.proveedor || 'Proveedor Desconocido',
        datosRecibo.fecha || new Date().toISOString().split('T')[0],
        datosRecibo.monto || 0,
        'pendiente',
        'no_fiscal',
        'N', 
        null
      ]
    );

    // Insertar el concepto
    await db.query(
      `INSERT INTO factura_conceptos 
       (uuid_factura, clave_prod_serv, descripcion, valor_unitario, importe)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        localUuid,
        '01010101', 
        datosRecibo.concepto || 'Gasto no fiscal',
        datosRecibo.monto || 0,
        datosRecibo.monto || 0
      ]
    );

    // Invalida el caché
    await clearCachePrefix('/api/facturas');
    await clearCachePrefix('/api/gastos');
    
    // Borrar el archivo temporal
    fs.unlinkSync(filePath);

    // Avisar al Desktop
    io.emit(`qr_completed_${sessionId}`, { success: true, datosExtraidos: datosRecibo });

    res.json({ mensaje: 'Recibo procesado e ingresado exitosamente.', datosExtraidos: datosRecibo });
  } catch (err) {
    console.error('Error procesando recibo no fiscal (QR):', err);
    if (req.file) fs.unlinkSync(req.file.path);
    io.emit(`qr_completed_${sessionId}`, { success: false, error: 'No se pudo procesar el recibo usando IA.' });
    res.status(500).json({ error: 'No se pudo procesar el recibo usando IA.' });
  }
});

// ==========================================================
// ENDPOINT 6: SUBIDA MANUAL DE COMPROBANTES DE PAGO
// ==========================================================
app.post('/api/subir-pago/:uuid', authenticateToken, upload.single('documento'), async (req, res) => {
  const { uuid } = req.params;
  const file = req.file;
  
  if (!file) {
    return res.status(400).json({ error: 'No se recibió ningún archivo.' });
  }

  try {
    // 1. Obtener datos de la factura para saber la ruta del dossier
    const result = await db.query(
      'SELECT rfc_emisor, fecha_emision, url_expediente FROM facturas_recibidas WHERE uuid = $1', 
      [uuid]
    );
    
    if (result.rows.length === 0) {
      throw new Error('Factura no encontrada en la base de datos.');
    }

    const factura = result.rows[0];

    // 2. Usar la ruta del expediente existente o construir una nueva
    let carpetaDossier = factura.url_expediente;
    
    if (!carpetaDossier) {
      const fecha = new Date(factura.fecha_emision);
      const anio = fecha.getFullYear().toString();
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const rutaNasDestino = process.env.EXPEDIENTES_PATH.replace(/['"]/g, '');
      carpetaDossier = path.join(rutaNasDestino, anio, mes, factura.rfc_emisor, uuid);
    }

    // Mejora: Operaciones asíncronas no bloqueantes
    if (!fs.existsSync(carpetaDossier)) await fsp.mkdir(carpetaDossier, { recursive: true });

    // 3. Renombrar el archivo asíncronamente, moverlo al NAS y limpiar la basura temporal
    const destinoArchivo = path.join(carpetaDossier, `Pago_Manual_${file.originalname}`);
    await fsp.copyFile(file.path, destinoArchivo);
    await fsp.unlink(file.path); 

    // 4. Actualizar PostgreSQL a Estatus Pagado
    await db.query(
      `UPDATE facturas_recibidas 
       SET estatus_pago = 'pagado', url_expediente = $1, fecha_pago = CURRENT_TIMESTAMP 
       WHERE uuid = $2`,
      [carpetaDossier, uuid]
    );

    console.log(`✅ Expediente manual armado para UUID: ${uuid}`);
    res.json({ mensaje: 'Archivo enlazado y subido correctamente al NAS.' });

  } catch (error) {
    console.error("❌ Error en subida manual:", error);
    // Si algo falla a medio camino, limpiamos el archivo temporal
    if (file && fs.existsSync(file.path)) await fsp.unlink(file.path).catch(()=>{}); 
    res.status(500).json({ error: error.message });
  }
});

// ==========================================================
// ENDPOINT 4.5: SUBIDA DE ARCHIVO DE APROBACIÓN
// ==========================================================
app.post('/api/subir-aprobacion/:uuid', authenticateToken, upload.single('documento'), async (req, res) => {
  const { uuid } = req.params;
  const file = req.file;
  
  if (!file) {
    return res.status(400).json({ error: 'No se recibió ningún archivo.' });
  }

  try {
    const result = await db.query(
      'SELECT rfc_emisor, fecha_emision, url_expediente FROM facturas_recibidas WHERE uuid = $1', 
      [uuid]
    );
    
    if (result.rows.length === 0) throw new Error('Factura no encontrada en la base de datos.');

    const factura = result.rows[0];
    let carpetaDossier = factura.url_expediente;
    
    if (!carpetaDossier) {
      const fecha = new Date(factura.fecha_emision);
      const anio = fecha.getFullYear().toString();
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const rutaNasDestino = process.env.EXPEDIENTES_PATH.replace(/['"]/g, '');
      carpetaDossier = path.join(rutaNasDestino, anio, mes, factura.rfc_emisor, uuid);
    }

    if (!fs.existsSync(carpetaDossier)) await fsp.mkdir(carpetaDossier, { recursive: true });

    const destinoArchivo = path.join(carpetaDossier, `Aprobacion_${file.originalname}`);
    await fsp.copyFile(file.path, destinoArchivo);
    await fsp.unlink(file.path); 

    // Actualizamos la ruta en la base de datos en caso de que este expediente se acabe de crear
    await db.query(`UPDATE facturas_recibidas SET url_expediente = $1 WHERE uuid = $2`, [carpetaDossier, uuid]);

    console.log(`✅ Archivo de aprobación guardado en NAS para UUID: ${uuid}`);
    res.json({ mensaje: 'Archivo subido correctamente.', expediente: carpetaDossier });

  } catch (error) {
    console.error("❌ Error en subida de aprobación:", error);
    if (file && fs.existsSync(file.path)) await fsp.unlink(file.path).catch(()=>{}); 
    res.status(500).json({ error: error.message });
  }
});

// ==========================================================
// ENDPOINT 5: ELIMINAR PAGO MANUAL / DESHACER CONCILIACIÓN
// ==========================================================
app.delete('/api/eliminar-pago/:uuid', authenticateToken, async (req, res) => {
  const { uuid } = req.params;

  try {
    // 1. Obtener la ruta del expediente actual
    const result = await db.query('SELECT url_expediente FROM facturas_recibidas WHERE uuid = $1', [uuid]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Factura no encontrada.' });

    const expediente = result.rows[0].url_expediente;

    // 2. Si existe la carpeta en el NAS, la eliminamos con todo su contenido
    if (expediente && fs.existsSync(expediente)) {
      // Mejora: Borrado asíncrono no bloqueante
      await fsp.rm(expediente, { recursive: true, force: true });
    }

    // 3. Regresar el estatus en PostgreSQL a "Pendiente" y limpiar la ruta
    await db.query(`UPDATE facturas_recibidas SET estatus_pago = 'pendiente', url_expediente = NULL WHERE uuid = $1`, [uuid]);

    console.log(`🗑️ Expediente eliminado y factura ${uuid} regresada a pendiente.`);
    res.json({ mensaje: 'Pago eliminado correctamente.' });
  } catch (error) {
    console.error("❌ Error al eliminar pago:", error);
    res.status(500).json({ error: error.message });
  }
});

// ==========================================================
// ENDPOINT 6: ABRIR EXPEDIENTE EN EXPLORADOR DE WINDOWS
// ==========================================================
app.post('/api/abrir-expediente', authenticateToken, (req, res) => {
  const { ruta } = req.body;
  if (!ruta) return res.status(400).json({ error: 'Ruta no proporcionada' });

  // 🛡️ Sanitización: rechazar caracteres peligrosos para inyección de comandos
  if (/[;&|`$(){}!<>]/.test(ruta)) {
    console.error(`🛡️ BLOQUEADO: Caracteres peligrosos detectados en ruta: ${ruta}`);
    return res.status(400).json({ error: 'La ruta contiene caracteres no permitidos.' });
  }

  // 🛡️ Validación de ruta: solo permitir carpetas dentro de las rutas autorizadas del NAS
  const rutaNormalizada = path.normalize(ruta);
  const esRutaPermitida = isValidNASPath(rutaNormalizada);

  if (!esRutaPermitida) {
    console.error(`🛡️ BLOQUEADO: Intento de acceso a ruta no autorizada: ${rutaNormalizada}`);
    return res.status(403).json({ error: 'Acceso denegado. La ruta no pertenece a las carpetas autorizadas del NAS.' });
  }

  console.log(`📂 Abriendo en explorador: ${rutaNormalizada}`);

  if (!fs.existsSync(rutaNormalizada)) {
    console.error(`❌ La ruta no existe: ${rutaNormalizada}`);
    return res.status(404).json({ error: 'La ruta no se encuentra disponible. Revisa la conexión al NAS.' });
  }

  exec(`explorer "${rutaNormalizada}"`, (error) => {
    if (error) console.error(`Error al abrir explorador: ${error.message}`);
  });

  res.json({ mensaje: 'Explorador abierto' });
});

// ==========================================================
// ENDPOINT 7: OBTENER Y ACTUALIZAR CONFIGURACIÓN (.env)
// ==========================================================
app.get('/api/config', authenticateToken, async (req, res) => {
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) return res.json({});
    
    const envContent = await fsp.readFile(envPath, 'utf8');
    const config = {};
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) config[match[1].trim()] = match[2].trim();
    });
    
    // Ocultar contraseñas por seguridad al enviar al frontend
    if (config.DB_PASSWORD) config.DB_PASSWORD = '***';
    if (config.FIEL_PASSWORD) config.FIEL_PASSWORD = '***';
    if (config.NAS_PASSWORD) config.NAS_PASSWORD = '***';
    if (config.JWT_SECRET) config.JWT_SECRET = '***';
    
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Error leyendo configuración' });
  }
});

app.post('/api/config', authenticateToken, async (req, res) => {
  const newConfig = req.body;

  // 🛡️ Lista blanca: solo estas variables pueden ser modificadas desde el frontend
  const variablesPermitidas = new Set([
    'NAS_PAYMENTS_PATH', 'EXPEDIENTES_PATH', 'NAS_USER',
    'FIEL_CER_NAME', 'FIEL_KEY_NAME',
    'OLLAMA_API_URL', 'OLLAMA_MODEL',
    'TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID',
    'CORS_ORIGIN', 'PORT'
  ]);

  try {
    const envPath = path.join(process.cwd(), '.env');
    let envContent = fs.existsSync(envPath) ? await fsp.readFile(envPath, 'utf8') : '';

    const bloqueados = [];

    for (const [key, value] of Object.entries(newConfig)) {
      if (value === '***' || value === undefined) continue; // Ignorar contraseñas enmascaradas

      // 🛡️ Rechazar cualquier variable fuera de la lista blanca
      if (!variablesPermitidas.has(key)) {
        bloqueados.push(key);
        continue;
      }

      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (envContent.match(regex)) {
        envContent = envContent.replace(regex, `${key}=${value}`);
      } else {
        envContent += `\n${key}=${value}`;
      }
    }

    await fsp.writeFile(envPath, envContent.trim() + '\n');

    let mensaje = '✅ Configuración guardada correctamente. Reinicia el servidor backend para aplicar los cambios.';
    if (bloqueados.length > 0) {
      mensaje += ` ⚠️ Variables bloqueadas por seguridad: ${bloqueados.join(', ')}`;
      console.log(`🛡️ Variables bloqueadas por política de seguridad: ${bloqueados.join(', ')}`);
    }

    res.json({ mensaje });
  } catch (error) {
    res.status(500).json({ error: 'Error guardando configuración' });
  }
});

// ==========================================================
// ENDPOINT 8: CONCILIAR COMPLEMENTOS DE PAGO XML
// ==========================================================
app.post('/api/conciliar-xml', authenticateToken, heavyTasksLimiter, (req, res) => {
  console.log("🚀 Iniciando conciliación de complementos XML en segundo plano...");
  
  const tarea = 'Conciliación Complementos XML';
  io.emit('process-log', { tarea, linea: '🚀 Iniciando escaneo de complementos XML...', ts: new Date().toISOString() });

  const child = spawn('npm run conciliar-xml', { shell: true });
  child.stdout.on('data', data => {
    const output = data.toString();
    process.stdout.write(output);
    output.split('\n').filter(l => l.trim()).forEach(linea => {
      io.emit('process-log', { tarea, linea, ts: new Date().toISOString() });
    });
    const match = output.match(/\[PROGRESS\] (.*)/);
    if (match) io.emit('sync-progress', { task: tarea, message: match[1] });
  });
  child.stderr.on('data', data => {
    process.stderr.write(data);
    data.toString().split('\n').filter(l => l.trim()).forEach(linea => {
      io.emit('process-log', { tarea, linea: `⚠️ ${linea}`, ts: new Date().toISOString() });
    });
  });

  child.on('close', (code) => {
    if (code === 0) {
      io.emit('task-completed', { task: tarea, message: 'Complementos de pago procesados y conciliados.' });
      io.emit('process-log', { tarea, linea: '✅ Conciliación de complementos finalizada.', ts: new Date().toISOString() });
    } else {
      io.emit('task-error', { task: tarea, error: `El proceso terminó con código ${code}` });
      io.emit('process-log', { tarea, linea: `❌ Error (código ${code})`, ts: new Date().toISOString() });
    }
  });
  
  res.json({ mensaje: "Conciliación perfecta por Complementos SAT iniciada." });
});

// ==========================================================
// MÓDULO CONTABLE: ENDPOINT 9 - PROVEEDORES SIN MAPEO
// ==========================================================
app.get('/api/contabilidad/proveedores-sin-mapeo', authenticateToken, async (req, res) => {
  try {
    // Buscamos RFCs únicos en facturas que NO existan en la tabla de configuración
    const query = await db.query(
      `SELECT DISTINCT f.rfc_emisor, f.nombre_emisor as nombre
       FROM facturas_recibidas f
       LEFT JOIN configuracion_contable_proveedor ccp ON f.rfc_emisor = ccp.rfc_emisor
       WHERE ccp.rfc_emisor IS NULL
       ORDER BY f.nombre_emisor ASC`
    );
    res.json(query.rows);
  } catch (err) {
    console.error("❌ Error al obtener proveedores sin mapeo:", err);
    res.status(500).json({ error: 'Error interno al consultar proveedores.' });
  }
});

// ==========================================================
// MÓDULO CONTABLE: ENDPOINT 10 - CATÁLOGO DE CUENTAS
// ==========================================================
app.get('/api/contabilidad/cuentas', authenticateToken, async (req, res) => {
  try {
    const query = await db.query(
      `SELECT id, codigo_cuenta, nombre_cuenta, tipo_cuenta
       FROM cuentas_contables
       ORDER BY tipo_cuenta, codigo_cuenta ASC`
    );
    res.json(query.rows);
  } catch (err) {
    console.error("❌ Error al obtener cuentas contables:", err);
    res.status(500).json({ error: 'Error al cargar el catálogo de cuentas.' });
  }
});

// ==========================================================
// MÓDULO CONTABLE: ENDPOINT 11 - GUARDAR MAPEO DE PROVEEDOR
// ==========================================================
app.post('/api/contabilidad/mapear-proveedor', authenticateToken, async (req, res) => {
  const { rfc_emisor, cuenta_gasto_id, cuenta_pasivo_id, cuenta_iva_pendiente_id } = req.body;

  if (!rfc_emisor || !cuenta_gasto_id || !cuenta_pasivo_id) {
    return res.status(400).json({ error: 'Faltan datos obligatorios (Gasto y Pasivo son requeridos).' });
  }

  try {
    // Usamos ON CONFLICT para que sirva tanto para crear como para editar
    await db.query(
      `INSERT INTO configuracion_contable_proveedor 
         (rfc_emisor, cuenta_gasto_id, cuenta_pasivo_id, cuenta_iva_pendiente_id)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (rfc_emisor) DO UPDATE 
         SET cuenta_gasto_id = EXCLUDED.cuenta_gasto_id,
             cuenta_pasivo_id = EXCLUDED.cuenta_pasivo_id,
             cuenta_iva_pendiente_id = EXCLUDED.cuenta_iva_pendiente_id`,
      [rfc_emisor, cuenta_gasto_id, cuenta_pasivo_id, cuenta_iva_pendiente_id || null]
    );
    
    console.log(`✅ Mapeo contable guardado para RFC: ${rfc_emisor}`);
    res.json({ mensaje: 'Configuración guardada correctamente.' });
  } catch (err) {
    console.error("❌ Error al guardar mapeo:", err);
    res.status(500).json({ error: 'No se pudo guardar la configuración contable.' });
  }
});

// ==========================================================
// MÓDULO CONTABLE: ENDPOINT 12.1 - API BRIDGE CONTPAQi (JSON)
// ==========================================================
app.get('/api/contabilidad/polizas.json', authenticateToken, requireRole(['admin', 'contador']), async (req, res) => {
  const { anio, mes, dia } = req.query; // Ej. ?anio=2026&mes=05&dia=15
  try {
    let dateFilter = "TO_CHAR(f.fecha_emision, 'YYYY-MM') = $1";
    let params = [`${anio}-${mes}`];
    if (dia && dia !== 'Todos') {
      dateFilter = "TO_CHAR(f.fecha_emision, 'YYYY-MM-DD') = $1";
      params = [`${anio}-${mes}-${dia}`];
    }

    const query = await db.query(`
      SELECT f.uuid, f.rfc_receptor, f.nombre_emisor, f.total, f.fecha_emision, f.folio_interno,
             COALESCE(f.subtotal, ROUND((f.total / 1.16), 2)) as subtotal,
             COALESCE(f.iva, ROUND((f.total - (f.total / 1.16)), 2)) as iva,
             cg.codigo_cuenta as cta_gasto, cg.id as cta_gasto_id,
             cp.codigo_cuenta as cta_pasivo, cp.id as cta_pasivo_id,
             civa.codigo_cuenta as cta_iva, civa.id as cta_iva_id
      FROM facturas_recibidas f
      JOIN configuracion_contable_proveedor cc ON f.rfc_emisor = cc.rfc_emisor
      JOIN cuentas_contables cg ON cc.cuenta_gasto_id = cg.id
      JOIN cuentas_contables cp ON cc.cuenta_pasivo_id = cp.id
      JOIN cuentas_contables civa ON cc.cuenta_iva_pendiente_id = civa.id
      WHERE ${dateFilter} AND f.tipo_comprobante = 'I'
    `, params);

    const polizasJson = query.rows.map(factura => {
      const fechaFormateada = new Date(factura.fecha_emision).toISOString().slice(0,10).replace(/-/g, '');
      const conceptoPoliza = `Fca Prov: ${factura.nombre_emisor.substring(0,30)} Folio ${factura.folio_interno || ''}`;
      
      return {
        rfc_receptor: factura.rfc_receptor,
        tipo: 'Diario',
        fecha: fechaFormateada,
        concepto: conceptoPoliza,
        movimientos: [
          { cuenta: factura.cta_gasto, tipo_movimiento: 'Cargo', importe: Number(factura.subtotal).toFixed(2), referencia: factura.uuid },
          { cuenta: factura.cta_iva, tipo_movimiento: 'Cargo', importe: Number(factura.iva).toFixed(2), referencia: factura.uuid },
          { cuenta: factura.cta_pasivo, tipo_movimiento: 'Abono', importe: factura.total, referencia: factura.uuid }
        ]
      };
    });

    res.json({ success: true, polizas: polizasJson });
  } catch (err) {
    console.error("❌ Error en API Bridge CONTPAQi:", err);
    res.status(500).json({ error: 'Falla al extraer pólizas' });
  }
});

// ==========================================================
// MÓDULO CONTABLE: ENDPOINT 12 - EXPORTAR CONTPAQi
// ==========================================================
app.get('/api/contabilidad/exportar-contpaqi', authenticateToken, async (req, res) => {
  const { anio, mes, dia } = req.query; // Ej. ?anio=2026&mes=05&dia=15
  try {
    let dateFilter = "TO_CHAR(f.fecha_emision, 'YYYY-MM') = $1";
    let params = [`${anio}-${mes}`];
    if (dia && dia !== 'Todos') {
      dateFilter = "TO_CHAR(f.fecha_emision, 'YYYY-MM-DD') = $1";
      params = [`${anio}-${mes}-${dia}`];
    }

    const query = await db.query(`
      SELECT f.uuid, f.nombre_emisor, f.total, f.fecha_emision, f.folio_interno,
             COALESCE(f.subtotal, ROUND((f.total / 1.16), 2)) as subtotal,
             COALESCE(f.iva, ROUND((f.total - (f.total / 1.16)), 2)) as iva,
             cg.codigo_cuenta as cta_gasto, cg.id as cta_gasto_id,
             cp.codigo_cuenta as cta_pasivo, cp.id as cta_pasivo_id,
             civa.codigo_cuenta as cta_iva, civa.id as cta_iva_id
      FROM facturas_recibidas f
      JOIN configuracion_contable_proveedor cc ON f.rfc_emisor = cc.rfc_emisor
      JOIN cuentas_contables cg ON cc.cuenta_gasto_id = cg.id
      JOIN cuentas_contables cp ON cc.cuenta_pasivo_id = cp.id
      JOIN cuentas_contables civa ON cc.cuenta_iva_pendiente_id = civa.id
      WHERE ${dateFilter} AND f.tipo_comprobante = 'I'
    `, params);

    let contenidoTxt = "";
    
    // Iniciar transacción para guardar en base de datos
    await db.query('BEGIN');

    for (const factura of query.rows) {
      const fechaFormateada = new Date(factura.fecha_emision).toISOString().slice(0,10).replace(/-/g, '');
      const montoGasto = Number(factura.subtotal).toFixed(2);
      const montoIva = Number(factura.iva).toFixed(2);
      
      const conceptoPoliza = `Fca Prov: ${factura.nombre_emisor.substring(0,30)} Folio ${factura.folio_interno || ''}`;
      
      // Construir texto CONTPAQi
      contenidoTxt += `P ${fechaFormateada} 3 1 ${conceptoPoliza}\n`;
      contenidoTxt += `M ${factura.cta_gasto} 0 ${montoGasto} Prov: ${factura.folio_interno || ''} ${factura.uuid}\n`;
      contenidoTxt += `M ${factura.cta_iva} 0 ${montoIva} IVA Prov: ${factura.folio_interno || ''} ${factura.uuid}\n`;
      contenidoTxt += `M ${factura.cta_pasivo} 1 ${factura.total} Total Prov: ${factura.uuid}\n`;

      // Insertar Cabecera de Póliza en DB
      const resPoliza = await db.query(
        `INSERT INTO polizas (uuid_factura, tipo_poliza, fecha, concepto) VALUES ($1, 'diario', $2, $3) RETURNING id`,
        [factura.uuid, factura.fecha_emision, conceptoPoliza]
      );
      const polizaId = resPoliza.rows[0].id;

      // Insertar Movimientos
      await db.query(`INSERT INTO movimientos_poliza (poliza_id, cuenta_id, debe, concepto) VALUES ($1, $2, $3, $4)`, 
        [polizaId, factura.cta_gasto_id, montoGasto, `Gasto: ${factura.folio_interno || ''}`]);
      
      await db.query(`INSERT INTO movimientos_poliza (poliza_id, cuenta_id, debe, concepto) VALUES ($1, $2, $3, $4)`, 
        [polizaId, factura.cta_iva_id, montoIva, `IVA: ${factura.folio_interno || ''}`]);
        
      await db.query(`INSERT INTO movimientos_poliza (poliza_id, cuenta_id, haber, concepto) VALUES ($1, $2, $3, $4)`, 
        [polizaId, factura.cta_pasivo_id, factura.total, `Pasivo: ${factura.folio_interno || ''}`]);
    }

    await db.query('COMMIT');

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename=Polizas_Diario_${anio}_${mes}.txt`);
    res.send(contenidoTxt);
  } catch (err) { 
    await db.query('ROLLBACK');
    res.status(500).json({ error: err.message }); 
  }
});

// ==========================================================
// MÓDULO CONTABLE: ENDPOINT 13 - EXPORTAR EGRESOS (MOMENTO B)
// ==========================================================
app.get('/api/contabilidad/exportar-egresos', authenticateToken, async (req, res) => {
  const { anio, mes, dia } = req.query;
  try {
    let dateFilter = "TO_CHAR(f.fecha_emision, 'YYYY-MM') = $1";
    let params = [`${anio}-${mes}`];
    if (dia && dia !== 'Todos') {
      dateFilter = "TO_CHAR(f.fecha_emision, 'YYYY-MM-DD') = $1";
      params = [`${anio}-${mes}-${dia}`];
    }

    const query = await db.query(`
      SELECT f.uuid, f.nombre_emisor, f.total, f.fecha_emision, f.folio_interno,
             COALESCE(f.subtotal, ROUND((f.total / 1.16), 2)) as subtotal,
             COALESCE(f.iva, ROUND((f.total - (f.total / 1.16)), 2)) as iva,
             cp.codigo_cuenta as cta_pasivo, cp.id as cta_pasivo_id,
             civa.codigo_cuenta as cta_iva_pend, civa.id as cta_iva_pend_id
      FROM facturas_recibidas f
      JOIN configuracion_contable_proveedor cc ON f.rfc_emisor = cc.rfc_emisor
      JOIN cuentas_contables cp ON cc.cuenta_pasivo_id = cp.id
      JOIN cuentas_contables civa ON cc.cuenta_iva_pendiente_id = civa.id
      WHERE ${dateFilter} AND f.estatus_pago = 'pagado' AND f.tipo_comprobante = 'I'
    `, params);

    // Intentar obtener cuentas globales (Banco e IVA Acreditable Pagado) leyendo tu catálogo
    const bancos = await db.query(`SELECT id, codigo_cuenta FROM cuentas_contables WHERE tipo_cuenta = 'activo' AND nombre_cuenta ILIKE '%banco%' LIMIT 1`);
    const ivaPagado = await db.query(`SELECT id, codigo_cuenta FROM cuentas_contables WHERE tipo_cuenta = 'activo' AND nombre_cuenta ILIKE '%acreditable%' AND nombre_cuenta ILIKE '%pagado%' LIMIT 1`);
    
    const ctaBanco = bancos.rows.length > 0 ? bancos.rows[0].codigo_cuenta : 'CTA_BANCOS';
    const ctaBancoId = bancos.rows.length > 0 ? bancos.rows[0].id : null;
    const ctaIvaPagado = ivaPagado.rows.length > 0 ? ivaPagado.rows[0].codigo_cuenta : 'CTA_IVA_PAGADO';
    const ctaIvaPagadoId = ivaPagado.rows.length > 0 ? ivaPagado.rows[0].id : null;

    let contenidoTxt = "";
    
    await db.query('BEGIN');

    for (const factura of query.rows) {
      const fechaFormateada = new Date(factura.fecha_emision).toISOString().slice(0,10).replace(/-/g, '');
      const montoGasto = Number(factura.subtotal).toFixed(2);
      const montoIva = Number(factura.iva).toFixed(2);
      
      const conceptoPoliza = `Pago Prov: ${factura.nombre_emisor.substring(0,30)} Folio ${factura.folio_interno || ''}`;
      
      // Póliza de Egreso (Tipo 2 en CONTPAQi)
      contenidoTxt += `P ${fechaFormateada} 2 1 ${conceptoPoliza}\n`;
      contenidoTxt += `M ${factura.cta_pasivo} 0 ${factura.total} Cancela Pasivo: ${factura.uuid}\n`;
      contenidoTxt += `M ${ctaIvaPagado} 0 ${montoIva} IVA Pagado: ${factura.uuid}\n`;
      contenidoTxt += `M ${factura.cta_iva_pend} 1 ${montoIva} Cancela IVA Pend: ${factura.uuid}\n`;
      contenidoTxt += `M ${ctaBanco} 1 ${factura.total} Salida Banco: ${factura.uuid}\n`;

      const resPoliza = await db.query(
        `INSERT INTO polizas (uuid_factura, tipo_poliza, fecha, concepto) VALUES ($1, 'egreso', $2, $3) RETURNING id`,
        [factura.uuid, factura.fecha_emision, conceptoPoliza]
      );
      const polizaId = resPoliza.rows[0].id;

      await db.query(`INSERT INTO movimientos_poliza (poliza_id, cuenta_id, debe, concepto) VALUES ($1, $2, $3, $4)`, 
        [polizaId, factura.cta_pasivo_id, factura.total, `Cancela Pasivo: ${factura.folio_interno || ''}`]);
      
      if (ctaIvaPagadoId) {
        await db.query(`INSERT INTO movimientos_poliza (poliza_id, cuenta_id, debe, concepto) VALUES ($1, $2, $3, $4)`, 
          [polizaId, ctaIvaPagadoId, montoIva, `IVA Pagado: ${factura.folio_interno || ''}`]);
      }
        
      await db.query(`INSERT INTO movimientos_poliza (poliza_id, cuenta_id, haber, concepto) VALUES ($1, $2, $3, $4)`, 
        [polizaId, factura.cta_iva_pend_id, montoIva, `Cancela IVA Pend: ${factura.folio_interno || ''}`]);

      if (ctaBancoId) {
        await db.query(`INSERT INTO movimientos_poliza (poliza_id, cuenta_id, haber, concepto) VALUES ($1, $2, $3, $4)`, 
          [polizaId, ctaBancoId, factura.total, `Salida Banco: ${factura.folio_interno || ''}`]);
      }
    }

    await db.query('COMMIT');

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename=Polizas_Egreso_${anio}_${mes}.txt`);
    res.send(contenidoTxt);
  } catch (err) { 
    await db.query('ROLLBACK');
    res.status(500).json({ error: err.message }); 
  }
});

// ==========================================================
// MÓDULO CONTABLE: ENDPOINT 14 - EXPORTAR REPORTE DIOT
// ==========================================================
app.get('/api/contabilidad/exportar-diot', authenticateToken, async (req, res) => {
  const { anio, mes, dia } = req.query;
  try {
    let dateFilter = "TO_CHAR(fecha_emision, 'YYYY-MM') = $1";
    let params = [`${anio}-${mes}`];
    if (dia && dia !== 'Todos') {
      dateFilter = "TO_CHAR(fecha_emision, 'YYYY-MM-DD') = $1";
      params = [`${anio}-${mes}-${dia}`];
    }

    const query = await db.query(`
      SELECT rfc_emisor, nombre_emisor,
             SUM(total) as total_pagado,
             SUM(COALESCE(subtotal, total / 1.16)) as base_iva,
             SUM(COALESCE(iva, total - (total/1.16))) as iva_pagado
      FROM facturas_recibidas
      WHERE ${dateFilter} AND estatus_pago = 'pagado'
      GROUP BY rfc_emisor, nombre_emisor
      ORDER BY total_pagado DESC
    `, params);

    let csv = "RFC,PROVEEDOR,BASE IVA (16%),IVA PAGADO,TOTAL PAGADO\n";
    query.rows.forEach(r => {
      csv += `${r.rfc_emisor},"${r.nombre_emisor}",${Number(r.base_iva).toFixed(2)},${Number(r.iva_pagado).toFixed(2)},${Number(r.total_pagado).toFixed(2)}\n`;
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    // Usamos el prefijo BOM (\uFEFF) para que Excel respete los acentos y las Ñ automáticamente
    res.setHeader('Content-Disposition', `attachment; filename=Reporte_DIOT_${anio}_${mes}.csv`);
    res.send('\uFEFF' + csv);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================================
// INTELIGENCIA DE COMPRAS: BUSCAR CONCEPTOS E HISTÓRICO
// ==========================================================
app.get('/api/conceptos/buscar', authenticateToken, cacheMiddleware(60), async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  
  try {
    const term = `%${q}%`;
    const query = await db.query(`
      SELECT 
        fc.id,
        fc.descripcion,
        fc.clave_prod_serv,
        fc.cantidad,
        fc.unidad,
        fc.valor_unitario,
        fc.importe,
        TO_CHAR(f.fecha_emision, 'YYYY-MM-DD') as fecha_emision,
        f.nombre_emisor as proveedor,
        f.rfc_emisor,
        f.uuid
      FROM factura_conceptos fc
      JOIN facturas_recibidas f ON fc.uuid_factura = f.uuid
      WHERE fc.descripcion ILIKE $1 OR fc.clave_prod_serv ILIKE $1 OR f.nombre_emisor ILIKE $1
      ORDER BY f.fecha_emision ASC
      LIMIT 1000
    `, [term]);
    res.json(query.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================================
// INTELIGENCIA DE COMPRAS: EXPORTAR CONCEPTOS (CSV)
// ==========================================================
app.get('/api/contabilidad/exportar-conceptos', authenticateToken, async (req, res) => {
  const { anio, mes, dia } = req.query;
  try {
    let dateFilter = "TO_CHAR(f.fecha_emision, 'YYYY-MM') = $1";
    let params = [`${anio}-${mes}`];
    if (dia && dia !== 'Todos') {
      dateFilter = "TO_CHAR(f.fecha_emision, 'YYYY-MM-DD') = $1";
      params = [`${anio}-${mes}-${dia}`];
    }

    const query = await db.query(`
      SELECT f.uuid, TO_CHAR(f.fecha_emision, 'YYYY-MM-DD') as fecha_emision, f.rfc_emisor, f.nombre_emisor,
             fc.clave_prod_serv, fc.descripcion, fc.cantidad, fc.valor_unitario, fc.importe, fc.descuento
      FROM factura_conceptos fc
      JOIN facturas_recibidas f ON fc.uuid_factura = f.uuid
      WHERE ${dateFilter}
      ORDER BY f.fecha_emision DESC, f.nombre_emisor
    `, params);

    let csv = "UUID,FECHA,RFC EMISOR,PROVEEDOR,CLAVE SAT,DESCRIPCION,CANTIDAD,PRECIO UNITARIO,IMPORTE,DESCUENTO\n";
    query.rows.forEach(r => {
      const desc = r.descripcion ? String(r.descripcion).replace(/"/g, '""').replace(/\n/g, ' ') : '';
      const prov = r.nombre_emisor ? String(r.nombre_emisor).replace(/"/g, '""') : '';
      csv += `"${r.uuid}","${r.fecha_emision}","${r.rfc_emisor}","${prov}","${r.clave_prod_serv}","${desc}",${r.cantidad},${r.valor_unitario},${r.importe},${r.descuento}\n`;
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=Conceptos_${anio}_${mes}${dia !== 'Todos' ? '_'+dia : ''}.csv`);
    res.send('\uFEFF' + csv);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================================
// CUMPLIMIENTO FISCAL: VERIFICAR ESTATUS SAT (Vigente/Cancelado)
// ==========================================================
app.post('/api/fiscal/verificar-estatus-sat', authenticateToken, async (req, res) => {
  const { uuid, rfcEmisor, rfcReceptor, total } = req.body;

  if (!uuid || !rfcEmisor || !rfcReceptor || !total) {
    return res.status(400).json({ error: 'Faltan parámetros fiscales para la consulta.' });
  }

  // El SAT requiere que el total tenga formato exacto con decimales
  const totalFormat = parseFloat(total).toFixed(2);
  
  // Estructura obligatoria de la cadena del SAT
  const expresionImpresa = `?re=${rfcEmisor}&rr=${rfcReceptor}&tt=${totalFormat}&id=${uuid}`;
  
  const soapXML = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
       <soapenv:Header/>
       <soapenv:Body>
          <tem:Consulta>
             <tem:expresionImpresa><![CDATA[${expresionImpresa}]]></tem:expresionImpresa>
          </tem:Consulta>
       </soapenv:Body>
    </soapenv:Envelope>
  `;

  try {
    const satResponse = await fetch('https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://tempuri.org/IConsultaCFDIService/Consulta'
      },
      body: soapXML
    });

    const responseText = await satResponse.text();
    
    // Extraer el estado del XML de respuesta
    const matchEstado = responseText.match(/<a:Estado>([^<]+)<\/a:Estado>/);
    const estadoActual = matchEstado ? matchEstado[1].toLowerCase() : 'desconocido';

    // Actualizar en la base de datos
    const estatusLimpio = estadoActual.includes('cancelado') ? 'cancelado' : 'vigente';
    
    await db.query(
      `UPDATE facturas_recibidas SET estatus_fiscal = $1 WHERE uuid = $2`,
      [estatusLimpio, uuid]
    );

    res.json({ 
      uuid, 
      estatus_sat: estadoActual,
      esSeguroPagar: estatusLimpio === 'vigente'
    });

  } catch (error) {
    console.error("❌ Error consultando al SAT:", error);
    res.status(500).json({ error: 'Falla al conectar con el Web Service del SAT.' });
  }
});

// ==========================================================
// MÓDULO DASHBOARD: ENDPOINT 13.1 - FLUJO DE EFECTIVO PROYECTADO
// ==========================================================
app.get('/api/dashboard/flujo', authenticateToken, async (req, res) => {
  try {
    const { rfc_receptor } = req.query;
    let rfcFilter = "1=1";
    let params = [];
    if (rfc_receptor && rfc_receptor !== 'Todas') {
      rfcFilter = "rfc_receptor = $1";
      params = [rfc_receptor];
    }

    const query = await db.query(`
      WITH stats_proveedor AS (
        SELECT rfc_emisor, COALESCE(AVG(EXTRACT(EPOCH FROM (fecha_pago - fecha_emision))/86400), 30) as dias_pago_promedio
        FROM facturas_recibidas
        WHERE estatus_pago = 'pagado' AND fecha_pago IS NOT NULL
        GROUP BY rfc_emisor
      ),
      proyectado AS (
        SELECT 
          f.uuid,
          f.estatus_pago,
          f.total,
          f.fecha_pago,
          f.fecha_emision + (COALESCE(s.dias_pago_promedio, 30) * interval '1 day') as fecha_proyectada
        FROM facturas_recibidas f
        LEFT JOIN stats_proveedor s ON f.rfc_emisor = s.rfc_emisor
        WHERE ${rfcFilter} AND f.tipo_comprobante IN ('I', 'N')
      )
      SELECT 
        TO_CHAR(COALESCE(fecha_pago, fecha_proyectada), 'YYYY-MM') as mes,
        SUM(CASE WHEN estatus_pago = 'pagado' THEN total ELSE 0 END) as dinero_pagado,
        SUM(CASE WHEN estatus_pago = 'pendiente' THEN total ELSE 0 END) as pasivo_proyectado
      FROM proyectado
      GROUP BY TO_CHAR(COALESCE(fecha_pago, fecha_proyectada), 'YYYY-MM')
      ORDER BY mes ASC
      LIMIT 12
    `, params);
    
    // Transformar a numéricos para Recharts
    const data = query.rows.map(row => ({
      mes: row.mes,
      pagado: parseFloat(row.dinero_pagado),
      pasivo: parseFloat(row.pasivo_proyectado)
    }));

    res.json(data);
  } catch (err) {
    console.error("❌ Error en flujo de efectivo:", err);
    res.status(500).json({ error: 'Falla al extraer datos de flujo' });
  }
});

// ==========================================================
// MÓDULO AUDITORÍA: ENDPOINT 14 - REPs HUÉRFANOS
// ==========================================================
app.get('/api/auditoria/reps-huerfanos', authenticateToken, async (req, res) => {
  try {
    const query = await db.query(`
      SELECT 
        p.uuid AS uuid_pago,
        p.fecha_emision,
        p.rfc_emisor,
        p.nombre_emisor,
        p.total AS total_pago,
        r.uuid_relacionado,
        r.importe_pagado,
        r.moneda
      FROM facturas_recibidas p
      JOIN complemento_relaciones r ON p.uuid = r.uuid_pago
      LEFT JOIN facturas_recibidas f ON r.uuid_relacionado = f.uuid
      WHERE p.tipo_comprobante = 'P' 
        AND (f.uuid IS NULL OR f.estatus_fiscal = 'cancelado')
      ORDER BY p.fecha_emision DESC
    `);
    
    res.json(query.rows);
  } catch (err) {
    console.error("❌ Error en auditoría de REPs:", err);
    res.status(500).json({ error: 'Falla al extraer datos de REPs huérfanos' });
  }
});

// ==========================================================
// INICIAR SERVIDOR
// ==========================================================
app.set('io', io);
// Registrar rutas de Inteligencia de Compras
registerComprasEndpoints(app, db, authenticateToken);

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});