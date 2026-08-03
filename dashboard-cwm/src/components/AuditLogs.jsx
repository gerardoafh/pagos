import React, { useState, useEffect } from 'react';
import { API_BASE } from '../api';
import './AuditLogs.css';

export default function AuditLogs({ token }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/audit-logs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        if (res.status === 403) throw new Error("No tienes permisos para ver la bitácora.");
        throw new Error("Error al obtener los logs");
      }
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleString('es-MX', { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };

  return (
    <div className="audit-container fade-in">
      <div className="audit-header">
        <h2><span className="icon">🛡️</span> Bitácora de Auditoría</h2>
        <p>Registro inmutable de acciones sensibles y cambios de estado.</p>
        <button className="btn btn-secondary" onClick={fetchLogs}>Actualizar</button>
      </div>

      {error ? (
        <div className="audit-error">{error}</div>
      ) : loading ? (
        <div className="audit-loading">Cargando bitácora segura...</div>
      ) : logs.length === 0 ? (
        <div className="audit-empty">No hay registros de auditoría aún.</div>
      ) : (
        <div className="audit-table-container">
          <table className="audit-table">
            <thead>
              <tr>
                <th>Fecha y Hora</th>
                <th>Usuario</th>
                <th>Acción</th>
                <th>Entidad (ID)</th>
                <th>IP de Origen</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="audit-time">{formatearFecha(log.creado_en)}</td>
                  <td className="audit-user">{log.usuario_nombre}</td>
                  <td className="audit-action">
                    <span className={`badge ${log.accion.includes('Aprob') ? 'badge-success' : 'badge-info'}`}>
                      {log.accion}
                    </span>
                  </td>
                  <td className="audit-entity">
                    {log.entidad}<br/>
                    <small>{log.entidad_id !== 'N/A' ? log.entidad_id : ''}</small>
                  </td>
                  <td className="audit-ip">{log.ip_address}</td>
                  <td className="audit-details">
                    <pre>{JSON.stringify(log.detalles, null, 2)}</pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
