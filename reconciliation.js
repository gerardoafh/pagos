import db from './config/db.js';

export async function ejecutarConciliacion(monto, conceptoBanco, idTransaccionBanco) {
  try {
    console.log(`✅ Iniciando conciliación para monto: $${monto}`);

    console.log(`Buscando facturas pendientes con el monto exacto de: $${monto}...`);

    // 1. Buscamos en las facturas ingresadas que estén 'pendiente' y coincidan en el total
    const queryFacturas = await db.query(
      `SELECT uuid, rfc_emisor, nombre_emisor, total, estatus_pago 
       FROM facturas_recibidas 
       WHERE total = $1 AND estatus_pago = 'pendiente'`,
      [monto]
    );

    const facturasEncontradas = queryFacturas.rows;

    if (facturasEncontradas.length === 0) {
      console.log("❌ No se encontraron facturas pendientes con ese monto exacto.");
      return;
    }

    console.log(`🔍 Se encontraron ${facturasEncontradas.length} factura(s) con ese monto.`);

    let facturaSeleccionada = null;

    // 2. Si hay más de una factura con el mismo monto, usamos el concepto del banco para desempatar (Scoring por RFC)
    if (facturasEncontradas.length === 1) {
      facturaSeleccionada = facturasEncontradas[0];
    } else {
      console.log("Desempatando por coincidencia de texto (Concepto Bancario vs RFC/Nombre)...");
      for (const factura of facturasEncontradas) {
        // Si el concepto del banco incluye el RFC del emisor, hacemos Match Seguro
        if (conceptoBanco.toUpperCase().includes(factura.rfc_emisor.toUpperCase())) {
          facturaSeleccionada = factura;
          break;
        }
      }
    }

    if (!facturaSeleccionada) {
      console.log("⚠️ Hay ambigüedad. Se requiere conciliación manual en el panel web.");
      return;
    }

    // 3. Aplicamos el "Sanado": Cambiamos el estatus a pagado y guardamos la referencia del pago
    console.log(`\n🎉 ¡Match encontrado con éxito!`);
    console.log(`Proveedor: ${facturaSeleccionada.nombre_emisor} (${facturaSeleccionada.rfc_emisor})`);
    console.log(`UUID: ${facturaSeleccionada.uuid}`);
    
    // NOTA TÉCNICA: Este archivo es un prototipo.
    // Actualmente utiliza datos simulados (hardcodeados) para propósitos de demostración.
    // Para conectar esto con el banco real, integrar aquí la API bancaria (ej. Banorte, BBVA).
    const idTransaccionBanco = "TX-BCO-99882211"; // ID único simulado del banco

    await db.query(
      `UPDATE facturas_recibidas 
       SET estatus_pago = 'pagado', id_transaccion_banco = $1, fecha_pago = CURRENT_TIMESTAMP
       WHERE uuid = $2`,
      [idTransaccionBanco, facturaSeleccionada.uuid]
    );

    console.log(`✅ Registro actualizado en PostgreSQL a estatus: 'pagado'.`);
    return { success: true, factura: facturaSeleccionada.uuid };

  } catch (error) {
    console.error("Error en el proceso de conciliación:", error);
    return { success: false, error: error.message };
  }
}