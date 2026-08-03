import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, AlertTriangle, RefreshCw, DownloadCloud, Search, ChevronRight } from 'lucide-react';
import { API_BASE } from '../api.js';

export default function RepsHuerfanos({ token }) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [tabActivo, setTabActivo] = useState('falta_factura'); // 'falta_factura' o 'falta_rep'
  
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 50;
  
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

  const verProveedor = (proveedor) => {
    if (!proveedor || proveedor === 'Desconocido') return;
    localStorage.setItem('verProveedor', proveedor);
    window.location.hash = 'compras';
  };

  const datosFiltrados = useMemo(() => {
    return datos.filter(row => {
      // Filtro por pestaña
      if (tabActivo === 'falta_factura' && row.anomalia !== 'Falta Factura Origen') return false;
      if (tabActivo === 'falta_rep' && row.anomalia !== 'Falta REP (Pago)') return false;
      
      // Filtro de búsqueda
      if (busqueda.trim()) {
        const query = busqueda.toLowerCase();
        const prov = (row.proveedor || '').toLowerCase();
        const uuid = (row.uuid || '').toLowerCase();
        if (!prov.includes(query) && !uuid.includes(query)) return false;
      }
      return true;
    });
  }, [datos, tabActivo, busqueda]);

  const totalPaginas = Math.ceil(datosFiltrados.length / itemsPorPagina) || 1;
  const datosPaginados = datosFiltrados.slice((pagina - 1) * itemsPorPagina, pagina * itemsPorPagina);

  // Resetear página al cambiar de pestaña o buscar
  useEffect(() => {
    setPagina(1);
  }, [tabActivo, busqueda]);

  return (
    <div className="min-h-screen bg-gray-950 p-6 flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-7xl flex flex-col gap-4">
        
        {/* Nav / Back */}
        <div className="w-full flex justify-between items-center mb-4">
          <button onClick={() => window.location.hash = 'pagos'} className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
            <ChevronLeft /> Volver a Pagos
          </button>
          
          <button 
            onClick={cargarDatos} 
            disabled={cargando}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm font-medium shadow-sm border border-gray-700"
          >
            <RefreshCw size={16} className={cargando ? 'animate-spin' : ''} />
            Actualizar
          </button>
        </div>

        {/* Header Title */}
        <div className="flex items-center gap-3">
          <div className="bg-red-500/10 p-3 rounded-lg text-red-500 border border-red-500/20">
            <AlertTriangle size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Auditoría de REPs Huérfanos</h1>
            <p className="text-gray-400 text-sm mt-1">Detecta pagos sin factura origen o facturas PPD sin pago registrado</p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mt-4 flex items-center gap-2 shadow-sm">
            <AlertTriangle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Tabs and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-800 pb-3 mt-4">
          <div className="flex gap-2">
            <button
              onClick={() => setTabActivo('falta_factura')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                tabActivo === 'falta_factura'
                  ? 'bg-gray-800 text-orange-400 border-b-2 border-orange-500'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900'
              }`}
            >
              Pagos sin Factura Origen
            </button>
            <button
              onClick={() => setTabActivo('falta_rep')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                tabActivo === 'falta_rep'
                  ? 'bg-gray-800 text-purple-400 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900'
              }`}
            >
              Facturas PPD sin Pago (REP)
            </button>
          </div>
          
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Buscar proveedor o UUID..."
              className="block w-full pl-9 pr-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-950/50 text-gray-400 text-xs uppercase border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Tipo Anomalía</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Proveedor</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">UUID</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Fecha</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">Monto</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {cargando ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <RefreshCw size={24} className="animate-spin mx-auto mb-3 opacity-50" />
                      Analizando inconsistencias con la base de datos...
                    </td>
                  </tr>
                ) : datosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center text-emerald-500">
                      <div className="flex flex-col items-center gap-3">
                        <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/20">
                          <AlertTriangle size={40} />
                        </div>
                        <span className="font-semibold text-xl text-emerald-400">Todo en orden</span>
                        <span className="text-gray-500 text-sm max-w-md">No se detectaron inconsistencias para esta categoría. Tu información concuerda perfectamente.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  datosPaginados.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          row.anomalia.includes('Factura Origen') 
                            ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
                            : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        }`}>
                          {row.anomalia}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {row.proveedor && row.proveedor !== 'Desconocido' ? (
                          <button 
                            onClick={() => verProveedor(row.proveedor)}
                            className="text-blue-400 hover:text-blue-300 font-medium hover:underline text-left transition-colors"
                            title="Ver conceptos y detalle del proveedor"
                          >
                            {row.proveedor}
                          </button>
                        ) : (
                          <span className="text-gray-400 font-medium">Desconocido</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-gray-400 bg-gray-950 px-2 py-1 rounded border border-gray-800">{row.uuid}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{row.fecha}</td>
                      <td className="px-6 py-4 text-right font-medium text-gray-200">
                        {formatearMoneda(row.monto)} <span className="text-xs text-gray-500 ml-1 font-normal">{row.moneda}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => buscarEnSat(row.uuid)}
                          className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-lg transition-colors"
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
          
          {/* Pagination Footer */}
          {!cargando && datosFiltrados.length > 0 && (
            <div className="bg-gray-950/80 px-6 py-4 border-t border-gray-800 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Mostrando <span className="font-medium text-white">{((pagina - 1) * itemsPorPagina) + 1}</span> a <span className="font-medium text-white">{Math.min(pagina * itemsPorPagina, datosFiltrados.length)}</span> de <span className="font-medium text-white">{datosFiltrados.length}</span> registros
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPagina(p => Math.max(1, p - 1))}
                  disabled={pagina === 1}
                  className="p-1.5 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                  disabled={pagina === totalPaginas}
                  className="p-1.5 rounded-lg border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
