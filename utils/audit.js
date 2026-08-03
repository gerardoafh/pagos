import db from '../config/db.js';

/**
 * Registra una acción sensible en la bitácora de auditoría.
 * @param {Object} req - Objeto Request de Express (para extraer usuario e IP)
 * @param {String} accion - Descripción de la acción (Ej: "Aprobar Factura")
 * @param {String} entidad - Tabla o entidad afectada (Ej: "facturas_recibidas")
 * @param {String} entidad_id - Identificador del registro afectado
 * @param {Object} detalles - JSON con información adicional (Ej: cambios antes/después)
 */
export async function registrarAuditoria(req, accion, entidad, entidad_id, detalles = {}) {
  try {
    const usuarioId = req.user?.id || null;
    const usuario = req.user?.usuario || 'Sistema/Anónimo';
    
    // Obtener IP del cliente (funciona detrás de Nginx si trust proxy está activo)
    const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    await db.query(
      `INSERT INTO audit_logs (usuario_id, usuario_nombre, accion, entidad, entidad_id, ip_address, detalles)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [usuarioId, usuario, accion, entidad, entidad_id, ip_address, JSON.stringify(detalles || {})]
    );

    // Si hay instancia de Socket.io (solo en server Express), emitir evento
    if (req && req.app) {
      const io = req.app.get('io');
      if (io) {
        io.emit('nueva-auditoria', {
          titulo: 'Nueva Acción Registrada',
          mensaje: `${usuario} ejecutó: ${accion}`,
          tipo: 'info'
        });
      }
    }
  } catch (error) {
    console.error('❌ Error registrando auditoría:', error);
  }
}
