import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, AlertCircle, CheckCircle2, ChevronLeft, DownloadCloud, FileSpreadsheet } from 'lucide-react';
import { API_BASE } from '../api.js';

export default function MapeoContable({ token, onVolver }) {
  const [proveedores, setProveedores] = useState([]);
  const [cuentas, setCuentas] = useState([]);
  const [mapeos, setMapeos] = useState({});
  const [cargando, setCargando] = useState(true);
  const [notificacion, setNotificacion] = useState(null); // { texto, tipo }
  
  // Controles de Exportación
  const [dia, setDia] = useState('Todos');
  const [mes, setMes] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));
  const [anio, setAnio] = useState(new Date().getFullYear().toString());

  const cargarDatos = async () => {
    setCargando(true);
    try {
      // 1. Traer catálogo de cuentas
      const resCuentas = await fetch(`${API_BASE}/api/contabilidad/cuentas`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataCuentas = await resCuentas.json();
      setCuentas(Array.isArray(dataCuentas) ? dataCuentas : []);

      // 2. Traer proveedores huérfanos
      const resProv = await fetch(`${API_BASE}/api/contabilidad/proveedores-sin-mapeo`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataProv = await resProv.json();
      setProveedores(Array.isArray(dataProv) ? dataProv : []);
    } catch (error) {
      mostrarNotificacion('Error de conexión al cargar datos.', 'error');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (token) cargarDatos();
  }, [token]);

  const mostrarNotificacion = (texto, tipo) => {
    setNotificacion({ texto, tipo });
    setTimeout(() => setNotificacion(null), 4000);
  };

  const handleSelectChange = (rfc, campo, valor) => {
    setMapeos(prev => ({
      ...prev,
      [rfc]: {
        ...prev[rfc],
        [campo]: valor === '' ? null : parseInt(valor, 10)
      }
    }));
  };

  const handleGuardar = async (rfc) => {
    const seleccion = mapeos[rfc];
    
    if (!seleccion?.cuenta_gasto_id || !seleccion?.cuenta_pasivo_id) {
      mostrarNotificacion('Debes seleccionar al menos Gasto y Pasivo.', 'error');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/contabilidad/mapear-proveedor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rfc_emisor: rfc,
          cuenta_gasto_id: seleccion.cuenta_gasto_id,
          cuenta_pasivo_id: seleccion.cuenta_pasivo_id,
          cuenta_iva_pendiente_id: seleccion.cuenta_iva_id || null
        })
      });

      if (res.ok) {
        mostrarNotificacion(`Mapeo guardado para ${rfc}`, 'exito');
        // Quitar al proveedor de la lista visualmente
        setProveedores(prev => prev.filter(p => p.rfc_emisor !== rfc));
      } else {
        const errData = await res.json();
        mostrarNotificacion(errData.error || 'Error al guardar el mapeo.', 'error');
      }
    } catch (error) {
      mostrarNotificacion('Falla de red al intentar guardar.', 'error');
    }
  };

  const handleExportar = () => {
    window.open(`${API_BASE}/api/contabilidad/exportar-contpaqi?anio=${anio}&mes=${mes}&dia=${dia}&token=${token}`, '_blank');
  };

  const handleExportarEgresos = () => {
    window.open(`${API_BASE}/api/contabilidad/exportar-egresos?anio=${anio}&mes=${mes}&dia=${dia}&token=${token}`, '_blank');
  };

  const handleExportarDIOT = () => {
    window.open(`${API_BASE}/api/contabilidad/exportar-diot?anio=${anio}&mes=${mes}&dia=${dia}&token=${token}`, '_blank');
  };

  // Filtrar cuentas por tipo para llenar los selects
  const ctasGasto = cuentas.filter(c => c.tipo_cuenta === 'gasto');
  const ctasPasivo = cuentas.filter(c => c.tipo_cuenta === 'pasivo');
  const ctasActivo = cuentas.filter(c => c.tipo_cuenta === 'activo'); // Para el IVA

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Cabecera y Controles */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-900 p-6 rounded-xl border border-gray-800 gap-4">
        <div>
          <button 
            onClick={onVolver} 
            className="text-gray-400 hover:text-white flex items-center gap-2 mb-2 transition-colors"
          >
            <ChevronLeft size={16} /> Volver al Dashboard
          </button>
          <h2 className="text-2xl font-bold text-white tracking-tight">Módulo Contable</h2>
          <p className="text-gray-400 text-sm mt-1">Asigna las cuentas a proveedores nuevos y exporta tus pólizas a CONTPAQi.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 bg-gray-950 p-4 rounded-lg border border-gray-800">
          <select className="bg-gray-800 text-white rounded p-2 text-sm border border-gray-700" value={anio} onChange={e=>setAnio(e.target.value)}>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
          <select className="bg-gray-800 text-white rounded p-2 text-sm border border-gray-700" value={mes} onChange={e=>setMes(e.target.value)}>
            {Array.from({length: 12}, (_, i) => String(i+1).padStart(2,'0')).map(m => (
              <option key={m} value={m}>Mes {m}</option>
            ))}
          </select>
          <select className="bg-gray-800 text-white rounded p-2 text-sm border border-gray-700" value={dia} onChange={e=>setDia(e.target.value)}>
            <option value="Todos">Día: Todos</option>
            {Array.from({length: 31}, (_, i) => String(i+1).padStart(2,'0')).map(d => (
              <option key={d} value={d}>Día {d}</option>
            ))}
          </select>
          <button onClick={handleExportar} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg font-medium shadow-lg transition-colors text-sm" title="Provisión de Facturas">
            <DownloadCloud size={16} /> Pólizas Diario
          </button>
          <button onClick={handleExportarEgresos} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg font-medium shadow-lg transition-colors text-sm" title="Pagos Conciliados">
            <DownloadCloud size={16} /> Pólizas Egreso
          </button>
          <button onClick={handleExportarDIOT} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-3 py-2 rounded-lg font-medium shadow-lg transition-colors text-sm" title="Bases e IVA para declaración">
            <FileSpreadsheet size={16} /> Reporte DIOT
          </button>
          <button 
            onClick={cargarDatos}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm ml-2"
          >
            <RefreshCw size={16} className={cargando ? 'animate-spin' : ''} />
            Refrescar
          </button>
        </div>
      </div>

      {/* Notificaciones flotantes */}
      {notificacion && (
        <div className={`p-4 rounded-lg flex items-center gap-3 border ${
          notificacion.tipo === 'exito' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {notificacion.tipo === 'exito' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium text-sm">{notificacion.texto}</span>
        </div>
      )}

      {/* Tabla de Proveedores */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-800 bg-gray-950/50">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">⚠️ Proveedores Huérfanos Pendientes de Mapeo</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-950/50 border-b border-gray-800 text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Proveedor / RFC</th>
                <th className="px-6 py-4 font-medium">Cuenta de Gasto (Cargo)</th>
                <th className="px-6 py-4 font-medium">Cuenta de Pasivo (Abono)</th>
                <th className="px-6 py-4 font-medium">IVA por Acreditar</th>
                <th className="px-6 py-4 font-medium text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {cargando ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <RefreshCw size={24} className="animate-spin mx-auto mb-2 opacity-50" />
                    Cargando catálogo y proveedores...
                  </td>
                </tr>
              ) : proveedores.length > 0 ? (
                proveedores.map((prov) => (
                  <tr key={prov.rfc_emisor} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-200">{prov.nombre}</div>
                      <div className="text-xs font-mono text-gray-500 mt-0.5">{prov.rfc_emisor}</div>
                    </td>
                    
                    {/* Select Gasto */}
                    <td className="px-6 py-4">
                      <select 
                        className="w-full bg-gray-950 border border-gray-700 text-gray-300 text-sm rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2"
                        onChange={(e) => handleSelectChange(prov.rfc_emisor, 'cuenta_gasto_id', e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>Selecciona gasto...</option>
                        {ctasGasto.map(c => <option key={c.id} value={c.id}>{c.codigo_cuenta} - {c.nombre_cuenta}</option>)}
                      </select>
                    </td>

                    {/* Select Pasivo */}
                    <td className="px-6 py-4">
                      <select 
                        className="w-full bg-gray-950 border border-gray-700 text-gray-300 text-sm rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2"
                        onChange={(e) => handleSelectChange(prov.rfc_emisor, 'cuenta_pasivo_id', e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>Selecciona pasivo...</option>
                        {ctasPasivo.map(c => <option key={c.id} value={c.id}>{c.codigo_cuenta} - {c.nombre_cuenta}</option>)}
                      </select>
                    </td>

                    {/* Select IVA */}
                    <td className="px-6 py-4">
                      <select 
                        className="w-full bg-gray-950 border border-gray-700 text-gray-300 text-sm rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2"
                        onChange={(e) => handleSelectChange(prov.rfc_emisor, 'cuenta_iva_id', e.target.value)}
                        defaultValue=""
                      >
                        <option value="">Ninguno / Exento</option>
                        {ctasActivo.map(c => <option key={c.id} value={c.id}>{c.codigo_cuenta} - {c.nombre_cuenta}</option>)}
                      </select>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleGuardar(prov.rfc_emisor)}
                        className="inline-flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                      >
                        <Save size={16} /> Guardar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-emerald-500/70 bg-emerald-500/5">
                    <CheckCircle2 size={32} className="mx-auto mb-3 opacity-80" />
                    <p className="text-emerald-400 font-medium">¡Todo al día!</p>
                    <p className="text-sm mt-1">Todos los proveedores actuales ya tienen asignadas sus cuentas contables.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}