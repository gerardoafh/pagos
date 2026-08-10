import React, { useState, useEffect, useMemo } from 'react';
import { Save, RefreshCw, AlertCircle, CheckCircle2, ChevronLeft, DownloadCloud, FileSpreadsheet, Eye, X, Zap, Search, ChevronRight } from 'lucide-react';
import { API_BASE } from '../api.js';
import { useEmpresa } from '../context/EmpresaContext.jsx';

// ─── Helpers de matching de nombres ─────────────────────────────────────────
function normalizarNombre(str) {
  return (str || '')
    .toUpperCase()
    .replace(/\b(S\.?A\.?\s*DE\s*C\.?V\.?|S\.?A\.?B\.?|S\.?A\.?|DE\s*C\.?V\.?|S\.?C\.?|R\.?L\.?|DE\s*R\.?L\.?)\b/g, ' ')
    .replace(/\b(Y|DE|DEL|LOS|LAS|EL|LA|EN|GRUPO|COMERCIALIZADORA|DISTRIBUIDORA|SUMINISTROS|SERVICIOS|PROVEEDOR|PROVEEDORA|INDUSTRIAS|INDUSTRIAL|CONSTRUCTORA|EMPRESA|NACIONAL|NACIONALES|MEXICANA|MEXICO)\b/g, ' ')
    .replace(/[.,\-/#()&]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function encontrarCuentaPorNombre(nombreProveedor, cuentasPasivo) {
  const normProv = normalizarNombre(nombreProveedor);
  const palabrasProv = normProv.split(' ').filter(w => w.length > 2);
  if (palabrasProv.length === 0) return null;

  let mejorMatch = null;
  let mejorScore  = 0;

  for (const cuenta of cuentasPasivo) {
    const normCuenta = normalizarNombre(cuenta.nombre_cuenta);
    const matching = palabrasProv.filter(w => normCuenta.includes(w));
    const score = matching.length / palabrasProv.length;
    if (score > mejorScore && score >= 0.5) {
      mejorScore  = score;
      mejorMatch = cuenta;
    }
  }
  return mejorMatch;
}

export default function MapeoContable({ token, onVolver }) {
  const { currentEmpresa } = useEmpresa();
  const [proveedores, setProveedores] = useState([]);
  const [cuentas, setCuentas] = useState([]);
  const [mapeos, setMapeos] = useState({});
  const [cargando, setCargando] = useState(true);
  const [notificacion, setNotificacion] = useState(null); // { texto, tipo }
  
  // Controles de Exportación
  const [dia, setDia] = useState('Todos');
  const [mes, setMes] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));
  const [anio, setAnio] = useState(new Date().getFullYear().toString());

  // Estado para previsualización
  const [mostrarModalPolizas, setMostrarModalPolizas] = useState(false);
  const [polizasJSON, setPolizasJSON] = useState([]);
  const [cargandoPolizas, setCargandoPolizas] = useState(false);

  // Cuentas por defecto para mapeo masivo
  const [defaultGastoId, setDefaultGastoId] = useState('');
  const [defaultPasivoId, setDefaultPasivoId] = useState('');
  const [defaultIvaId, setDefaultIvaId] = useState('');
  const [guardandoTodos, setGuardandoTodos] = useState(false);

  // Búsqueda y paginación
  const POR_PAGINA = 50;
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);

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
      const rfcParam = currentEmpresa ? `?rfc_receptor=${currentEmpresa.rfc}` : '';
      const resProv = await fetch(`${API_BASE}/api/contabilidad/proveedores-sin-mapeo${rfcParam}`, {
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
    if (token && currentEmpresa) cargarDatos();
  }, [token, currentEmpresa]);

  // Auto-detectar cuentas por defecto cuando carga el catálogo
  useEffect(() => {
    if (cuentas.length === 0) return;
    const gastoDefault = cuentas.find(c =>
      c.tipo_cuenta === 'gasto' && /COMPRA|COSTO|GASTO|SERVICIO/i.test(c.nombre_cuenta)
    ) || cuentas.find(c => c.tipo_cuenta === 'gasto');
    const pasivoDefault = cuentas.find(c =>
      c.tipo_cuenta === 'pasivo' && /PROVEEDOR/i.test(c.nombre_cuenta)
    ) || cuentas.find(c => c.tipo_cuenta === 'pasivo');
    const ivaDefault = cuentas.find(c =>
      c.tipo_cuenta === 'activo' && /IVA|ACREDITABLE/i.test(c.nombre_cuenta)
    );
    if (gastoDefault) setDefaultGastoId(prev => prev || String(gastoDefault.id));
    if (pasivoDefault) setDefaultPasivoId(prev => prev || String(pasivoDefault.id));
    if (ivaDefault) setDefaultIvaId(prev => prev || String(ivaDefault.id));
  }, [cuentas]);

  // Pre-llenar todos los mapeos de proveedores con defaults y matching por nombre
  useEffect(() => {
    if (proveedores.length === 0 || cuentas.length === 0) return;
    const ctasP = cuentas.filter(c => c.tipo_cuenta === 'pasivo');
    setMapeos(prev => {
      const next = { ...prev };
      proveedores.forEach(p => {
        if (next[p.rfc_emisor]) return; // ya tiene mapeo personalizado
        // 1. Intentar match por nombre en cuentas pasivo
        const cuentaMatch = encontrarCuentaPorNombre(p.nombre, ctasP);
        const pasivoId = cuentaMatch
          ? cuentaMatch.id
          : (defaultPasivoId ? parseInt(defaultPasivoId, 10) : null);
        next[p.rfc_emisor] = {
          cuenta_gasto_id : defaultGastoId ? parseInt(defaultGastoId, 10) : null,
          cuenta_pasivo_id: pasivoId,
          cuenta_iva_id   : defaultIvaId ? parseInt(defaultIvaId, 10) : null,
          _matchPasivo    : !!cuentaMatch,
          _matchNombre    : cuentaMatch?.nombre_cuenta,
        };
      });
      return next;
    });
  }, [proveedores, cuentas, defaultGastoId, defaultPasivoId, defaultIvaId]);

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

  // Guardar todos los proveedores con sus cuentas (default o personalizadas)
  const handleGuardarTodos = async () => {
    if (!defaultGastoId || !defaultPasivoId) {
      mostrarNotificacion('Selecciona Gasto y Pasivo por defecto primero.', 'error');
      return;
    }
    setGuardandoTodos(true);
    let exitosos = 0;
    for (const prov of proveedores) {
      const m = mapeos[prov.rfc_emisor] || {};
      const gastoId  = m.cuenta_gasto_id  || parseInt(defaultGastoId, 10);
      const pasivoId = m.cuenta_pasivo_id || parseInt(defaultPasivoId, 10);
      const ivaId    = m.cuenta_iva_id    || (defaultIvaId ? parseInt(defaultIvaId, 10) : null);
      try {
        const res = await fetch(`${API_BASE}/api/contabilidad/mapear-proveedor`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ rfc_emisor: prov.rfc_emisor, cuenta_gasto_id: gastoId, cuenta_pasivo_id: pasivoId, cuenta_iva_pendiente_id: ivaId })
        });
        if (res.ok) exitosos++;
      } catch {}
    }
    mostrarNotificacion(`${exitosos} de ${proveedores.length} proveedores mapeados correctamente.`, 'exito');
    setProveedores([]);
    setGuardandoTodos(false);
  };

  const handleExportar = () => {
    if (!currentEmpresa) return;
    window.open(`${API_BASE}/api/contabilidad/exportar-contpaqi?anio=${anio}&mes=${mes}&dia=${dia}&token=${token}&rfc_receptor=${currentEmpresa.rfc}`, '_blank');
  };

  const handleExportarEgresos = () => {
    if (!currentEmpresa) return;
    window.open(`${API_BASE}/api/contabilidad/exportar-egresos?anio=${anio}&mes=${mes}&dia=${dia}&token=${token}&rfc_receptor=${currentEmpresa.rfc}`, '_blank');
  };

  const handleExportarDIOT = () => {
    if (!currentEmpresa) return;
    window.open(`${API_BASE}/api/contabilidad/exportar-diot?anio=${anio}&mes=${mes}&dia=${dia}&token=${token}&rfc_receptor=${currentEmpresa.rfc}`, '_blank');
  };

  const handlePrevisualizarPolizas = async () => {
    if (!currentEmpresa) return;
    setCargandoPolizas(true);
    setMostrarModalPolizas(true);
    try {
      const res = await fetch(`${API_BASE}/api/contabilidad/polizas.json?anio=${anio}&mes=${mes}&dia=${dia}&rfc_receptor=${currentEmpresa.rfc}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // La API devuelve { success: true, polizas: [...] } 
        setPolizasJSON(Array.isArray(data) ? data : (data.polizas || []));
      } else {
        mostrarNotificacion('Error al obtener pólizas', 'error');
        setMostrarModalPolizas(false);
      }
    } catch (err) {
      mostrarNotificacion('Error de conexión', 'error');
      setMostrarModalPolizas(false);
    } finally {
      setCargandoPolizas(false);
    }
  };

  // Filtrar cuentas por tipo para llenar los selects
  const ctasGasto  = cuentas.filter(c => c.tipo_cuenta === 'gasto');
  const ctasPasivo = cuentas.filter(c => c.tipo_cuenta === 'pasivo');
  const ctasActivo = cuentas.filter(c => c.tipo_cuenta === 'activo');

  // Proveedores filtrados por búsqueda y paginados
  const proveedoresFiltrados = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    if (!q) return proveedores;
    return proveedores.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.rfc_emisor.toLowerCase().includes(q)
    );
  }, [proveedores, busqueda]);

  const totalPaginas    = Math.max(1, Math.ceil(proveedoresFiltrados.length / POR_PAGINA));
  const paginaSegura    = Math.min(pagina, totalPaginas);
  const proveedoresPag  = proveedoresFiltrados.slice((paginaSegura - 1) * POR_PAGINA, paginaSegura * POR_PAGINA);

  if (mostrarModalPolizas) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-auto min-h-[600px]">
          <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="text-blue-400" /> Previsualización de Pólizas
            </h3>
            <button 
              onClick={() => setMostrarModalPolizas(false)} 
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              <ChevronLeft size={16} /> Volver
            </button>
          </div>
          
          <div className="p-5 flex-1 bg-gray-950">
            {cargandoPolizas ? (
              <div className="flex flex-col items-center justify-center py-20 text-blue-400">
                <RefreshCw className="animate-spin mb-4" size={32} />
                <p>Generando pólizas...</p>
              </div>
            ) : polizasJSON.length === 0 ? (
              <div className="text-center py-20 text-gray-400 bg-gray-900/50 rounded-xl border border-gray-800">
                <p>No se generaron pólizas para el filtro seleccionado.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {polizasJSON.map((poliza, idx) => (
                  <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow">
                    <div className="bg-gray-800/50 px-4 py-3 flex justify-between items-center">
                      <div>
                        <p className="text-white font-bold text-sm">Póliza {poliza.tipo || 'Diario'} #{idx + 1}</p>
                        <p className="text-gray-400 text-xs mt-1">{poliza.fecha} | {poliza.concepto}</p>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-gray-950 text-gray-400">
                          <tr>
                            <th className="px-4 py-2 font-medium w-32">Cuenta</th>
                            <th className="px-4 py-2 font-medium">Concepto Movimiento</th>
                            <th className="px-4 py-2 font-medium text-right w-32">Cargo</th>
                            <th className="px-4 py-2 font-medium text-right w-32">Abono</th>
                            <th className="px-4 py-2 font-medium w-48">Referencia</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {poliza.movimientos.map((mov, midx) => (
                            <tr key={midx} className="hover:bg-gray-800/30">
                              <td className="px-4 py-2 text-gray-300 font-mono">{mov.cuenta}</td>
                              <td className="px-4 py-2 text-gray-300 truncate max-w-xs">{mov.concepto}</td>
                              <td className="px-4 py-2 text-blue-400 text-right">{mov.tipo_movimiento === 'Cargo' ? `$${parseFloat(mov.importe).toFixed(2)}` : ''}</td>
                              <td className="px-4 py-2 text-emerald-400 text-right">{mov.tipo_movimiento === 'Abono' ? `$${parseFloat(mov.importe).toFixed(2)}` : ''}</td>
                              <td className="px-4 py-2 text-gray-500 font-mono">{mov.referencia}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Cabecera y Controles */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-900 p-6 rounded-xl border border-gray-800 gap-4">
        <div>

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
          <button onClick={handlePrevisualizarPolizas} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg font-medium shadow-lg transition-colors text-sm" title="Previsualizar Pólizas">
            <Eye size={16} /> Previsualizar
          </button>
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
        <div className="p-4 border-b border-gray-800 bg-gray-950/50 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">⚠️ Proveedores Huérfanos Pendientes de Mapeo
              <span className="text-xs text-gray-500 font-normal">
                {busqueda ? `${proveedoresFiltrados.length} de ${proveedores.length}` : proveedores.length}
              </span>
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Buscador */}
              {proveedores.length > 0 && (
                <div className="relative">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Buscar proveedor o RFC..."
                    value={busqueda}
                    onChange={e => { setBusqueda(e.target.value); setPagina(1); }}
                    className="pl-7 pr-3 py-1.5 bg-gray-800 border border-gray-600 text-gray-200 text-xs rounded-lg w-52 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}
              {proveedoresFiltrados.length > 0 && (
                <button
                  onClick={handleGuardarTodos}
                  disabled={guardandoTodos || !defaultGastoId || !defaultPasivoId}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-lg"
                >
                  {guardandoTodos ? <RefreshCw size={15} className="animate-spin" /> : <Zap size={15} />}
                  {guardandoTodos ? 'Guardando...' : `Guardar Todos (${proveedoresFiltrados.length})`}
                </button>
              )}
            </div>
          </div>

          {/* Panel de cuentas por defecto */}
          {proveedores.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700">
              <span className="text-xs text-gray-400 font-medium shrink-0">⚡ Defaults:</span>
              <select
                className="flex-1 min-w-[200px] bg-gray-800 border border-gray-600 text-gray-200 text-xs rounded-lg p-2 focus:border-emerald-500"
                value={defaultGastoId}
                onChange={e => { setDefaultGastoId(e.target.value); }}
              >
                <option value="">Gasto por defecto...</option>
                {ctasGasto.map(c => <option key={c.id} value={c.id}>{c.codigo_cuenta} – {c.nombre_cuenta}</option>)}
              </select>
              <select
                className="flex-1 min-w-[200px] bg-gray-800 border border-gray-600 text-gray-200 text-xs rounded-lg p-2 focus:border-emerald-500"
                value={defaultPasivoId}
                onChange={e => { setDefaultPasivoId(e.target.value); }}
              >
                <option value="">Pasivo por defecto...</option>
                {ctasPasivo.map(c => <option key={c.id} value={c.id}>{c.codigo_cuenta} – {c.nombre_cuenta}</option>)}
              </select>
              <select
                className="flex-1 min-w-[160px] bg-gray-800 border border-gray-600 text-gray-200 text-xs rounded-lg p-2 focus:border-emerald-500"
                value={defaultIvaId}
                onChange={e => { setDefaultIvaId(e.target.value); }}
              >
                <option value="">IVA / Ninguno</option>
                {ctasActivo.map(c => <option key={c.id} value={c.id}>{c.codigo_cuenta} – {c.nombre_cuenta}</option>)}
              </select>
            </div>
          )}
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
              ) : proveedoresFiltrados.length > 0 ? (
                proveedoresPag.map((prov) => (
                  <tr key={prov.rfc_emisor} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-200">{prov.nombre}</div>
                      <div className="text-xs font-mono text-gray-500 mt-0.5">{prov.rfc_emisor}</div>
                    </td>
                    
                    {/* Select Gasto */}
                    <td className="px-6 py-4">
                      <select
                        className="w-full bg-gray-950 border border-gray-700 text-gray-300 text-sm rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2"
                        value={mapeos[prov.rfc_emisor]?.cuenta_gasto_id || ''}
                        onChange={(e) => handleSelectChange(prov.rfc_emisor, 'cuenta_gasto_id', e.target.value)}
                      >
                        <option value="" disabled>Selecciona gasto...</option>
                        {ctasGasto.map(c => <option key={c.id} value={c.id}>{c.codigo_cuenta} - {c.nombre_cuenta}</option>)}
                      </select>
                    </td>

                    {/* Select Pasivo */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {mapeos[prov.rfc_emisor]?._matchPasivo && (
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">✓ auto</span>
                            <span className="text-[10px] text-gray-500 truncate max-w-[180px]" title={mapeos[prov.rfc_emisor]._matchNombre}>{mapeos[prov.rfc_emisor]._matchNombre}</span>
                          </div>
                        )}
                        <select
                          className="w-full bg-gray-950 border border-gray-700 text-gray-300 text-sm rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2"
                          value={mapeos[prov.rfc_emisor]?.cuenta_pasivo_id || ''}
                          onChange={(e) => handleSelectChange(prov.rfc_emisor, 'cuenta_pasivo_id', e.target.value)}
                        >
                          <option value="" disabled>Selecciona pasivo...</option>
                          {ctasPasivo.map(c => <option key={c.id} value={c.id}>{c.codigo_cuenta} - {c.nombre_cuenta}</option>)}
                        </select>
                      </div>
                    </td>

                    {/* Select IVA */}
                    <td className="px-6 py-4">
                      <select
                        className="w-full bg-gray-950 border border-gray-700 text-gray-300 text-sm rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2"
                        value={mapeos[prov.rfc_emisor]?.cuenta_iva_id || ''}
                        onChange={(e) => handleSelectChange(prov.rfc_emisor, 'cuenta_iva_id', e.target.value)}
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

        {/* Controles de paginación */}
        {!cargando && proveedoresFiltrados.length > POR_PAGINA && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-800 bg-gray-950/30">
            <span className="text-xs text-gray-500">
              Mostrando {(paginaSegura - 1) * POR_PAGINA + 1}–{Math.min(paginaSegura * POR_PAGINA, proveedoresFiltrados.length)} de {proveedoresFiltrados.length} proveedores
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagina(p => Math.max(1, p - 1))}
                disabled={paginaSegura === 1}
                className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-300 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                .filter(n => n === 1 || n === totalPaginas || Math.abs(n - paginaSegura) <= 2)
                .reduce((acc, n, idx, arr) => {
                  if (idx > 0 && n - arr[idx - 1] > 1) acc.push('...');
                  acc.push(n);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === '...' ? (
                    <span key={`e-${idx}`} className="text-gray-500 text-xs px-1">…</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setPagina(item)}
                      className={`w-7 h-7 text-xs rounded-lg font-medium transition-colors ${
                        item === paginaSegura
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      {item}
                    </button>
                  )
                )
              }
              <button
                onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                disabled={paginaSegura === totalPaginas}
                className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-300 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}