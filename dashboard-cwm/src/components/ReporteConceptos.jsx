import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft, Search, TrendingUp, TrendingDown,
  FileSpreadsheet, Package, Users, DollarSign,
  BarChart2, AlertTriangle, ArrowUpRight, ArrowDownRight,
  RefreshCw, PieChart as PieIcon, ChevronDown, Store
} from 'lucide-react';
import { API_BASE } from '../api.js';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

// ─── Constantes de diseño ──────────────────────────────────────────────────
const PALETTE = [
  '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b',
  '#ef4444', '#06b6d4', '#ec4899', '#84cc16',
  '#f97316', '#14b8a6',
];

const MESES_CORTO = ['', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                         'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const TABS = [
  { id: 'resumen',     label: 'Resumen',           Icon: BarChart2  },
  { id: 'proveedores', label: 'Proveedores',        Icon: Users      },
  { id: 'tendencias',  label: 'Tendencias de Precio', Icon: TrendingUp },
  { id: 'categorias',  label: 'Categorías SAT',    Icon: PieIcon    },
];

// ─── Helpers ───────────────────────────────────────────────────────────────
const fmt   = n  => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n || 0);
const pct   = n  => `${(n || 0).toFixed(1)}%`;
const short = s  => s?.length > 30 ? s.slice(0, 30) + '…' : (s || '');

// ─── Tooltips ──────────────────────────────────────────────────────────────
const DarkTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', minWidth: 140 }}>
      {label && <p style={{ color: '#94a3b8', fontSize: 11, marginBottom: 6 }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || '#e2e8f0', margin: '2px 0', fontSize: 13 }}>
          <span style={{ color: '#94a3b8', fontSize: 11 }}>{p.name}: </span>
          {formatter ? formatter(p.value, p.name) : fmt(p.value)}
        </p>
      ))}
    </div>
  );
};

const ProvTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', maxWidth: 260 }}>
      <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 12, marginBottom: 4, wordBreak: 'break-word' }}>{d.nombre_emisor}</p>
      <p style={{ color: '#3b82f6', fontSize: 13 }}>Total: {fmt(d.total)}</p>
      <p style={{ color: '#94a3b8', fontSize: 12 }}>{d.num_facturas} facturas · {pct(d.pct_total)} del total</p>
    </div>
  );
};

const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.04) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {pct(percent * 100)}
    </text>
  );
};

// ─── Componente principal ──────────────────────────────────────────────────
export default function InteligenciaCompras({ token, onVolver }) {
  const [tab,    setTab]    = useState('resumen');
  const [anio,   setAnio]   = useState(new Date().getFullYear().toString());
  const [mes,    setMes]    = useState('todos');

  const [resumen,      setResumen]      = useState(null);
  const [porMes,       setPorMes]       = useState([]);
  const [porProveedor, setPorProveedor] = useState([]);
  const [porClave,     setPorClave]     = useState([]);
  
  // Estados para Tendencias
  const [sugerencias,  setSugerencias]  = useState([]);
  const [alertasPrecio, setAlertasPrecio] = useState({ subidas: [], bajadas: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Estado para Detalle de Proveedor
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [detalleProveedor, setDetalleProveedor] = useState([]);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  const [cargando,     setCargando]     = useState(false);

  // Buscador
  const [query,          setQuery]          = useState('');
  const [resultados,     setResultados]     = useState([]);
  const [buscando,       setBuscando]       = useState(false);
  const [facturaDetalle, setFacturaDetalle] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Fetch de datos globales ─────────────────────────────────────────────
  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const p = `anio=${anio}${mes !== 'todos' ? `&mes=${mes}` : ''}`;
      const [r1, r2, r3, r4, r5, r6] = await Promise.all([
        fetch(`${API_BASE}/api/compras/resumen?${p}`,       { headers }),
        fetch(`${API_BASE}/api/compras/por-mes?anio=${anio}`, { headers }),
        fetch(`${API_BASE}/api/compras/por-proveedor?${p}`, { headers }),
        fetch(`${API_BASE}/api/compras/por-clave-sat?${p}`, { headers }),
        fetch(`${API_BASE}/api/compras/sugerencias?anio=${anio}`, { headers }),
        fetch(`${API_BASE}/api/compras/alertas-precio?anio=${anio}`, { headers }),
      ]);
      const [d1, d2, d3, d4, d5, d6] = await Promise.all([r1.json(), r2.json(), r3.json(), r4.json(), r5.json(), r6.json()]);
      
      setResumen(d1);
      setPorMes(d2.map(m => ({ ...m, mes: MESES_CORTO[parseInt(m.mes)] || m.mes })));
      setPorProveedor(d3);
      setPorClave(d4);
      setSugerencias(Array.isArray(d5) ? d5 : []);
      setAlertasPrecio(d6 || { subidas: [], bajadas: [] });
    } catch (e) {
      console.error('Error cargando Inteligencia de Compras:', e);
    } finally {
      setCargando(false);
    }
  }, [anio, mes, token]);

  useEffect(() => { cargar(); }, [cargar]);

  // Si se cambia de mes/año y hay un proveedor seleccionado, recargarlo
  useEffect(() => {
    if (proveedorSeleccionado) {
      cargarDetalleProveedor(proveedorSeleccionado);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anio, mes]);

  // ── Fetch Detalle Proveedor ─────────────────────────────────────────────
  const cargarDetalleProveedor = async (nombre) => {
    setProveedorSeleccionado(nombre);
    setCargandoDetalle(true);
    try {
      const p = `anio=${anio}${mes !== 'todos' ? `&mes=${mes}` : ''}&proveedor=${encodeURIComponent(nombre)}`;
      const res = await fetch(`${API_BASE}/api/compras/proveedor-detalle?${p}`, { headers });
      setDetalleProveedor(await res.json());
    } catch (e) {
      console.error('Error cargando detalle de proveedor:', e);
    } finally {
      setCargandoDetalle(false);
    }
  };

  // ── Buscar tendencias de precio ─────────────────────────────────────────
  const buscar = async (termToSearch = query) => {
    if (!termToSearch.trim()) return;
    setBuscando(true);
    setShowDropdown(false);
    setQuery(termToSearch);
    try {
      const r = await fetch(`${API_BASE}/api/conceptos/buscar?q=${encodeURIComponent(termToSearch)}`, { headers });
      setResultados(await r.json());
    } catch (err) {
      console.error('Error buscando:', err);
    } finally {
      setBuscando(false);
    }
  };

  const verTendenciaProducto = (descripcion) => {
    setProveedorSeleccionado(null);
    setTab('tendencias');
    buscar(descripcion);
  };

  const sugerenciasFiltradas = sugerencias.filter(s => 
    s.descripcion?.toLowerCase().includes(query.toLowerCase()) || 
    s.proveedor?.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  const chartTend = resultados.reduce((acc, r) => {
    if (!acc.find(x => x.fecha === r.fecha_emision && x.proveedor === r.proveedor)) {
      acc.push({ fecha: r.fecha_emision, precio: parseFloat(r.valor_unitario), proveedor: r.proveedor, raw: r });
    }
    return acc;
  }, []);

  const preciosArr = chartTend.map(d => d.precio);
  const precioMin  = preciosArr.length ? Math.min(...preciosArr) : 0;
  const precioMax  = preciosArr.length ? Math.max(...preciosArr) : 0;
  const precioAvg  = preciosArr.length ? preciosArr.reduce((s, v) => s + v, 0) / preciosArr.length : 0;
  const variacion  = preciosArr.length > 1
    ? ((preciosArr[preciosArr.length - 1] - preciosArr[0]) / preciosArr[0]) * 100 : 0;

  const acumulado = porMes.reduce((acc, m, i) => {
    const prev = i > 0 ? acc[i - 1].acumulado : 0;
    acc.push({ mes: m.mes, acumulado: prev + m.total });
    return acc;
  }, []);

  const totalGeneral = porProveedor.reduce((s, p) => s + p.total, 0);

  // ────────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto space-y-5 pb-10">

      {/* ── Cabecera Global ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-900 p-5 rounded-xl border border-gray-800">
        <div>
          <button onClick={onVolver} className="text-gray-400 hover:text-white flex items-center gap-2 mb-2 transition-colors text-sm">
            <ChevronLeft size={16} /> Volver al Dashboard
          </button>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-blue-400" size={24} />
            Módulo de Compras
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Análisis de gastos, proveedores, tendencias de precio y categorías SAT
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-gray-950 p-3 rounded-xl border border-gray-800">
          <select
            className="bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
            value={anio} onChange={e => setAnio(e.target.value)}
          >
            {[2024, 2025, 2026].map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select
            className="bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
            value={mes} onChange={e => setMes(e.target.value)}
          >
            <option value="todos">Todos los meses</option>
            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
              <option key={m} value={m}>{MESES_CORTO[parseInt(m)]}</option>
            ))}
          </select>
          <button
            onClick={cargar}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Recargar"
          >
            <RefreshCw size={16} className={cargando ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* ── Vista Principal vs Detalle Proveedor ── */}
      {proveedorSeleccionado ? (
        
        /* ═══════════════════════════════════
            VISTA: DETALLE DE PROVEEDOR
        ═══════════════════════════════════ */
        <div className="animate-in fade-in slide-in-from-right-8 duration-300 space-y-5">
          <button 
            onClick={() => setProveedorSeleccionado(null)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 w-fit"
          >
            <ChevronLeft size={16} /> Volver a vista general
          </button>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Store size={120} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-start">
              <div>
                <p className="text-blue-400 font-semibold text-sm mb-1 uppercase tracking-wider flex items-center gap-2">
                  <Store size={16} /> Perfil del Proveedor
                </p>
                <h3 className="text-2xl font-bold text-white max-w-3xl leading-tight mb-4">
                  {proveedorSeleccionado}
                </h3>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl min-w-[140px]">
                  <p className="text-gray-400 text-xs mb-1">Total Gastado</p>
                  <p className="text-xl font-bold text-blue-400">
                    {fmt(detalleProveedor.reduce((sum, p) => sum + parseFloat(p.importe_total), 0))}
                  </p>
                </div>
                <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl min-w-[140px]">
                  <p className="text-gray-400 text-xs mb-1">Total Facturas</p>
                  <p className="text-xl font-bold text-emerald-400">
                    {detalleProveedor.reduce((max, p) => Math.max(max, parseInt(p.num_facturas)), 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
            <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Package className="text-purple-400" size={18} />
                Productos y Servicios adquiridos
              </h4>
              <span className="text-gray-400 text-sm">{detalleProveedor.length} conceptos únicos encontrados</span>
            </div>
            
            {cargandoDetalle ? (
              <div className="py-20 flex justify-center text-gray-500">
                <RefreshCw size={24} className="animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-950 text-gray-400">
                    <tr>
                      <th className="px-6 py-4 text-left font-medium">Descripción</th>
                      <th className="px-6 py-4 text-left font-medium hidden md:table-cell">Clave SAT</th>
                      <th className="px-6 py-4 text-right font-medium">Cant. Total</th>
                      <th className="px-6 py-4 text-right font-medium">Precio Prom.</th>
                      <th className="px-6 py-4 text-right font-medium">Importe Acum.</th>
                      <th className="px-6 py-4 text-center font-medium">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {detalleProveedor.map((prod, i) => (
                      <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-white font-medium max-w-[300px] whitespace-normal leading-relaxed">{prod.descripcion}</p>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-gray-500 hidden md:table-cell">
                          {prod.clave_prod_serv}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-300">
                          {Number(prod.cantidad_total).toFixed(2)} <span className="text-xs text-gray-500">{prod.unidad}</span>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-400">
                          {fmt(prod.precio_promedio)}
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-white">
                          {fmt(prod.importe_total)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => verTendenciaProducto(prod.descripcion)}
                            className="inline-flex items-center gap-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                          >
                            <TrendingUp size={14} /> Tendencia
                          </button>
                        </td>
                      </tr>
                    ))}
                    {detalleProveedor.length === 0 && (
                      <tr><td colSpan={6} className="py-12 text-center text-gray-500">No se encontraron productos para este proveedor en este periodo.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      ) : (
        /* ═══════════════════════════════════
            VISTAS GENERALES (TABS)
        ═══════════════════════════════════ */
        <>
          {/* ── Tabs ── */}
          <div className="flex gap-1 bg-gray-900 border border-gray-800 p-1 rounded-xl overflow-x-auto hide-scrollbar">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon size={15} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* ── Spinner global ── */}
          {cargando && tab !== 'tendencias' && (
            <div className="flex items-center justify-center py-20 text-gray-500 gap-3">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Cargando datos...
            </div>
          )}

          {(!cargando || tab === 'tendencias') && (
            <>

              {/* ═══════════════════════════════════
                  TAB — RESUMEN
              ═══════════════════════════════════ */}
              {tab === 'resumen' && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Gastado',   value: fmt(resumen?.total_gastado),   color: 'blue',   Icon: DollarSign },
                      { label: 'Facturas',        value: (resumen?.num_facturas || 0).toLocaleString(), color: 'emerald', Icon: Package  },
                      { label: 'Proveedores',     value: resumen?.num_proveedores || 0,  color: 'purple', Icon: Users     },
                      { label: 'Ticket Promedio', value: fmt(resumen?.promedio_factura), color: 'amber',  Icon: BarChart2 },
                    ].map(({ label, value, color, Icon }) => (
                      <div key={label} className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-gray-400 text-xs font-medium mb-1 truncate">{label}</p>
                            <p className={`text-xl font-bold text-${color}-400 truncate`}>{value}</p>
                          </div>
                          <div className={`bg-${color}-500/10 p-2 rounded-lg text-${color}-500 flex-shrink-0`}>
                            <Icon size={18} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {resumen?.top_proveedor && (
                    <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3">
                      <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-300">
                        <span className="text-amber-400 font-semibold">Concentración de riesgo: </span>
                        El mayor proveedor es{' '}
                        <button onClick={() => cargarDetalleProveedor(resumen.top_proveedor)} className="text-blue-400 font-medium hover:underline">
                          {resumen.top_proveedor}
                        </button>{' '}
                        con{' '}
                        <span className="text-amber-400 font-semibold">{fmt(resumen.top_proveedor_total)}</span>
                        {' '}({pct(resumen.top_proveedor_pct)} del total del periodo).
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                        <BarChart2 size={18} className="text-blue-400" /> Gasto Mensual — {anio}
                      </h3>
                      {porMes.length > 0 ? (
                        <div style={{ height: 280 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={porMes} margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
                              <defs>
                                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%"   stopColor="#3b82f6" stopOpacity={1} />
                                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.8} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                              <XAxis dataKey="mes" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                              <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                              <Tooltip content={<DarkTooltip />} />
                              <Bar dataKey="total" name="Gasto" fill="url(#barGrad)" radius={[5, 5, 0, 0]} maxBarSize={48} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-12">Sin datos para {anio}</p>
                      )}
                    </div>

                    {acumulado.length > 1 && (
                      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                          <TrendingUp size={18} className="text-emerald-400" /> Acumulado del Año — {anio}
                        </h3>
                        <div style={{ height: 280 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={acumulado} margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
                              <defs>
                                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                              <XAxis dataKey="mes" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                              <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                              <Tooltip content={<DarkTooltip />} />
                              <Area type="monotone" dataKey="acumulado" name="Acumulado" stroke="#10b981" fill="url(#areaGrad)" strokeWidth={2.5} dot={false} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════
                  TAB — PROVEEDORES
              ═══════════════════════════════════ */}
              {tab === 'proveedores' && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                      <Users size={18} className="text-purple-400" />
                      Top {Math.min(porProveedor.length, 10)} Proveedores por Gasto
                    </h3>
                    {porProveedor.length > 0 ? (
                      <div style={{ height: Math.max(260, Math.min(porProveedor.length, 10) * 46) }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={porProveedor.slice(0, 10).map(p => ({ ...p, nombre_corto: short(p.nombre_emisor) })).reverse()}
                            layout="vertical"
                            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                            <XAxis type="number" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                            <YAxis type="category" dataKey="nombre_corto" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} width={145} />
                            <Tooltip content={<ProvTooltip />} />
                            <Bar dataKey="total" name="Total" radius={[0, 5, 5, 0]} maxBarSize={28}>
                              {porProveedor.slice(0, 10).reverse().map((_, i) => (
                                <Cell key={i} fill={PALETTE[i % PALETTE.length]} cursor="pointer" onClick={(data) => cargarDetalleProveedor(data.payload.nombre_emisor)} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-12">Sin datos para el periodo seleccionado</p>
                    )}
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm whitespace-nowrap">
                        <thead className="bg-gray-950/60 border-b border-gray-800 text-gray-400">
                          <tr>
                            <th className="px-5 py-3 text-left font-medium w-8">#</th>
                            <th className="px-5 py-3 text-left font-medium">Proveedor</th>
                            <th className="px-5 py-3 text-right font-medium">Facturas</th>
                            <th className="px-5 py-3 text-right font-medium">Total</th>
                            <th className="px-5 py-3 text-right font-medium">% del Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {porProveedor.map((p, i) => (
                            <tr key={p.rfc_emisor} className="hover:bg-gray-800/40 transition-colors">
                              <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                              <td className="px-5 py-3">
                                <button onClick={() => cargarDetalleProveedor(p.nombre_emisor)} className="text-blue-400 hover:text-blue-300 font-medium hover:underline text-left transition-colors">
                                  {p.nombre_emisor}
                                </button>
                              </td>
                              <td className="px-5 py-3 text-right text-gray-400">{p.num_facturas}</td>
                              <td className="px-5 py-3 text-right text-white font-medium">{fmt(p.total)}</td>
                              <td className="px-5 py-3 text-right text-gray-400">{pct(p.pct_total)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════════════
                  TAB — TENDENCIAS DE PRECIO
              ═══════════════════════════════════ */}
              {tab === 'tendencias' && (
                <div className="space-y-6 animate-in fade-in">

                  {!resultados.length && (alertasPrecio.subidas.length > 0 || alertasPrecio.bajadas.length > 0) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {alertasPrecio.subidas.length > 0 && (
                        <div className="bg-gray-900 border border-red-500/20 rounded-xl p-5">
                          <h3 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
                            <ArrowUpRight size={18} /> Mayores Incrementos
                          </h3>
                          <div className="space-y-3">
                            {alertasPrecio.subidas.map((a, i) => (
                              <div key={i} className="flex items-center justify-between bg-gray-950 p-3 rounded-lg border border-gray-800 hover:border-red-500/50 cursor-pointer transition-colors" onClick={() => buscar(a.descripcion)}>
                                <div className="min-w-0 pr-4">
                                  <p className="text-white text-sm font-medium truncate" title={a.descripcion}>{a.descripcion}</p>
                                  <p className="text-gray-500 text-xs truncate">{a.proveedor}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <p className="text-red-400 font-bold text-sm">+{a.variacion_pct}%</p>
                                  <p className="text-gray-500 text-xs">{fmt(a.precio_inicial)} → {fmt(a.precio_final)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {alertasPrecio.bajadas.length > 0 && (
                        <div className="bg-gray-900 border border-emerald-500/20 rounded-xl p-5">
                          <h3 className="text-emerald-400 font-semibold mb-4 flex items-center gap-2">
                            <ArrowDownRight size={18} /> Mayores Descuentos
                          </h3>
                          <div className="space-y-3">
                            {alertasPrecio.bajadas.map((a, i) => (
                              <div key={i} className="flex items-center justify-between bg-gray-950 p-3 rounded-lg border border-gray-800 hover:border-emerald-500/50 cursor-pointer transition-colors" onClick={() => buscar(a.descripcion)}>
                                <div className="min-w-0 pr-4">
                                  <p className="text-white text-sm font-medium truncate" title={a.descripcion}>{a.descripcion}</p>
                                  <p className="text-gray-500 text-xs truncate">{a.proveedor}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <p className="text-emerald-400 font-bold text-sm">{a.variacion_pct}%</p>
                                  <p className="text-gray-500 text-xs">{fmt(a.precio_inicial)} → {fmt(a.precio_final)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6" ref={dropdownRef}>
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Search size={18} className="text-blue-400" />
                      Analizar historial de precios
                    </h3>
                    
                    <form onSubmit={(e) => { e.preventDefault(); buscar(query); }} className="relative">
                      <div className="flex gap-3">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                          <input
                            type="text"
                            placeholder="Buscar producto, servicio o proveedor (Ej. gasolina...)"
                            className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                            value={query}
                            onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
                            onFocus={() => setShowDropdown(true)}
                          />
                          {showDropdown && <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />}
                        </div>
                        <button
                          type="submit" disabled={buscando || !query.trim()}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          {buscando ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <TrendingUp size={16} />}
                          Analizar
                        </button>
                      </div>

                      {showDropdown && (sugerenciasFiltradas.length > 0 || query) && (
                        <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                          {sugerenciasFiltradas.length > 0 ? (
                            <ul className="max-h-80 overflow-y-auto divide-y divide-gray-700/50">
                              {sugerenciasFiltradas.map((s, idx) => (
                                <li 
                                  key={idx} 
                                  className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-colors"
                                  onClick={() => buscar(s.descripcion)}
                                >
                                  <div className="min-w-0 pr-4">
                                    <p className="text-white text-sm font-medium truncate">{s.descripcion}</p>
                                    <p className="text-gray-400 text-xs truncate mt-0.5">{s.proveedor} • {s.num_veces} compras</p>
                                  </div>
                                  <ArrowUpRight size={14} className="text-gray-500 flex-shrink-0" />
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="p-4 text-gray-400 text-sm text-center">Presiona Enter para buscar "{query}"</div>
                          )}
                        </div>
                      )}
                    </form>
                  </div>

                  {resultados.length > 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5">
                      <div className="flex justify-between items-center">
                        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                          <TrendingUp className="text-blue-400" size={20} /> Resultados para "{query}"
                        </h3>
                        <button onClick={() => setResultados([])} className="text-gray-400 hover:text-white text-sm">Limpiar</button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: 'Precio Mínimo',   value: fmt(precioMin), color: 'emerald', Icon: ArrowDownRight },
                          { label: 'Precio Máximo',   value: fmt(precioMax), color: 'red',     Icon: ArrowUpRight  },
                          { label: 'Precio Promedio', value: fmt(precioAvg), color: 'blue',    Icon: BarChart2     },
                          {
                            label: 'Variación Total',
                            value: `${variacion > 0 ? '+' : ''}${variacion.toFixed(1)}%`,
                            color: variacion > 0 ? 'red' : (variacion < 0 ? 'emerald' : 'gray'),
                            Icon: variacion > 0 ? TrendingUp : TrendingDown,
                          },
                        ].map(({ label, value, color, Icon }) => (
                          <div key={label} className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-gray-400 text-xs mb-1">{label}</p>
                                <p className={`text-lg font-bold text-${color}-400`}>{value}</p>
                              </div>
                              <Icon size={16} className={`text-${color}-500 mt-1 flex-shrink-0`} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-5">
                          <h3 className="text-white font-semibold flex items-center gap-2">
                            <LineChart size={18} className="text-emerald-400" />
                            Historial de Precios Unitarios
                          </h3>
                          <span className="text-gray-500 text-xs">{resultados.length} registros · clic para detalle</span>
                        </div>
                        <div style={{ height: 280 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartTend} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                              <XAxis dataKey="fecha" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                              <YAxis stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `$${v}`} />
                              <Tooltip
                                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
                                itemStyle={{ color: '#10b981' }}
                                formatter={v => [fmt(v), 'Precio Unit.']}
                              />
                              <Line
                                type="monotone" dataKey="precio" stroke="#3b82f6" strokeWidth={2.5}
                                dot={{ fill: '#3b82f6', r: 4, cursor: 'pointer', strokeWidth: 0 }}
                                activeDot={{
                                  r: 7, fill: '#60a5fa', stroke: '#3b82f6', strokeWidth: 2,
                                  onClick: (_, p) => setFacturaDetalle(p.payload.raw)
                                }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {facturaDetalle && (
                        <div className="bg-blue-950/30 border border-blue-500/30 rounded-xl p-5 relative animate-in fade-in">
                          <button
                            onClick={() => setFacturaDetalle(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white text-lg leading-none"
                          >✕</button>
                          <p className="text-blue-400 font-semibold text-sm mb-4 flex items-center gap-2">
                            <Package size={15} /> Detalle del punto seleccionado
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div><p className="text-gray-500 text-xs mb-1">Proveedor</p><p className="text-white font-medium">{facturaDetalle.proveedor}</p></div>
                            <div><p className="text-gray-500 text-xs mb-1">Descripción</p><p className="text-white font-medium">{facturaDetalle.descripcion}</p></div>
                            <div><p className="text-gray-500 text-xs mb-1">Fecha · Precio Unit.</p><p className="text-white font-medium">{facturaDetalle.fecha_emision} — {fmt(facturaDetalle.valor_unitario)}</p></div>
                            <div><p className="text-gray-500 text-xs mb-1">Cantidad</p><p className="text-white font-medium">{Number(facturaDetalle.cantidad).toFixed(2)} {facturaDetalle.unidad}</p></div>
                          </div>
                        </div>
                      )}

                      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm whitespace-nowrap">
                            <thead className="bg-gray-950/60 border-b border-gray-800 text-gray-400">
                              <tr>
                                <th className="px-5 py-3 text-left font-medium">Fecha</th>
                                <th className="px-5 py-3 text-left font-medium">Descripción</th>
                                <th className="px-5 py-3 text-left font-medium">Proveedor</th>
                                <th className="px-5 py-3 text-right font-medium">Cant.</th>
                                <th className="px-5 py-3 text-right font-medium">P. Unit.</th>
                                <th className="px-5 py-3 text-right font-medium">Importe</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {resultados.map((r, i) => (
                                <tr key={r.id || i} className="hover:bg-gray-800/30 transition-colors">
                                  <td className="px-5 py-3 text-gray-400">{r.fecha_emision}</td>
                                  <td className="px-5 py-3 text-white whitespace-normal min-w-[200px] max-w-[300px]">{r.descripcion}</td>
                                  <td className="px-5 py-3">
                                    <button 
                                      onClick={() => cargarDetalleProveedor(r.proveedor)} 
                                      className="text-blue-400 hover:text-blue-300 font-medium hover:underline text-left max-w-[180px] truncate block"
                                      title={r.proveedor}
                                    >
                                      {r.proveedor}
                                    </button>
                                  </td>
                                  <td className="px-5 py-3 text-right text-gray-300">
                                    {Number(r.cantidad).toFixed(2)} <span className="text-xs text-gray-600">{r.unidad}</span>
                                  </td>
                                  <td className="px-5 py-3 text-right text-gray-300">{fmt(r.valor_unitario)}</td>
                                  <td className="px-5 py-3 text-right font-semibold text-white">{fmt(r.importe)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ═══════════════════════════════════
                  TAB — CATEGORÍAS SAT
              ═══════════════════════════════════ */}
              {tab === 'categorias' && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                        <PieIcon size={18} className="text-amber-400" />
                        Distribución por Categoría SAT (Top 10)
                      </h3>
                      {porClave.length > 0 ? (
                        <>
                          <div style={{ height: 280 }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={porClave.slice(0, 10)} cx="50%" cy="50%"
                                  innerRadius={72} outerRadius={118}
                                  dataKey="total" nameKey="descripcion_clave"
                                  labelLine={false} label={PieLabel}
                                >
                                  {porClave.slice(0, 10).map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} stroke="transparent" />)}
                                </Pie>
                                <Tooltip
                                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
                                  formatter={(v, n) => [fmt(v), n || 'Importe']}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 mt-3">
                            {porClave.slice(0, 10).map((c, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs min-w-0">
                                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
                                <span className="text-gray-400 truncate" title={c.descripcion_clave || c.clave_prod_serv}>
                                  {c.descripcion_clave || c.clave_prod_serv}
                                </span>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-500 text-center py-12">Sin datos para el periodo seleccionado</p>
                      )}
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                      <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
                        <h3 className="text-white font-semibold">Todas las Claves SAT</h3>
                        <span className="text-gray-500 text-xs">{porClave.length} categorías</span>
                      </div>
                      <div className="overflow-y-auto" style={{ maxHeight: 420 }}>
                        <table className="w-full text-sm">
                          <thead className="bg-gray-950/60 text-gray-400 sticky top-0 z-10">
                            <tr>
                              <th className="px-4 py-3 text-left font-medium">Clave</th>
                              <th className="px-4 py-3 text-left font-medium">Descripción</th>
                              <th className="px-4 py-3 text-right font-medium">Total</th>
                              <th className="px-4 py-3 text-right font-medium">%</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800">
                            {(() => {
                              const total = porClave.reduce((s, x) => s + x.total, 0);
                              return porClave.map((c, i) => (
                                <tr key={c.clave_prod_serv} className="hover:bg-gray-800/30 transition-colors">
                                  <td className="px-4 py-3">
                                    <span className="flex items-center gap-2 font-mono text-xs text-gray-400">
                                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
                                      {c.clave_prod_serv}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-gray-300 text-xs max-w-[160px] truncate" title={c.descripcion_clave}>
                                    {c.descripcion_clave || '—'}
                                  </td>
                                  <td className="px-4 py-3 text-right font-medium text-white text-xs">{fmt(c.total)}</td>
                                  <td className="px-4 py-3 text-right text-xs">
                                    <span className={total > 0 && (c.total / total) > 0.3 ? 'text-amber-400 font-medium' : 'text-gray-500'}>
                                      {pct(total > 0 ? (c.total / total) * 100 : 0)}
                                    </span>
                                  </td>
                                </tr>
                              ));
                            })()}
                            {porClave.length === 0 && (
                              <tr><td colSpan={4} className="px-4 py-12 text-center text-gray-500">Sin datos</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
