import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, Building2, CreditCard, Clock, AlertTriangle, FileWarning, X, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Pagos = ({ facturas = [] }) => {
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const itemsPorPagina = 20;

  // Aggregate invoices by supplier (proveedor)
  const proveedoresAgrupados = useMemo(() => {
    const grupos = {};
    
    facturas.forEach(f => {
      // Ignore complements and notes for debt aggregation? We'll include them if they have valid amounts or focus on income/expense.
      // Usually, 'P' (Complementos) don't have total that adds to debt, their total is 0 or ignored.
      // We assume standard logic: facturas are those we owe or paid.
      const tipo = f.tipo_comprobante?.toUpperCase();
      if (tipo === 'P' || tipo === 'E') return;

      const rfc = f.rfc;
      if (!rfc) return;

      if (!grupos[rfc]) {
        grupos[rfc] = {
          rfc,
          nombre: f.proveedor || 'Sin Nombre',
          deudaTotal: 0,
          totalPagado: 0,
          facturasPendientes: 0,
          facturasPagadas: 0,
          fechasPendientes: [],
          listaFacturasPendientes: []
        };
      }

      const total = Number(f.total) || 0;

      if (f.estatus === 'pendiente') {
        grupos[rfc].deudaTotal += total;
        grupos[rfc].facturasPendientes += 1;
        grupos[rfc].listaFacturasPendientes.push(f);
        if (f.fecha_emision) {
          grupos[rfc].fechasPendientes.push(new Date(f.fecha_emision));
        }
      } else if (f.estatus === 'pagado') {
        grupos[rfc].totalPagado += total;
        grupos[rfc].facturasPagadas += 1;
      }
    });

    return Object.values(grupos)
      .map(p => {
        // Calculate oldest pending invoice
        let antiguedadDias = 0;
        let fechaMasAntigua = null;
        if (p.fechasPendientes.length > 0) {
          fechaMasAntigua = new Date(Math.min(...p.fechasPendientes.map(d => d.getTime())));
          const hoy = new Date();
          const diffTime = Math.abs(hoy - fechaMasAntigua);
          antiguedadDias = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        }
        return { ...p, antiguedadDias, fechaMasAntigua };
      })
      .sort((a, b) => b.deudaTotal - a.deudaTotal); // Sort by highest debt first
  }, [facturas]);

  // Global KPIs
  const totalAdeudadoGlobal = proveedoresAgrupados.reduce((acc, p) => acc + p.deudaTotal, 0);
  const totalPagadoGlobal = proveedoresAgrupados.reduce((acc, p) => acc + p.totalPagado, 0);
  const proveedoresConDeuda = proveedoresAgrupados.filter(p => p.deudaTotal > 0).length;

  // Filter by search
  const proveedoresFiltrados = proveedoresAgrupados.filter(p => {
    const term = busqueda.toLowerCase();
    return p.nombre.toLowerCase().includes(term) || p.rfc.toLowerCase().includes(term);
  });

  // Pagination
  const totalPaginas = Math.ceil(proveedoresFiltrados.length / itemsPorPagina);
  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  const proveedoresPaginados = proveedoresFiltrados.slice(indicePrimerItem, indiceUltimoItem);

  const formatearMoneda = (monto) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(monto);
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '-';
    return fecha.toLocaleDateString('es-MX');
  };

  const generarPDF = (proveedor) => {
    const doc = new jsPDF();
    const facturas = [...proveedor.listaFacturasPendientes].sort((a,b) => new Date(a.fecha_emision) - new Date(b.fecha_emision));

    doc.setFontSize(20);
    doc.text('ESTADO DE CUENTA', 14, 22);
    
    doc.setFontSize(11);
    doc.text(`Proveedor: ${proveedor.nombre}`, 14, 32);
    doc.text(`RFC: ${proveedor.rfc}`, 14, 38);
    doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString('es-MX')}`, 14, 44);
    doc.text(`Deuda Total Pendiente: ${formatearMoneda(proveedor.deudaTotal)}`, 14, 50);

    const tableColumn = ["Fecha", "Folio / Serie", "UUID", "Monto"];
    const tableRows = facturas.map(f => [
      f.fecha_emision ? new Date(f.fecha_emision).toLocaleDateString('es-MX') : '-',
      f.folio_interno || '-',
      f.uuid ? f.uuid.substring(0,8) + '...' : '-',
      formatearMoneda(Number(f.total) || 0)
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 56,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 9 }
    });

    doc.save(`Estado_de_Cuenta_${proveedor.rfc}.pdf`);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Adeudado General</p>
            <p className="text-2xl font-bold text-white mt-1">{formatearMoneda(totalAdeudadoGlobal)}</p>
          </div>
          <div className="bg-orange-500/10 p-3 rounded-lg text-orange-500">
            <AlertTriangle size={24} />
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Pagado General</p>
            <p className="text-2xl font-bold text-white mt-1">{formatearMoneda(totalPagadoGlobal)}</p>
          </div>
          <div className="bg-emerald-500/10 p-3 rounded-lg text-emerald-500">
            <CreditCard size={24} />
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Proveedores con Deuda</p>
            <p className="text-2xl font-bold text-white mt-1">{proveedoresConDeuda}</p>
          </div>
          <div className="bg-blue-500/10 p-3 rounded-lg text-blue-500">
            <Building2 size={24} />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Buscar por proveedor o RFC..."
            className="block w-full pl-10 pr-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
          />
        </div>
        
        <button 
          onClick={() => window.location.hash = 'reps-huerfanos'}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-600/20 rounded-lg transition-colors text-sm font-medium w-full sm:w-auto justify-center"
        >
          <FileWarning size={18} />
          Auditoría de REPs
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-950/50 text-gray-400 text-xs uppercase border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Proveedor</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Deuda Actual</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Total Pagado</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Docs (Pend / Pag)</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Antigüedad Mayor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {proveedoresPaginados.map((prov) => (
                <tr key={prov.rfc} className="hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => setProveedorSeleccionado(prov)}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{prov.nombre}</div>
                    <div className="text-xs text-gray-500 mt-1">{prov.rfc}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-medium ${prov.deudaTotal > 0 ? 'text-orange-400' : 'text-gray-500'}`}>
                      {formatearMoneda(prov.deudaTotal)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-emerald-400 font-medium">
                      {formatearMoneda(prov.totalPagado)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-xs" title="Facturas pendientes">{prov.facturasPendientes}</span>
                      <span className="text-gray-600">/</span>
                      <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-xs" title="Facturas pagadas">{prov.facturasPagadas}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {prov.facturasPendientes > 0 ? (
                      <div className="flex flex-col items-center justify-center">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded border ${
                          prov.antiguedadDias > 60 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                          prov.antiguedadDias > 30 ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                          'bg-gray-800 text-gray-300 border-gray-700'
                        }`}>
                          <Clock size={12} />
                          {prov.antiguedadDias} días
                        </span>
                        <span className="text-[10px] text-gray-500 mt-1">{formatearFecha(prov.fechaMasAntigua)}</span>
                      </div>
                    ) : (
                      <span className="text-gray-600">-</span>
                    )}
                  </td>
                </tr>
              ))}
              
              {proveedoresPaginados.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No se encontraron proveedores que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-gray-900">
            <span className="text-sm text-gray-400">
              Mostrando <span className="text-white font-medium">{indicePrimerItem + 1}</span> a <span className="text-white font-medium">{Math.min(indiceUltimoItem, proveedoresFiltrados.length)}</span> de <span className="text-white font-medium">{proveedoresFiltrados.length}</span> proveedores
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
                disabled={paginaActual === 1}
                className="p-1.5 rounded bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
                disabled={paginaActual === totalPaginas}
                className="p-1.5 rounded bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Detalle de Proveedor */}
      {proveedorSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-in fade-in">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-950/50">
              <div>
                <h2 className="text-xl font-bold text-white">{proveedorSeleccionado.nombre}</h2>
                <p className="text-gray-400 text-sm mt-1">RFC: {proveedorSeleccionado.rfc}</p>
              </div>
              <button 
                onClick={() => setProveedorSeleccionado(null)}
                className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-950/50 p-4 rounded-xl border border-gray-800">
                  <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">Deuda Total</p>
                  <p className="text-2xl font-bold text-orange-400">{formatearMoneda(proveedorSeleccionado.deudaTotal)}</p>
                </div>
                <div className="bg-gray-950/50 p-4 rounded-xl border border-gray-800">
                  <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">Facturas Vencidas / Pendientes</p>
                  <p className="text-2xl font-bold text-white">{proveedorSeleccionado.facturasPendientes}</p>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-white font-medium text-lg">Listado de Facturas Pendientes</h3>
                <button 
                  onClick={() => generarPDF(proveedorSeleccionado)}
                  disabled={proveedorSeleccionado.listaFacturasPendientes.length === 0}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Download size={16} />
                  Descargar Estado de Cuenta
                </button>
              </div>

              {proveedorSeleccionado.listaFacturasPendientes.length > 0 ? (
                <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-950/30">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase border-b border-gray-800">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Fecha Emisión</th>
                        <th className="px-4 py-3 font-semibold">Folio</th>
                        <th className="px-4 py-3 font-semibold">UUID</th>
                        <th className="px-4 py-3 font-semibold text-right">Monto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {[...proveedorSeleccionado.listaFacturasPendientes]
                        .sort((a,b) => new Date(a.fecha_emision) - new Date(b.fecha_emision))
                        .map((f, i) => {
                          const fecha = f.fecha_emision ? new Date(f.fecha_emision) : null;
                          const diffTime = fecha ? Math.abs(new Date() - fecha) : 0;
                          const dias = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                          
                          return (
                            <tr key={f.uuid || i} className="hover:bg-gray-800/30">
                              <td className="px-4 py-3 text-gray-300">
                                {formatearFecha(fecha)}
                                {dias > 30 && (
                                  <span className="ml-2 text-[10px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20">
                                    {dias}d
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-gray-300">{f.folio_interno || '-'}</td>
                              <td className="px-4 py-3 text-gray-500 text-xs font-mono">{f.uuid ? f.uuid.substring(0,8) + '...' : '-'}</td>
                              <td className="px-4 py-3 text-right font-medium text-white">{formatearMoneda(Number(f.total) || 0)}</td>
                            </tr>
                          );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 border border-gray-800 rounded-xl bg-gray-950/30">
                  No hay facturas pendientes para este proveedor.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Pagos;
