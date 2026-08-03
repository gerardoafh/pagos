import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, RefreshCw, Search, DownloadCloud } from 'lucide-react';
import { API_BASE } from '../api.js';

export default function RepsHuerfanosModal({ token, onClose }) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  const cargarDatos = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/auditoria/reps-huerfanos`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Error al obtener datos');
      const data = await res.json();
      setDatos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [token]);

  const buscarEnSat = (uuid) => {
    alert(`Buscando factura ${uuid} en el SAT (Funcionalidad en construcción)`);
  };

  const formatearMoneda = (monto) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(monto || 0);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-950">
          <div className="flex items-center gap-3">
            <div className="bg-red-500/10 p-2 rounded-lg text-red-500">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Auditoría de REPs Huérfanos</h2>
              <p className="text-sm text-gray-400">Detecta pagos sin factura origen o facturas PPD sin pago registrado</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-auto">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-4 flex items-center gap-2">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-end mb-4">
            <button 
              onClick={cargarDatos} 
              disabled={cargando}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm font-medium"
            >
              <RefreshCw size={16} className={cargando ? 'animate-spin' : ''} />
              Actualizar
            </button>
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">Tipo Anomalía</th>
                  <th className="px-6 py-4 font-semibold">Proveedor</th>
                  <th className="px-6 py-4 font-semibold">UUID</th>
                  <th className="px-6 py-4 font-semibold">Fecha</th>
                  <th className="px-6 py-4 font-semibold text-right">Monto</th>
                  <th className="px-6 py-4 font-semibold text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {cargando ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <RefreshCw size={24} className="animate-spin mx-auto mb-2 opacity-50" />
                      Analizando inconsistencias...
                    </td>
                  </tr>
                ) : datos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-emerald-500">
                      <div className="flex flex-col items-center gap-2">
                        <div className="bg-emerald-500/10 p-3 rounded-full">
                          <AlertTriangle size={32} />
                        </div>
                        <span className="font-medium text-lg">Todo en orden</span>
                        <span className="text-gray-500 text-sm">No se detectaron REPs huérfanos ni inconsistencias.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  datos.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          row.anomalia.includes('Factura Origen') 
                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' 
                            : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        }`}>
                          {row.anomalia}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{row.proveedor || 'Desconocido'}</td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-400">{row.uuid}</td>
                      <td className="px-6 py-4 text-gray-400">{row.fecha}</td>
                      <td className="px-6 py-4 text-right font-medium text-gray-200">
                        {formatearMoneda(row.monto)} <span className="text-xs text-gray-500 ml-1">{row.moneda}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => buscarEnSat(row.uuid)}
                          className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                          title="Buscar / Descargar del SAT"
                        >
                          <DownloadCloud size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
