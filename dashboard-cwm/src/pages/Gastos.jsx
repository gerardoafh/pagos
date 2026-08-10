import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, FileSpreadsheet, Upload, FolderOpen, CheckCircle2, X, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { API_BASE } from '../api.js';
import { useEmpresa } from '../context/EmpresaContext.jsx';
import VisorFactura from '../components/VisorFactura.jsx';

const Gastos = () => {
  const { currentEmpresa } = useEmpresa();
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [filtroAnio, setFiltroAnio] = useState('todos');
  const [filtroMes, setFiltroMes] = useState('todos');
  const [visorUuid, setVisorUuid] = useState(null);
  const [conceptoTendencia, setConceptoTendencia] = useState(null);

  const fetchGastos = async () => {
    if (!currentEmpresa) return;
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`${API_BASE}/api/gastos?rfc_receptor=${currentEmpresa.rfc}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Error al obtener el reporte de gastos');
      const data = await response.json();
      setGastos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentEmpresa) {
      fetchGastos();
    }
  }, [currentEmpresa]);

  const abrirEnExplorador = async (ruta) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/api/abrir-expediente`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ruta })
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`❌ ${errorData.error || 'No se pudo abrir la carpeta.'}`);
      }
    } catch (error) {
      alert('⚠️ No se pudo contactar al servidor para abrir la carpeta.');
    }
  };

  const handleSubirAprobacion = async (event, uuid) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('documento', file);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/subir-aprobacion/${uuid}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.expediente) {
          abrirEnExplorador(data.expediente);
        }
        fetchGastos(); // Refresca la tabla en caso de que la información se haya actualizado
      } else {
        const errorData = await res.json();
        alert(`❌ Error del servidor: ${errorData.error || 'No se pudo procesar el archivo.'}`);
      }
    } catch (error) {
      alert('⚠️ Falla de conexión al intentar subir el documento.');
    }
  };

  // Reiniciar a la página 1 cuando cambian los filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, filtroAnio, filtroMes]);

  // Extraer años disponibles para el filtro
  const aniosDisponibles = [...new Set(gastos.map(g => g.fecha ? g.fecha.split('-')[0] : null).filter(Boolean))].sort((a, b) => b - a);

  // Aplicar Filtros y Búsqueda
  const gastosFiltrados = gastos.filter(gasto => {
    const fecha = gasto.fecha || '';
    const [anio, mes] = fecha.split('-');
    const coincideAnio = filtroAnio === 'todos' || anio === filtroAnio;
    const coincideMes = filtroMes === 'todos' || mes === filtroMes;
    
    const searchLower = busqueda.toLowerCase();
    const coincideBusqueda = 
      (gasto.proveedor && gasto.proveedor.toLowerCase().includes(searchLower)) ||
      (gasto.concepto && gasto.concepto.toLowerCase().includes(searchLower)) ||
      (gasto.factura && gasto.factura.toLowerCase().includes(searchLower)) ||
      (gasto.cuenta && gasto.cuenta.toLowerCase().includes(searchLower));

    return coincideAnio && coincideMes && coincideBusqueda;
  });

  // Lógica de Paginación
  const itemsPorPagina = 50;
  const totalPaginas = Math.ceil(gastosFiltrados.length / itemsPorPagina);
  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  const gastosPaginados = gastosFiltrados.slice(indicePrimerItem, indiceUltimoItem);

  // Función de Exportación a Excel (CSV)
  const exportarExcel = () => {
    if (gastosFiltrados.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    const headers = [
      'Fecha', 'Factura', 'Moneda', 'Proveedor', 'Concepto', 'Subtotal', 'IVA', 
      'Ret. IVA', 'IEPS Trasladado', 'Ret. ISR', 'Local Trasladado', 'Total', 
      'Aprobación', 'Observaciones', 'TC', 'Área', 'Centro Beneficio', 'Planta', 
      'UUID', 'RFC', 'Cuenta Gasto', 'Importe Gasto', 'Cuenta IVA', 
      'Cuenta Complementaria', 'Clasif'
    ];

    const rows = gastosFiltrados.map(g => [
      `"${g.fecha || ''}"`,
      `"${g.factura || ''}"`,
      `"${g.moneda || ''}"`,
      `"${(g.proveedor || '').replace(/"/g, '""')}"`,
      `"${(g.concepto || '').replace(/"/g, '""')}"`,
      g.subtotal || 0,
      g.iva || 0,
      g.ret_iva || 0,
      g.ieps_trasladado || 0,
      g.ret_isr || 0,
      g.local_trasladado || 0,
      g.total || 0,
      `"${g.aprobacion || ''}"`,
      `"${(g.observaciones || '').replace(/"/g, '""')}"`,
      g.tc || 1,
      `"${g.area || ''}"`,
      `"${g.centro_beneficio || ''}"`,
      `"${g.planta || ''}"`,
      `"${g.uuid || ''}"`,
      `"${g.rfc || ''}"`,
      `"${g.cuenta || ''}"`,
      g.importe || 0,
      `"${g.cuenta_iva || ''}"`,
      `"${g.cuenta_complementaria || ''}"`,
      `"${g.clasif || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    // Agregamos BOM (\uFEFF) para que Excel procese correctamente las tildes y las ñ
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Reporte_Gastos_${filtroAnio}_${filtroMes}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return (
    <div className="w-full max-w-[95%] mx-auto flex flex-col items-center justify-center py-32 gap-4 animate-fade-in">
      <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-400 text-sm font-medium">Cargando reporte de gastos...</p>
    </div>
  );
  if (error) return (
    <div className="w-full max-w-[95%] mx-auto py-20 animate-fade-in">
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 max-w-lg mx-auto flex items-start gap-4">
        <div className="bg-red-500/10 p-2.5 rounded-lg text-red-400 flex-shrink-0">
          <FileSpreadsheet size={20} />
        </div>
        <div>
          <p className="text-red-400 font-semibold mb-1">Error al cargar</p>
          <p className="text-red-300/70 text-sm">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[95%] mx-auto h-full text-gray-200 pb-10">
      
      {/* Cabecera Mejorada */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">Reporte de Gastos</h1>
        <p className="mt-2 text-sm text-gray-400">Consulta, filtra y exporta la analítica de gastos y cuentas contables con un diseño moderno.</p>
      </div>

      {/* BARRA DE CONTROLES: Búsqueda, Filtros y Exportación */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-gray-900 ring-1 ring-white/10 p-4 rounded-2xl mb-6 shadow-lg">
        <div className="relative w-full lg:w-96">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </div>
          <input 
            type="text" 
            placeholder="Buscar por concepto, proveedor, factura o cuenta..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="block w-full rounded-xl border-0 bg-white/5 py-2.5 pl-10 pr-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-all hover:bg-white/10"
          />
        </div>
        
        <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center justify-start lg:justify-end">
          <select
            value={filtroAnio}
            onChange={(e) => setFiltroAnio(e.target.value)}
            className="block w-full sm:w-auto rounded-xl border-0 bg-white/5 py-2.5 pl-3 pr-8 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-all hover:bg-white/10 cursor-pointer appearance-none [&>option]:bg-gray-900"
          >
            <option value="todos">Todos los años</option>
            {aniosDisponibles.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <select
            value={filtroMes}
            onChange={(e) => setFiltroMes(e.target.value)}
            className="block w-full sm:w-auto rounded-xl border-0 bg-white/5 py-2.5 pl-3 pr-8 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-all hover:bg-white/10 cursor-pointer appearance-none [&>option]:bg-gray-900"
          >
            <option value="todos">Todos los meses</option>
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>

          <button 
            onClick={exportarExcel}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all"
            title="Exportar la vista actual a Excel (CSV)"
          >
            <FileSpreadsheet size={18} />
            Exportar
          </button>
        </div>
      </div>
      
      <div className="bg-gray-900 ring-1 ring-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden">
        <div className="overflow-x-auto max-h-[65vh] 2xl:max-h-[70vh]">
          <table className="min-w-max w-full table-auto text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-800/80 backdrop-blur-md sticky top-0 z-10 ring-1 ring-white/5">
            <tr>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Fecha</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Factura</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Moneda</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Proveedor</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white min-w-[200px]">Concepto</th>
              <th scope="col" className="py-3.5 px-4 text-right text-sm font-semibold text-white">Subtotal</th>
              <th scope="col" className="py-3.5 px-4 text-right text-sm font-semibold text-white">IVA</th>
              <th scope="col" className="py-3.5 px-4 text-right text-sm font-semibold text-white">Ret. IVA</th>
              <th scope="col" className="py-3.5 px-4 text-right text-sm font-semibold text-white">IEPS Trasladado</th>
              <th scope="col" className="py-3.5 px-4 text-right text-sm font-semibold text-white">Ret. ISR</th>
              <th scope="col" className="py-3.5 px-4 text-right text-sm font-semibold text-white">Local Trasladado</th>
              <th scope="col" className="py-3.5 px-4 text-right text-sm font-bold text-emerald-400">Total</th>
              <th scope="col" className="py-3.5 px-4 text-center text-sm font-semibold text-white">Aprobación</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Observaciones</th>
              <th scope="col" className="py-3.5 px-4 text-center text-sm font-semibold text-white">TC</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Área</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Centro Beneficio</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Planta</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">UUID</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">RFC</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Cuenta Gasto</th>
              <th scope="col" className="py-3.5 px-4 text-right text-sm font-semibold text-white">Importe Gasto</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Cuenta IVA</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Cuenta Complementaria</th>
              <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">Clasif</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {gastosPaginados.map((gasto, index) => (
              <tr key={index} className="hover:bg-white/[0.04] transition-colors group">
                <td className="py-4 px-4 text-gray-400">{gasto.fecha}</td>
                <td className="py-4 px-4">
                  <button 
                    onClick={() => setVisorUuid(gasto.uuid)}
                    className="font-medium text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                    title="Ver detalle del XML/PDF"
                  >
                    {gasto.factura}
                  </button>
                </td>
                <td className="py-4 px-4 text-gray-300">{gasto.moneda}</td>
                <td className="py-4 px-4 font-medium text-gray-200">{gasto.proveedor}</td>
                <td className="py-4 px-4 truncate max-w-[250px]">
                  <button
                    onClick={() => setConceptoTendencia(gasto.concepto)}
                    className="text-gray-300 hover:text-indigo-400 transition-colors text-left w-full flex items-center gap-1.5 group"
                    title={`Ver tendencia: ${gasto.concepto}`}
                  >
                    <TrendingUp size={12} className="opacity-0 group-hover:opacity-100 text-indigo-400 shrink-0 transition-opacity" />
                    <span className="truncate group-hover:underline">{gasto.concepto}</span>
                  </button>
                </td>
                <td className="py-4 px-4 text-right text-gray-400">${gasto.subtotal}</td>
                <td className="py-4 px-4 text-right text-gray-400">${gasto.iva}</td>
                <td className="py-4 px-4 text-right text-gray-400">${gasto.ret_iva}</td>
                <td className="py-4 px-4 text-right text-gray-400">${gasto.ieps_trasladado}</td>
                <td className="py-4 px-4 text-right text-gray-400">${gasto.ret_isr}</td>
                <td className="py-4 px-4 text-right text-gray-400">${gasto.local_trasladado}</td>
                <td className="py-4 px-4 text-right font-semibold text-emerald-400">${gasto.total}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {gasto.aprobacion === 'Aprobado' ? (
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 shadow-sm">
                        Aprobado
                        <CheckCircle2 size={12} className="ml-0.5" />
                      </span>
                    ) : (
                      <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20 shadow-sm hover:bg-yellow-400/20 transition-colors" title="Buscar archivo en tu computadora para subirlo">
                        {gasto.aprobacion}
                        <Upload size={12} className="ml-0.5" />
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => handleSubirAprobacion(e, gasto.uuid)} 
                        />
                      </label>
                    )}
                    {gasto.expediente ? (
                      <button 
                        onClick={() => abrirEnExplorador(gasto.expediente)}
                        className="text-gray-400 hover:text-blue-400 transition-colors p-1 rounded-md hover:bg-blue-400/10"
                        title={`Abrir carpeta: ${gasto.expediente}`}
                      >
                        <FolderOpen size={16} />
                      </button>
                    ) : (
                      <span className="text-gray-600 p-1" title="Carpeta aún no generada">
                        <FolderOpen size={16} opacity={0.5} />
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-400">{gasto.observaciones}</td>
                <td className="py-4 px-4 text-center text-gray-400">{gasto.tc || 1}</td>
                <td className="py-4 px-4 text-gray-400">{gasto.area}</td>
                <td className="py-4 px-4 text-gray-400">{gasto.centro_beneficio}</td>
                <td className="py-4 px-4 text-gray-400">{gasto.planta}</td>
                <td className="py-4 px-4 text-xs font-mono text-gray-500">{gasto.uuid}</td>
                <td className="py-4 px-4 text-gray-400">{gasto.rfc}</td>
                <td className="py-4 px-4 text-indigo-400 font-medium">{gasto.cuenta}</td>
                <td className="py-4 px-4 text-right text-gray-400">${gasto.importe}</td>
                <td className="py-4 px-4 text-indigo-400">{gasto.cuenta_iva}</td>
                <td className="py-4 px-4 text-gray-400">{gasto.cuenta_complementaria}</td>
                <td className="py-4 px-4 text-gray-400">{gasto.clasif}</td>
              </tr>
            ))}
            {gastosFiltrados.length === 0 && (
              <tr>
                <td colSpan="25" className="py-12 text-center text-gray-500 text-sm">
                  No se encontraron gastos con los filtros actuales.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        
        {/* Controles de Paginación */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-gray-900/50">
          <span className="text-sm text-gray-400">
            Mostrando <span className="text-white font-semibold">{gastosFiltrados.length > 0 ? indicePrimerItem + 1 : 0}</span> a <span className="text-white font-semibold">{Math.min(indiceUltimoItem, gastosFiltrados.length)}</span> de <span className="text-white font-semibold">{gastosFiltrados.length}</span> resultados
          </span>
          
          {totalPaginas > 1 && (
            <div className="flex gap-2">
              <button
                onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
                disabled={paginaActual === 1}
                className="relative inline-flex items-center rounded-md bg-white/5 px-2 py-2 text-gray-400 ring-1 ring-inset ring-white/10 hover:bg-white/10 hover:text-white focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
                disabled={paginaActual === totalPaginas}
                className="relative inline-flex items-center rounded-md bg-white/5 px-2 py-2 text-gray-400 ring-1 ring-inset ring-white/10 hover:bg-white/10 hover:text-white focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {visorUuid && (
        <VisorFactura 
          uuid={visorUuid} 
          token={localStorage.getItem('token')} 
          onClose={() => setVisorUuid(null)} 
        />
      )}

      {/* Modal Tendencia de Concepto */}
      {conceptoTendencia && (() => {
        const registros = gastos.filter(g => g.concepto === conceptoTendencia);
        const porMes = registros.reduce((acc, g) => {
          const mes = g.fecha?.substring(0, 7);
          if (!mes) return acc;
          const ex = acc.find(a => a.mes === mes);
          if (ex) { ex.total += parseFloat(g.total || 0); ex.compras++; }
          else acc.push({ mes, total: parseFloat(g.total || 0), compras: 1 });
          return acc;
        }, []).sort((a, b) => a.mes.localeCompare(b.mes));

        const totalAcum   = registros.reduce((a, g) => a + parseFloat(g.total || 0), 0);
        const promedio    = registros.length > 0 ? totalAcum / registros.length : 0;
        const fmt = (n) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setConceptoTendencia(null)}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div
              className="relative w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-gray-800">
                <div>
                  <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <TrendingUp size={12} /> Tendencia de Concepto
                  </p>
                  <h2 className="text-base font-bold text-white leading-snug max-w-xl">{conceptoTendencia}</h2>
                </div>
                <button onClick={() => setConceptoTendencia(null)} className="text-gray-500 hover:text-white transition-colors p-1 shrink-0">
                  <X size={22} />
                </button>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-3 gap-4 p-5 border-b border-gray-800">
                <div className="bg-gray-800/60 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Compras registradas</p>
                  <p className="text-2xl font-bold text-white">{registros.length}</p>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-indigo-400/70 mb-1">Total Acumulado</p>
                  <p className="text-sm font-bold text-indigo-400">{fmt(totalAcum)}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-purple-400/70 mb-1">Promedio / Compra</p>
                  <p className="text-sm font-bold text-purple-400">{fmt(promedio)}</p>
                </div>
              </div>

              {/* Gráfica */}
              <div className="p-5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Gasto mensual acumulado</p>
                {porMes.length >= 1 ? (
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={porMes} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorConceptoTend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                        <XAxis dataKey="mes" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: '10px', color: '#f9fafb', fontSize: '12px' }}
                          formatter={(v, n) => [fmt(v), n === 'total' ? 'Total' : 'Compras']}
                          labelStyle={{ color: '#9ca3af', marginBottom: 4 }}
                        />
                        <Area type="monotone" dataKey="total" name="total" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorConceptoTend)" activeDot={{ r: 5, fill: '#6366f1', stroke: '#312e81', strokeWidth: 2 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-10">Solo hay un registro — no hay suficiente historial para graficar tendencia.</p>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Gastos;