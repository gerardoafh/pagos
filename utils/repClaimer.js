import db from '../config/db.js';
import nodemailer from 'nodemailer';

/**
 * Tarea programada que busca facturas marcadas como pagadas (PPD)
 * que aún no tienen su Complemento de Pago (REP) asociado,
 * y envía un correo automático al proveedor exigiéndolo.
 */
export async function reclamarComplementosPendientes() {
  console.log("📨 [REP Claimer] Iniciando escaneo de complementos faltantes...");

  try {
    // Buscar facturas PPD, Pagadas, que no tengan un REP en el sistema
    // (Asumiremos que no tienen REP si la bandera 'tiene_complemento' = FALSE)
    const result = await db.query(`
      SELECT f.uuid, f.rfc_emisor, f.nombre_emisor, f.fecha_emision, f.total, f.folio_interno, c.correo_contacto
      FROM facturas_recibidas f
      LEFT JOIN configuracion_contable_proveedor c ON f.rfc_emisor = c.rfc_emisor
      WHERE f.metodo_pago = 'PPD' 
        AND f.estatus_pago = 'pagado'
        AND f.tiene_complemento = FALSE
        AND f.fecha_emision >= CURRENT_DATE - INTERVAL '60 days'
        AND c.correo_contacto IS NOT NULL
    `);

    if (result.rows.length === 0) {
      console.log("✅ [REP Claimer] No hay complementos pendientes que reclamar o faltan correos de proveedores.");
      return;
    }

    console.log(`⚠️ [REP Claimer] Se detectaron ${result.rows.length} facturas pagadas sin REP.`);

    // Configurar el transporter de Nodemailer
    // Nota: Las credenciales deben venir del .env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    for (const factura of result.rows) {
      const correoDestino = factura.correo_contacto;
      const folioTexto = factura.folio_interno ? `(Folio: ${factura.folio_interno})` : '';

      const mailOptions = {
        from: `"CWM Pagos" <${process.env.SMTP_USER || 'no-reply@cwm.com'}>`,
        to: correoDestino,
        subject: `URGENTE: Solicitud de Complemento de Pago (REP) faltante - ${factura.rfc_emisor}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2>Solicitud de Recibo Electrónico de Pago (REP)</h2>
            <p>Estimado(a) <strong>${factura.nombre_emisor}</strong>,</p>
            <p>Le informamos que en nuestros registros la siguiente factura ya se encuentra pagada, sin embargo, no hemos recibido el Complemento de Pago (REP) correspondiente en el portal del SAT:</p>
            <ul>
              <li><strong>Factura UUID:</strong> ${factura.uuid}</li>
              <li><strong>Folio Interno:</strong> ${folioTexto}</li>
              <li><strong>Fecha Emisión:</strong> ${new Date(factura.fecha_emision).toLocaleDateString()}</li>
              <li><strong>Monto Total:</strong> $${factura.total}</li>
            </ul>
            <p>Le solicitamos de manera cordial emitir dicho complemento a la brevedad posible para poder concluir nuestra conciliación fiscal.</p>
            <p>Atentamente,</p>
            <p><strong>Departamento de Cuentas por Pagar</strong><br>CHEONG WOON MEXICO SA DE CV</p>
          </div>
        `,
      };

      try {
        if (process.env.SMTP_USER) {
          await transporter.sendMail(mailOptions);
          console.log(`   ✉️ Correo enviado exitosamente a ${correoDestino} por la factura ${factura.uuid}`);
        } else {
          console.log(`   [Mock] Simulación de correo a ${correoDestino} por la factura ${factura.uuid}`);
        }

        // Registrar en auditoría
        await db.query(
          `INSERT INTO audit_logs (usuario_nombre, accion, entidad, entidad_id, ip_address, detalles)
           VALUES ('Sistema Auto-Reclamo', 'Envío Correo Reclamo REP', 'facturas_recibidas', $1, '127.0.0.1', $2)`,
          [factura.uuid, JSON.stringify({ correo_enviado_a: correoDestino, proveedor: factura.rfc_emisor })]
        );
      } catch (err) {
        console.error(`   ❌ Error al enviar correo a ${correoDestino}:`, err);
      }
    }

  } catch (error) {
    console.error("❌ [REP Claimer] Error general:", error);
  }
}
