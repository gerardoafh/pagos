import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const db = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST === 'db' ? '127.0.0.1' : process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5433, // Local host port mapped to db
});

async function test() {
  try {
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
       ORDER BY f.fecha_emision DESC LIMIT 1`
    );
    console.log("SUCCESS!", result.rows);
  } catch(e) {
    console.error("FAILED!", e.message);
  }
  db.end();
}
test();
