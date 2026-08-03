import db from '../config/db.js';

// Cargar variables de entorno nativas (.env)
try { process.loadEnvFile(); } catch (_) {}

/**
 * Consulta a Ollama para clasificar contablemente a un proveedor basándose en sus conceptos facturados
 * y el catálogo de cuentas disponible.
 */
export async function autoClasificarProveedor(rfc, nombre, conceptos, catalogoCuentas) {
  try {
    const cuentasGasto = catalogoCuentas.filter(c => c.tipo_cuenta === 'gasto').map(c => `[ID: ${c.id}] ${c.codigo_cuenta} - ${c.nombre_cuenta}`).join('\n');
    
    // Buscar cuentas por defecto para IVA y Pasivo
    const cuentaPasivo = catalogoCuentas.find(c => c.codigo_cuenta.startsWith('201'))?.id || catalogoCuentas.find(c => c.tipo_cuenta === 'pasivo')?.id;
    const cuentaIva = catalogoCuentas.find(c => c.codigo_cuenta === '119.01' || c.nombre_cuenta.includes('IVA Pendiente'))?.id;

    const promptText = `
Eres un contador experto de México. Tu tarea es analizar los conceptos de facturación de un proveedor y asignarle UNA cuenta de GASTO de nuestro catálogo.

Proveedor: ${nombre} (RFC: ${rfc})
Conceptos Facturados Recientemente:
${conceptos.slice(0, 5).map(c => `- ${c.descripcion}`).join('\n')}

Catálogo de Cuentas de Gasto Disponibles:
${cuentasGasto}

Reglas estrictas:
1. Analiza los conceptos y determina qué cuenta de gasto es la más adecuada.
2. Devuelve ÚNICAMENTE el ID numérico de la cuenta elegida, sin ningún otro texto, ni justificación.
Ejemplo de respuesta válida: 6
`;

    const cuerpoPeticion = {
      model: process.env.OLLAMA_MODEL || "glm-4.7-flash",
      messages: [{ role: "user", content: promptText }],
      stream: false
    };

    const respuesta = await fetch(process.env.OLLAMA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpoPeticion),
    });

    if (!respuesta.ok) throw new Error(`Ollama status: ${respuesta.status}`);

    const data = await respuesta.json();
    const idSugerido = parseInt(data.message?.content?.trim());

    if (!isNaN(idSugerido) && catalogoCuentas.find(c => c.id === idSugerido)) {
      return {
        cuenta_gasto_id: idSugerido,
        cuenta_pasivo_id: cuentaPasivo,
        cuenta_iva_pendiente_id: cuentaIva
      };
    }
    return null;
  } catch (error) {
    console.error(`[AI Accounting] Error al consultar Ollama para ${rfc}:`, error.message);
    return null;
  }
}

/**
 * Escanea proveedores sin mapear e intenta auto-clasificarlos con IA
 */
export async function autoMapearProveedores() {
  console.log("🤖 [AI Accounting] Iniciando proceso Zero-Touch Accounting...");
  try {
    // 1. Obtener catálogo completo
    const resCatalogo = await db.query('SELECT * FROM cuentas_contables');
    const catalogo = resCatalogo.rows;

    // 2. Obtener proveedores que tienen facturas pero no están mapeados
    const resProveedores = await db.query(`
      SELECT DISTINCT f.rfc_emisor, f.nombre_emisor
      FROM facturas_recibidas f
      LEFT JOIN configuracion_contable_proveedor ccp ON f.rfc_emisor = ccp.rfc_emisor
      WHERE ccp.rfc_emisor IS NULL
    `);

    const proveedores = resProveedores.rows;
    if (proveedores.length === 0) {
      console.log("✅ Todos los proveedores están mapeados.");
      return;
    }

    console.log(`🔍 Se encontraron ${proveedores.length} proveedores sin mapeo contable. Analizando con IA...`);

    for (const proveedor of proveedores) {
      // Obtener conceptos de ese proveedor
      const resConceptos = await db.query(`
        SELECT DISTINCT c.descripcion 
        FROM factura_conceptos c
        JOIN facturas_recibidas f ON c.uuid_factura = f.uuid
        WHERE f.rfc_emisor = $1
        LIMIT 10
      `, [proveedor.rfc_emisor]);

      const conceptos = resConceptos.rows;
      if (conceptos.length === 0) continue;

      const mapeo = await autoClasificarProveedor(proveedor.rfc_emisor, proveedor.nombre_emisor, conceptos, catalogo);
      
      if (mapeo && mapeo.cuenta_gasto_id && mapeo.cuenta_pasivo_id && mapeo.cuenta_iva_pendiente_id) {
        await db.query(`
          INSERT INTO configuracion_contable_proveedor (rfc_emisor, cuenta_gasto_id, cuenta_pasivo_id, cuenta_iva_pendiente_id)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (rfc_emisor) DO NOTHING
        `, [proveedor.rfc_emisor, mapeo.cuenta_gasto_id, mapeo.cuenta_pasivo_id, mapeo.cuenta_iva_pendiente_id]);
        
        console.log(`   ✨ [Mapeo Automático] Proveedor ${proveedor.nombre_emisor} mapeado a cuenta ID: ${mapeo.cuenta_gasto_id}`);
      }
    }
    console.log("✅ Proceso Zero-Touch Accounting completado.");
  } catch (error) {
    console.error("❌ Error en Zero-Touch Accounting:", error);
  }
}
