import React, { useState } from 'react';
import { UploadCloud, CheckCircle, AlertTriangle, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { API_BASE } from '../api.js';

export default function Conciliacion({ token }) {
  const [file, setFile] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubirCSV = async () => {
    if (!file) return;
    setCargando(true);
    setError(null);
    setResultado(null);

    const formData = new FormData();
    formData.append('estadoCuenta', file);

    try {
      const res = await fetch(`${API_BASE}/api/bancos/conciliar`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        setResultado(data);
      } else {
        setError(data.error || 'Error al conciliar');
      }
    } catch (err) {
      setError('Error de red al conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">Conciliación Bancaria Automática</h1>
        <p className="mt-2 text-sm text-gray-400">Sube tu estado de cuenta en formato CSV para conciliar transacciones automáticamente.</p>
      </div>

      {!resultado && (
        <div 
          onDragOver={handleDragOver} 
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 transition-colors rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer"
          onClick={() => document.getElementById('csv-upload').click()}
        >
          <input 
            id="csv-upload" 
            type="file" 
            className="hidden" 
            accept=".csv"
            onChange={e => setFile(e.target.files[0])}
          />
          <UploadCloud size={48} className={`mb-4 ${file ? 'text-emerald-400' : 'text-gray-500'}`} />
          <h3 className="text-lg font-semibold text-white mb-1">
            {file ? file.name : 'Arrastra tu archivo CSV aquí'}
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            {file ? 'Archivo listo para procesar' : 'o haz clic para seleccionar un archivo'}
          </p>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleSubirCSV(); }}
            disabled={!file || cargando}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
          >
            {cargando ? <RefreshCw className="animate-spin" size={18} /> : <FileSpreadsheet size={18} />}
            {cargando ? 'Conciliando...' : 'Iniciar Conciliación'}
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
          <AlertTriangle size={20} /> {error}
        </div>
      )}

      {resultado && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
              <p className="text-gray-400 text-sm">Transacciones Procesadas</p>
              <p className="text-2xl font-bold text-white mt-1">{resultado.transaccionesProcesadas}</p>
            </div>
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-5 rounded-2xl">
              <p className="text-emerald-400/80 text-sm">Conciliadas con Éxito</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{resultado.conciliadas}</p>
            </div>
            <div className="bg-orange-900/20 border border-orange-500/30 p-5 rounded-2xl">
              <p className="text-orange-400/80 text-sm">No Encontradas</p>
              <p className="text-2xl font-bold text-orange-400 mt-1">{resultado.noEncontradas}</p>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
              <h3 className="font-semibold text-white">Detalle de Resultados</h3>
              <button 
                onClick={() => { setResultado(null); setFile(null); }}
                className="text-sm text-gray-400 hover:text-white"
              >
                Subir otro archivo
              </button>
            </div>
            <div className="overflow-x-auto max-h-[60vh]">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-gray-950/80 sticky top-0 text-gray-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Fecha Banco</th>
                    <th className="px-4 py-3 font-medium">Concepto</th>
                    <th className="px-4 py-3 font-medium text-right">Monto</th>
                    <th className="px-4 py-3 font-medium text-center">Estatus</th>
                    <th className="px-4 py-3 font-medium">Factura Relacionada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {resultado.detalles.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/30">
                      <td className="px-4 py-3 text-gray-300">{item.fecha}</td>
                      <td className="px-4 py-3 text-gray-300 truncate max-w-xs" title={item.concepto}>{item.concepto}</td>
                      <td className="px-4 py-3 text-right text-gray-300">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(item.monto)}</td>
                      <td className="px-4 py-3 text-center">
                        {item.conciliado ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs font-medium">
                            <CheckCircle size={12} /> Exitoso
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-orange-400 bg-orange-400/10 px-2 py-1 rounded text-xs font-medium">
                            <AlertTriangle size={12} /> Pendiente
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs font-mono">{item.factura_uuid || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
