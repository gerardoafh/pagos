// ==========================================================
// INTELIGENCIA DE COMPRAS — Endpoints adicionales
// Importado por api_server.js
// ==========================================================

/**
 * Registra los endpoints de Inteligencia de Compras en la app Express.
 * @param {import('express').Application} app
 * @param {import('pg').Pool} db
 * @param {Function} authenticateToken
 */
export function registerComprasEndpoints(app, db, authenticateToken) {

  // ── KPIs / Resumen ─────────────────────────────────────
  app.get('/api/compras/resumen', authenticateToken, async (req, res) => {
    const { anio, mes } = req.query;
    if (!anio) return res.status(400).json({ error: 'Parametro anio requerido.' });
    try {
      let where = `tipo_comprobante = 'I' AND EXTRACT(YEAR FROM fecha_emision) = $1`;
      const params = [anio];
      if (mes && mes !== 'todos') {
        where += ` AND EXTRACT(MONTH FROM fecha_emision) = $2`;
        params.push(parseInt(mes));
      }

      const [kpi, top] = await Promise.all([
        db.query(`
          SELECT
            COALESCE(SUM(total), 0)            AS total_gastado,
            COUNT(*)                            AS num_facturas,
            COUNT(DISTINCT rfc_emisor)          AS num_proveedores,
            COALESCE(AVG(total), 0)             AS promedio_factura
          FROM facturas_recibidas WHERE ${where}
        `, params),
        db.query(`
          SELECT nombre_emisor, SUM(total) AS total
          FROM facturas_recibidas WHERE ${where}
          GROUP BY nombre_emisor ORDER BY total DESC LIMIT 1
        `, params),
      ]);

      const totalGastado = parseFloat(kpi.rows[0]?.total_gastado || 0);
      const t = top.rows[0];

      res.json({
        total_gastado:       totalGastado,
        num_facturas:        parseInt(kpi.rows[0]?.num_facturas || 0),
        num_proveedores:     parseInt(kpi.rows[0]?.num_proveedores || 0),
        promedio_factura:    parseFloat(kpi.rows[0]?.promedio_factura || 0),
        top_proveedor:       t?.nombre_emisor || null,
        top_proveedor_total: parseFloat(t?.total || 0),
        top_proveedor_pct:   totalGastado > 0 ? (parseFloat(t?.total || 0) / totalGastado) * 100 : 0,
      });
    } catch (err) {
      console.error('Error en /api/compras/resumen:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // ── Gasto por Mes ───────────────────────────────────────
  app.get('/api/compras/por-mes', authenticateToken, async (req, res) => {
    const { anio } = req.query;
    if (!anio) return res.status(400).json({ error: 'Parametro anio requerido.' });
    try {
      const result = await db.query(`
        SELECT
          TO_CHAR(fecha_emision, 'MM') AS mes,
          COALESCE(SUM(total), 0)      AS total,
          COUNT(*)                      AS num_facturas
        FROM facturas_recibidas
        WHERE tipo_comprobante = 'I' AND EXTRACT(YEAR FROM fecha_emision) = $1
        GROUP BY mes ORDER BY mes
      `, [anio]);

      res.json(result.rows.map(r => ({
        ...r,
        total:        parseFloat(r.total),
        num_facturas: parseInt(r.num_facturas),
      })));
    } catch (err) {
      console.error('Error en /api/compras/por-mes:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // ── Gasto por Proveedor ─────────────────────────────────
  app.get('/api/compras/por-proveedor', authenticateToken, async (req, res) => {
    const { anio, mes } = req.query;
    if (!anio) return res.status(400).json({ error: 'Parametro anio requerido.' });
    try {
      let where = `tipo_comprobante = 'I' AND EXTRACT(YEAR FROM fecha_emision) = $1`;
      const params = [anio];
      if (mes && mes !== 'todos') {
        where += ` AND EXTRACT(MONTH FROM fecha_emision) = $2`;
        params.push(parseInt(mes));
      }

      const result = await db.query(`
        SELECT
          rfc_emisor,
          nombre_emisor,
          LEFT(nombre_emisor, 30)       AS nombre_corto,
          COALESCE(SUM(total), 0)       AS total,
          COUNT(*)                       AS num_facturas
        FROM facturas_recibidas WHERE ${where}
        GROUP BY rfc_emisor, nombre_emisor
        ORDER BY total DESC LIMIT 50
      `, params);

      const totalGlobal = result.rows.reduce((s, r) => s + parseFloat(r.total), 0);
      res.json(result.rows.map(r => ({
        ...r,
        total:        parseFloat(r.total),
        num_facturas: parseInt(r.num_facturas),
        pct_total:    totalGlobal > 0 ? (parseFloat(r.total) / totalGlobal) * 100 : 0,
      })));
    } catch (err) {
      console.error('Error en /api/compras/por-proveedor:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // ── Gasto por Clave SAT ─────────────────────────────────
  app.get('/api/compras/por-clave-sat', authenticateToken, async (req, res) => {
    const { anio, mes } = req.query;
    if (!anio) return res.status(400).json({ error: 'Parametro anio requerido.' });
    try {
      let whereF = `f.tipo_comprobante = 'I' AND EXTRACT(YEAR FROM f.fecha_emision) = $1`;
      const params = [anio];
      if (mes && mes !== 'todos') {
        whereF += ` AND EXTRACT(MONTH FROM f.fecha_emision) = $2`;
        params.push(parseInt(mes));
      }

      const result = await db.query(`
        SELECT
          fc.clave_prod_serv,
          MAX(fc.descripcion)             AS descripcion_clave,
          COALESCE(SUM(fc.importe), 0)    AS total,
          COUNT(DISTINCT f.uuid)          AS num_facturas
        FROM factura_conceptos fc
        JOIN facturas_recibidas f ON fc.uuid_factura = f.uuid
        WHERE ${whereF}
          AND fc.clave_prod_serv IS NOT NULL
          AND fc.clave_prod_serv != ''
        GROUP BY fc.clave_prod_serv
        ORDER BY total DESC LIMIT 30
      `, params);

      res.json(result.rows.map(r => ({
        ...r,
        total:        parseFloat(r.total),
        num_facturas: parseInt(r.num_facturas),
      })));
    } catch (err) {
      console.error('Error en /api/compras/por-clave-sat:', err);
      res.status(500).json({ error: err.message });
    }
  });
  // ── Sugerencias y Autocompletado ────────────────────────
  app.get('/api/compras/sugerencias', authenticateToken, async (req, res) => {
    const { anio } = req.query;
    if (!anio) return res.status(400).json({ error: 'Parametro anio requerido.' });
    try {
      // Obtenemos los 50 conceptos más recurrentes del año para sugerencias
      const result = await db.query(`
        SELECT
          MAX(fc.descripcion) as descripcion,
          MAX(f.nombre_emisor) as proveedor,
          COUNT(*) as num_veces,
          MAX(fc.clave_prod_serv) as clave_prod_serv
        FROM factura_conceptos fc
        JOIN facturas_recibidas f ON fc.uuid_factura = f.uuid
        WHERE f.tipo_comprobante = 'I' AND EXTRACT(YEAR FROM f.fecha_emision) = $1
        GROUP BY LOWER(fc.descripcion), f.rfc_emisor
        ORDER BY num_veces DESC
        LIMIT 50
      `, [anio]);

      res.json(result.rows);
    } catch (err) {
      console.error('Error en /api/compras/sugerencias:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // ── Top Variaciones (Alertas de Precio) ────────────────
  app.get('/api/compras/alertas-precio', authenticateToken, async (req, res) => {
    const { anio } = req.query;
    if (!anio) return res.status(400).json({ error: 'Parametro anio requerido.' });
    try {
      // 1. Encontrar productos comprados múltiples veces en el año con distinto precio
      const result = await db.query(`
        WITH Historial AS (
          SELECT
            fc.descripcion,
            f.nombre_emisor as proveedor,
            f.fecha_emision,
            CAST(fc.valor_unitario AS NUMERIC) as precio
          FROM factura_conceptos fc
          JOIN facturas_recibidas f ON fc.uuid_factura = f.uuid
          WHERE f.tipo_comprobante = 'I' 
            AND EXTRACT(YEAR FROM f.fecha_emision) = $1
            AND CAST(fc.valor_unitario AS NUMERIC) > 0
        ),
        Agrupados AS (
          SELECT
            descripcion,
            proveedor,
            MIN(fecha_emision) as fecha_min,
            MAX(fecha_emision) as fecha_max,
            COUNT(*) as num_compras
          FROM Historial
          GROUP BY descripcion, proveedor
          HAVING COUNT(*) > 1
        ),
        Precios AS (
          SELECT
            a.descripcion,
            a.proveedor,
            a.num_compras,
            (SELECT precio FROM Historial h WHERE h.descripcion = a.descripcion AND h.proveedor = a.proveedor AND h.fecha_emision = a.fecha_min LIMIT 1) as precio_inicial,
            (SELECT precio FROM Historial h WHERE h.descripcion = a.descripcion AND h.proveedor = a.proveedor AND h.fecha_emision = a.fecha_max LIMIT 1) as precio_final
          FROM Agrupados a
        )
        SELECT
          descripcion,
          proveedor,
          num_compras,
          precio_inicial,
          precio_final,
          ROUND(((precio_final - precio_inicial) / precio_inicial) * 100, 2) as variacion_pct
        FROM Precios
        WHERE precio_inicial > 0 AND precio_final != precio_inicial
        ORDER BY variacion_pct DESC
      `, [anio]);

      const subidas = result.rows.filter(r => parseFloat(r.variacion_pct) > 0).slice(0, 5);
      const bajadas = result.rows.filter(r => parseFloat(r.variacion_pct) < 0).reverse().slice(0, 5);

      res.json({ subidas, bajadas });
    } catch (err) {
      console.error('Error en /api/compras/alertas-precio:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // ── Detalle de Proveedor (Productos Comprados) ─────────
  app.get('/api/compras/proveedor-detalle', authenticateToken, async (req, res) => {
    const { proveedor, anio, mes } = req.query;
    if (!proveedor || !anio) return res.status(400).json({ error: 'Parámetros proveedor y anio requeridos.' });
    try {
      let whereF = `f.tipo_comprobante = 'I' AND f.nombre_emisor = $1 AND EXTRACT(YEAR FROM f.fecha_emision) = $2`;
      const params = [proveedor, anio];
      if (mes && mes !== 'todos') {
        whereF += ` AND EXTRACT(MONTH FROM f.fecha_emision) = $3`;
        params.push(parseInt(mes));
      }

      const result = await db.query(`
        SELECT
          MAX(f.rfc_emisor) as rfc_emisor,
          MAX(f.regimen_fiscal_emisor) as regimen_fiscal_emisor,
          MAX(f.cp_emisor) as cp_emisor,
          MAX(fc.descripcion) as descripcion,
          fc.clave_prod_serv,
          SUM(fc.cantidad) as cantidad_total,
          MAX(fc.unidad) as unidad,
          SUM(fc.importe) as importe_total,
          AVG(fc.valor_unitario) as precio_promedio,
          COUNT(DISTINCT f.uuid) as num_facturas
        FROM factura_conceptos fc
        JOIN facturas_recibidas f ON fc.uuid_factura = f.uuid
        WHERE ${whereF}
          AND fc.descripcion IS NOT NULL
        GROUP BY LOWER(fc.descripcion), fc.clave_prod_serv
        ORDER BY importe_total DESC
      `, params);

      res.json(result.rows);
    } catch (err) {
      console.error('Error en /api/compras/proveedor-detalle:', err);
      res.status(500).json({ error: err.message });
    }
  });

}
