import db from '../config/db.js';

/**
 * Escanea la tabla factura_conceptos y compara el valor_unitario reciente
 * de un concepto contra su promedio histórico (de los últimos 6 meses).
 * Si excede un 30% de aumento, lo marca como anomalía.
 */
export async function detectarAnomaliasPrecios() {
  console.log("🔍 [AI] Iniciando escaneo estadístico de anomalías en precios...");
  try {
    // Buscar los últimos 1000 conceptos insertados (para no escanear toda la BD siempre)
    // Opcionalmente se podría filtrar por "donde anomalia_precio is null"
    const result = await db.query(`
      WITH Historial AS (
        SELECT 
          c.clave_prod_serv,
          f.rfc_emisor,
          AVG(c.valor_unitario) as promedio_historico,
          COUNT(c.id) as total_compras
        FROM factura_conceptos c
        JOIN facturas_recibidas f ON c.uuid_factura = f.uuid
        WHERE f.fecha_emision >= CURRENT_DATE - INTERVAL '6 months'
        GROUP BY c.clave_prod_serv, f.rfc_emisor
      ),
      Recientes AS (
        SELECT 
          c.id as concepto_id,
          c.clave_prod_serv,
          f.rfc_emisor,
          c.valor_unitario,
          f.uuid
        FROM factura_conceptos c
        JOIN facturas_recibidas f ON c.uuid_factura = f.uuid
        -- Evaluamos las facturas recientes (Ej: importadas hoy)
        WHERE f.importado_en >= CURRENT_DATE - INTERVAL '2 days'
      )
      SELECT 
        r.concepto_id,
        r.uuid,
        r.rfc_emisor,
        r.clave_prod_serv,
        r.valor_unitario,
        h.promedio_historico,
        h.total_compras
      FROM Recientes r
      JOIN Historial h 
        ON r.clave_prod_serv = h.clave_prod_serv 
        AND r.rfc_emisor = h.rfc_emisor
      WHERE h.total_compras >= 3 
        AND r.valor_unitario > (h.promedio_historico * 1.30)
    `);

    if (result.rows.length === 0) {
      console.log("✅ [AI] No se detectaron sobreprecios abusivos recientes.");
      return;
    }

    console.log(`⚠️ [AI] ALERTA: Se detectaron ${result.rows.length} anomalías de precios.`);

    // Marcar en la BD
    for (const anomalia of result.rows) {
      const porcentaje = (((anomalia.valor_unitario / anomalia.promedio_historico) - 1) * 100).toFixed(1);
      const detalles = `Inflación detectada: ${porcentaje}%. Precio actual: $${anomalia.valor_unitario}, Promedio 6m: $${parseFloat(anomalia.promedio_historico).toFixed(2)}`;

      await db.query(
        `UPDATE factura_conceptos 
         SET anomalia_precio = TRUE, anomalia_detalles = $1
         WHERE id = $2`,
        [detalles, anomalia.concepto_id]
      );

      // Registrar también en Audit Logs para notificar al Admin
      await db.query(
        `INSERT INTO audit_logs (usuario_nombre, accion, entidad, entidad_id, ip_address, detalles)
         VALUES ('Worker IA', 'Detección Anomalía Precio', 'facturas_recibidas', $1, '127.0.0.1', $2)`,
        [anomalia.uuid, JSON.stringify({ rfc_proveedor: anomalia.rfc_emisor, detalles })]
      );
    }
  } catch (error) {
    console.error("❌ [AI] Error al detectar anomalías:", error);
  }
}
