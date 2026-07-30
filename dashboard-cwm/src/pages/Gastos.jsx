import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, FileSpreadsheet, Upload, FolderOpen, CheckCircle2 } from 'lucide-react';
import { API_BASE } from '../api.js';

const Gastos = () => {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [filtroAnio, setFiltroAnio] = useState('todos');
  const [filtroMes, setFiltroMes] = useState('todos');

  const fetchGastos = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`${API_BASE}/api/gastos`, {
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
    fetchGastos();
  }, []);

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

  if (loading) return <div className="p-4">Cargando reporte de gastos...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

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
                <td className="py-4 px-4 font-medium text-gray-200">{gasto.factura}</td>
                <td className="py-4 px-4 text-gray-300">{gasto.moneda}</td>
                <td className="py-4 px-4 font-medium text-gray-200">{gasto.proveedor}</td>
                <td className="py-4 px-4 text-gray-300 truncate max-w-[250px]" title={gasto.concepto}>{gasto.concepto}</td>
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
    </div>
  );
};

export default Gastos;