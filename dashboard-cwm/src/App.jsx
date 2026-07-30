import React, { useState, useEffect } from 'react';
import { API_BASE, SOCKET_URL } from './api.js';
import { 
  Search, 
  FolderOpen, 
  Clock, 
  CheckCircle2, 
  Bot, 
  FileText,
  DownloadCloud,
  RefreshCw,
  Upload,
  ChevronLeft,
  ChevronRight,
  Camera,
  Menu,
  X,
  Trash2,
  Copy,
  LogOut,
  Settings,
  
  FileSpreadsheet,
  Lock,
  Receipt,
  Terminal,
  TrendingUp,
  CreditCard
} from 'lucide-react';

import { io } from 'socket.io-client';
import Login from './components/Login.jsx';
import Configuracion from './components/Configuracion.jsx';
import MapeoContable from './components/MapeoContable.jsx';
import ReporteConceptos from './components/ReporteConceptos.jsx';
import Gastos from './pages/Gastos.jsx';
import Pagos from './pages/Pagos.jsx';
import LogPanel from './components/LogPanel.jsx';

export default function App() {
  const [facturas, setFacturas] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroAnio, setFiltroAnio] = useState('todos');
  const [filtroMes, setFiltroMes] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [mostrarConfig, setMostrarConfig] = useState(false);
  const [mostrarContabilidad, setMostrarContabilidad] = useState(false);
  const [mostrarGastos, setMostrarGastos] = useState(false);
  const [mostrarPagos, setMostrarPagos] = useState(false);
  const [mostrarInteligencia, setMostrarInteligencia] = useState(false);
  const [mostrarLogs, setMostrarLogs] = useState(false);

  // Estados para el Modal de Descarga SAT
  const [mostrarModalSAT, setMostrarModalSAT] = useState(false);
  const [satFechaInicio, setSatFechaInicio] = useState('');
  const [satFechaFin, setSatFechaFin] = useState('');
  const [satAccion, setSatAccion] = useState('active');

  // ==========================================================
  // MANEJO DE HISTORIAL (BACK BUTTON)
  // ==========================================================
  useEffect(() => {
    const syncStateWithHash = () => {
      const hash = window.location.hash.replace('#', '');
      setMostrarInteligencia(hash === 'compras');
      setMostrarContabilidad(hash === 'contabilidad');
      setMostrarGastos(hash === 'gastos');
      setMostrarPagos(hash === 'pagos');
      setMostrarConfig(hash === 'config');
      setMostrarLogs(hash === 'logs');
    };

    window.addEventListener('hashchange', syncStateWithHash);
    syncStateWithHash(); // Sincronización inicial

    return () => window.removeEventListener('hashchange', syncStateWithHash);
  }, []);

  // ==========================================================
  // CONEXIÓN AL BACKEND (POSTGRESQL + NODE)
  // ==========================================================
  const cargarFacturas = async () => {
    if (!token) return;
    setCargando(true);
    try {
      const respuesta = await fetch(`${API_BASE}/api/facturas`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Si el token expira o es inválido, forzamos cierre de sesión
      if (respuesta.status === 401 || respuesta.status === 403) {
        handleLogout();
        return;
      }

      if (!respuesta.ok) throw new Error('Error en red');
      const datos = await respuesta.json();
      setFacturas(datos);
    } catch (error) {
      console.error("Error al conectar con la BD:", error);
      setFacturas([]); 
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarFacturas();
  }, [token]);

  // ==========================================================
  // WEBSOCKETS: ACTUALIZACIONES EN TIEMPO REAL
  // ==========================================================
  useEffect(() => {
    if (!token) return;
    
    const socket = io(SOCKET_URL);

    socket.on('task-completed', (data) => {
      alert(`✅ Tarea completada: ${data.task}\n${data.message}`);
      cargarFacturas(); // Refrescar facturas sin que el usuario haga nada
    });

    socket.on('task-error', (data) => {
      alert(`❌ Error en tarea: ${data.task}\n${data.error}`);
    });

    return () => socket.disconnect();
  }, [token]);

  // ==========================================================
  // ACCIONES DEL DASHBOARD
  // ==========================================================
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const forzarEscaneo = async () => {
    try {
      await fetch(`${API_BASE}/api/escanear-nas`, { 
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('🤖 Orquestador IA iniciado en segundo plano. Te avisaremos cuando termine.');
    } catch (error) {
      alert('⚠️ No se pudo conectar con el servidor API.');
    }
  };

  const sincronizarSAT = async () => {
    if (!satFechaInicio || !satFechaFin) {
      alert("Por favor selecciona las fechas.");
      return;
    }
    setMostrarModalSAT(false);
    try {
      const respuesta = await fetch(`${API_BASE}/api/sat/sync`, { 
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fechaInicio: satFechaInicio,
          fechaFin: satFechaFin,
          estatus: satAccion
        })
      });
      const data = await respuesta.json();
      alert(`☁️ ${data.mensaje}\nRecibirás una notificación al terminar.`);
    } catch (error) {
      alert('⚠️ No se pudo conectar con el servidor API.');
    }
  };

  // NUEVO: Conciliar complementos XML
  const conciliarXML = async () => {
    try {
      const respuesta = await fetch(`${API_BASE}/api/conciliar-xml`, { 
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await respuesta.json();
      alert(`📄 ${data.mensaje}\nRecibirás una notificación al terminar.`);
    } catch (error) {
      alert('⚠️ No se pudo conectar con el servidor API.');
    }
  };

  // NUEVO: Subida Manual de Comprobantes
  const handleSubidaManual = async (event, uuid) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('documento', file);

    try {
      setCargando(true);
      const res = await fetch(`${API_BASE}/api/subir-pago/${uuid}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        alert('✅ Documento adjuntado y expediente armado correctamente en el NAS.');
        cargarFacturas(); // Refrescar para que pase a "Pagado" al instante
      } else {
        const errorData = await res.json();
        alert(`❌ Error del servidor: ${errorData.error || 'No se pudo procesar el archivo.'}`);
      }
    } catch (error) {
      alert('⚠️ Falla de conexión al intentar subir el documento.');
    } finally {
      setCargando(false);
    }
  };

  // NUEVO: Copiar texto al portapapeles
  const copiarAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto);
    alert(`📋 UUID copiado:\n${texto}`);
  };

  // NUEVO: Eliminar Pago (Deshacer)
  const handleEliminarPago = async (uuid) => {
    if (!window.confirm('¿Estás seguro de eliminar este pago? La factura volverá al estatus "Pendiente" y el archivo se borrará del NAS.')) {
      return;
    }

    try {
      setCargando(true);
      const res = await fetch(`${API_BASE}/api/eliminar-pago/${uuid}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        cargarFacturas();
      } else {
        const errorData = await res.json();
        alert(`❌ Error del servidor: ${errorData.error || 'No se pudo eliminar el archivo.'}`);
      }
    } catch (error) {
      alert('⚠️ Falla de conexión al intentar eliminar el pago.');
    } finally {
      setCargando(false);
    }
  };

  // Helper para convertir ruta del contenedor a ruta file:// local para Windows
  const obtenerEnlaceLocal = (ruta) => {
    let rutaWindows = ruta;
    if (ruta.startsWith('/mnt/nas_pagos')) {
      rutaWindows = ruta.replace('/mnt/nas_pagos', '\\\\192.168.1.15\\pagos');
    } else if (ruta.startsWith('//192.168.1.15')) {
      rutaWindows = ruta.replace(/\//g, '\\');
    }
    // Asegurarse de usar diagonales invertidas
    rutaWindows = rutaWindows.replace(/\//g, '\\');
    // Para las extensiones de Chrome, el formato suele ser file:///\\servidor\carpeta...
    return `file:///${rutaWindows}`;
  };

  // ==========================================================
  // CÁLCULOS Y FILTROS
  // ==========================================================
  // Reiniciar a la página 1 cuando cambian los filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, filtro, filtroTipo, filtroAnio, filtroMes]);

  // Las Notas de Crédito ('E') y los Complementos ('P') se excluyen para que no sumen saldo a las obligaciones pendientes
  const totalPendiente = facturas.filter(f => f.estatus === 'pendiente' && f.tipo_comprobante?.toUpperCase() !== 'E' && f.tipo_comprobante?.toUpperCase() !== 'P').reduce((acc, f) => acc + Number(f.total), 0);
  const totalPagado = facturas.filter(f => f.estatus === 'pagado').reduce((acc, f) => acc + Number(f.total), 0);
  const totalRetencionesPendientes = facturas.filter(f => f.estatus === 'pendiente' && f.tipo_comprobante?.toUpperCase() === 'I').reduce((acc, f) => acc + Number(f.total_retenciones || 0), 0);

  // Obtener años únicos disponibles en los datos para el filtro
  const aniosDisponibles = [...new Set(facturas.map(f => f.fecha_emision ? f.fecha_emision.split('-')[0] : null).filter(Boolean))].sort((a, b) => b - a);

  const facturasFiltradas = facturas.filter(factura => {
    const coincideFiltroEstatus = filtro === 'todos' || factura.estatus === filtro;
    const coincideFiltroTipo = filtroTipo === 'todos' || 
                               (filtroTipo === 'factura' && factura.tipo_comprobante?.toUpperCase() !== 'P') || 
                               (filtroTipo === 'complemento' && factura.tipo_comprobante?.toUpperCase() === 'P');
    
    const fecha = factura.fecha_emision || '';
    const [anio, mes] = fecha.split('-');
    const coincideAnio = filtroAnio === 'todos' || anio === filtroAnio;
    const coincideMes = filtroMes === 'todos' || mes === filtroMes;
    
    const proveedorStr = factura.proveedor ? factura.proveedor.toLowerCase() : '';
    const rfcStr = factura.rfc ? factura.rfc.toLowerCase() : '';
    const folioStr = factura.folio_interno ? factura.folio_interno.toLowerCase() : '';
    const uuidStr = factura.uuid ? factura.uuid.toLowerCase() : '';
    
    const coincideBusqueda = proveedorStr.includes(busqueda.toLowerCase()) || 
                             rfcStr.includes(busqueda.toLowerCase()) ||
                             folioStr.includes(busqueda.toLowerCase()) ||
                             uuidStr.includes(busqueda.toLowerCase());
                             
    return coincideFiltroEstatus && coincideFiltroTipo && coincideBusqueda && coincideAnio && coincideMes;
  });

  // Lógica de Paginación
  const itemsPorPagina = 50;
  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  const facturasPaginadas = facturasFiltradas.slice(indicePrimerItem, indiceUltimoItem);
  const totalPaginas = Math.ceil(facturasFiltradas.length / itemsPorPagina);

  const formatearMoneda = (monto) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(monto);
  };

  const obtenerNombreCorto = (nombre) => {
    if (!nombre) return '';
    // Elimina sufijos societarios comunes en México (SA DE CV, S DE RL, SAPI, etc.)
    return nombre
      .replace(/,?\s*\b(S\.?A\.?P\.?I\.?|S\.?A\.?B\.?|S\.?A\.?|S\.?\s*DE\s*R\.?L\.?|S\.?A\.?S\.?|S\.?C\.?|A\.?C\.?|SOCIEDAD\s+AN[OÓ]NIMA|INSTITUCI[OÓ]N\s+DE\s+BANCA\s+M[UÚ]LTIPLE|GRUPO\s+FINANCIERO)(\s+DE\s+C\.?V\.?)?\b.*$/i, '')
      .trim();
  };

  // ==========================================================
  // RENDER DE LA INTERFAZ
  // ==========================================================
  
  // Pantalla de inicio de sesión obligatoria
  if (!token) {
    return <Login setAuthToken={setToken} />;
  }

  // Pantalla del panel de configuración
  if (mostrarConfig) {
    return (
      <div className="min-h-screen bg-gray-950 p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl flex justify-start mb-4">
          <button onClick={() => window.location.hash = ''} className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"><ChevronLeft /> Volver al Dashboard</button>
        </div>
        <Configuracion token={token} />
      </div>
    );
  }

  if (mostrarInteligencia) {
    return (
      <div className="min-h-screen bg-black font-sans text-gray-200 p-4 md:p-8">
        <ReporteConceptos token={token} onVolver={() => window.location.hash = ''} />
      </div>
    );
  }

  // Pantalla del Módulo Contable
  if (mostrarContabilidad) {
    return (
      <div className="min-h-screen bg-gray-950 p-6">
        <MapeoContable token={token} onVolver={() => window.location.hash = ''} />
      </div>
    );
  }

  // Pantalla de Reporte de Gastos
  if (mostrarGastos) {
    return (
      <div className="min-h-screen bg-gray-950 p-6 flex flex-col items-center">
        <div className="w-full flex justify-start mb-4">
          <button onClick={() => window.location.hash = ''} className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"><ChevronLeft /> Volver al Dashboard</button>
        </div>
        <Gastos />
      </div>
    );
  }

  // Pantalla del Módulo de Pagos (Proveedores)
  if (mostrarPagos) {
    return (
      <div className="min-h-screen bg-gray-950 p-6 flex flex-col items-center">
        <div className="w-full max-w-7xl flex flex-col gap-4">
          <div className="w-full flex justify-start">
            <button onClick={() => window.location.hash = ''} className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors"><ChevronLeft /> Volver al Dashboard</button>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Módulo de Pagos</h1>
            <p className="text-gray-400 text-sm mt-1">Estado de cuenta y antigüedad de saldos por proveedor</p>
          </div>
          <Pagos facturas={facturas} />
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-gray-950 text-gray-200 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Cabecera y Botones de Acción */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex justify-between items-center w-full md:w-auto">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Sistema de Pagos y Conciliación</h1>
              <p className="text-gray-400 text-sm mt-1">Sincronización automatizada CWM - NAS</p>
            </div>
            
            {/* Botón Hamburguesa para Móviles */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors bg-gray-900 border border-gray-800 rounded-lg"
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              {menuAbierto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <div className={`${menuAbierto ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-3 w-full md:w-auto`}>
            <button 
              onClick={() => window.location.hash = 'gastos'}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-800 hover:bg-blue-900 border border-gray-700 hover:border-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm text-blue-400"
              title="Reporte de Gastos"
            >
              <Receipt size={18} />
              Gastos
            </button>
            <button 
              onClick={() => window.location.hash = 'pagos'}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-800 hover:bg-indigo-900 border border-gray-700 hover:border-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm text-indigo-400"
              title="Módulo de Pagos a Proveedores"
            >
              <CreditCard size={18} />
              Módulo de Pagos
            </button>
            <button 
              onClick={() => window.location.hash = 'compras'}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-800 hover:bg-emerald-900 border border-gray-700 hover:border-emerald-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm text-emerald-400"
              title="Módulo de Compras"
            >
              <TrendingUp size={18} />
              Módulo de Compras
            </button>
            <button 
              onClick={() => window.location.hash = 'contabilidad'}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-800 hover:bg-emerald-900 border border-gray-700 hover:border-emerald-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm text-emerald-400"
              title="Módulo Contable"
            >
              <FileSpreadsheet size={18} />
              Contabilidad
            </button>
            <button 
              onClick={() => window.location.hash = 'config'}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
              title="Configuración"
            >
              <Settings size={18} />
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
              title="Cerrar Sesión"
            >
              <LogOut size={18} />
            </button>
            <button 
              onClick={conciliarXML}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm shadow-lg shadow-purple-900/20"
              title="Leer Complementos XML"
            >
              <FileText size={18} />
              Leer XMLs
            </button>
            <button 
              onClick={() => setMostrarModalSAT(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
            >
              <DownloadCloud size={18} className="text-blue-400" />
              Bajar del SAT
            </button>
            <button 
              onClick={forzarEscaneo}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm shadow-lg shadow-blue-900/20"
            >
              <Bot size={18} />
              Escanear Synology
            </button>
            <button
              onClick={() => setMostrarLogs(v => !v)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm border ${
                mostrarLogs
                  ? 'bg-slate-700 border-slate-500 text-green-400'
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
              }`}
              title="Ver logs en tiempo real"
            >
              <Terminal size={18} />
              {mostrarLogs ? 'Ocultar Logs' : 'Ver Logs'}
            </button>
          </div>
        </div>

        {/* Tarjetas de KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-400 text-sm font-medium">Obligaciones Pendientes</p>
              <p className="text-2xl font-bold text-white mt-1">{formatearMoneda(totalPendiente)}</p>
            </div>
            <div className="bg-orange-500/10 p-3 rounded-lg text-orange-500">
              <Clock size={24} />
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-400 text-sm font-medium">Conciliado este Mes</p>
              <p className="text-2xl font-bold text-white mt-1">{formatearMoneda(totalPagado)}</p>
            </div>
            <div className="bg-emerald-500/10 p-3 rounded-lg text-emerald-500">
              <CheckCircle2 size={24} />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-400 text-sm font-medium">Archivos Procesados</p>
              <p className="text-2xl font-bold text-white mt-1">{facturas.length}</p>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg text-blue-500">
              <FileText size={24} />
            </div>
          </div>
          
          {/* Nuevo: Tarjeta de Retenciones Pendientes */}
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-400 text-sm font-medium">Retenciones Pendientes</p>
              <p className="text-2xl font-bold text-white mt-1">{formatearMoneda(totalRetencionesPendientes)}</p>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-lg text-purple-500">
              <Lock size={24} /> {/* Icono de Lock, puede ser modificado si se prefiere otro */}
            </div>
          </div>
        </div>

        {/* Barra de Búsqueda y Filtros */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar proveedor, RFC, folio o UUID..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center justify-start lg:justify-end">
            <select
              value={filtroAnio}
              onChange={(e) => setFiltroAnio(e.target.value)}
              className="w-full sm:w-auto bg-gray-950 border border-gray-800 text-gray-400 text-sm rounded-lg focus:outline-none focus:border-blue-500 px-3 py-2 transition-colors cursor-pointer"
            >
              <option value="todos">Todos los años</option>
              {aniosDisponibles.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>

            <select
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
              className="w-full sm:w-auto bg-gray-950 border border-gray-800 text-gray-400 text-sm rounded-lg focus:outline-none focus:border-blue-500 px-3 py-2 transition-colors cursor-pointer"
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

            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full sm:w-auto bg-gray-950 border border-gray-800 text-gray-400 text-sm rounded-lg focus:outline-none focus:border-blue-500 px-3 py-2 transition-colors cursor-pointer"
            >
              <option value="todos">Todos los tipos</option>
              <option value="factura">Solo Facturas</option>
              <option value="complemento">Solo Complementos</option>
            </select>

            <div className="flex bg-gray-950 rounded-lg p-1 border border-gray-800 w-full sm:w-auto">
              {['todos', 'pendiente', 'pagado'].map((estado) => (
                <button
                  key={estado}
                  onClick={() => setFiltro(estado)}
                  className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${
                    filtro === estado 
                      ? 'bg-gray-800 text-white shadow-sm' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {estado}
                </button>
              ))}
              <button 
                onClick={cargarFacturas} 
                className="ml-2 px-3 py-1.5 text-gray-500 hover:text-white transition-colors"
                title="Refrescar Tabla"
              >
                <RefreshCw size={16} className={cargando ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de Datos */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-950/50 border-b border-gray-800 text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Fecha Emisión</th>
                  <th className="px-6 py-4 font-medium">Folio</th>
                  <th className="px-6 py-4 font-medium">UUID</th>
                  <th className="px-6 py-4 font-medium">Proveedor</th>
                  <th className="px-6 py-4 font-medium hidden md:table-cell">RFC</th>
                  <th className="px-6 py-4 font-medium text-right">Subtotal</th>
                  <th className="px-6 py-4 font-medium text-right">IVA</th>
                  <th className="px-6 py-4 font-medium text-right">Total</th>
                  <th className="px-6 py-4 font-medium text-center">Método Pago</th>
                  <th className="px-6 py-4 font-medium text-center">Tipo CFDI</th>
                  <th className="px-6 py-4 font-medium text-center">Expediente</th>
                  <th className="px-6 py-4 font-medium text-center">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {cargando ? (
                  <tr>
                    <td colSpan="12" className="px-6 py-12 text-center text-gray-500">
                      <RefreshCw size={24} className="animate-spin mx-auto mb-2 opacity-50" />
                      Sincronizando con base de datos...
                    </td>
                  </tr>
                ) : facturasPaginadas.length > 0 ? (
                  facturasPaginadas.map((factura) => (
                    <tr key={factura.uuid} className="hover:bg-gray-800/50 transition-colors">
                      
                      {/* Columna de Fecha */}
                      <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{factura.fecha_emision}</td>
                      
                      {/* Columna de Folio */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {factura.folio_interno ? (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-300">{factura.folio_interno}</span>
                            <button onClick={() => copiarAlPortapapeles(factura.folio_interno)} className="text-gray-500 hover:text-blue-400" title="Copiar Folio al portapapeles">
                              <Copy size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </td>
                      
                      {/* Columna de UUID */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-gray-400 select-all" title="Doble clic para seleccionar">{factura.uuid}</span>
                          <button 
                            onClick={() => copiarAlPortapapeles(factura.uuid)}
                            className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors"
                            title="Copiar UUID al portapapeles"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </td>
                      
                      {/* Columna de Proveedor */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-200 flex items-center gap-2" title={factura.proveedor}>
                          {obtenerNombreCorto(factura.proveedor)}
                          
                          {factura.tipo_comprobante?.toUpperCase() === 'I' && factura.metodo_pago === 'PPD' && factura.estatus === 'pagado' && !factura.tiene_complemento && (
                            <span title="Falta XML de Complemento de Pago (REP). Póliza de egreso bloqueada." className="cursor-help text-red-500 flex items-center">
                              <Lock size={14} />
                            </span>
                          )}
                        </div>
                      </td>
                      
                      {/* Columna de RFC */}
                      <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{factura.rfc}</td>
                      
                      {/* Columnas de Montos */}
                      <td className="px-6 py-4 text-right text-gray-400">
                        {formatearMoneda(factura.subtotal)}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400">
                        {formatearMoneda(factura.iva)}
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        {formatearMoneda(factura.total)}
                        {factura.moneda_original && factura.moneda_original !== 'MXN' && (
                          <div className="text-xs text-gray-500 mt-0.5" title={`Monto original: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: factura.moneda_original }).format(factura.total_original_moneda)} @ ${factura.tipo_cambio_xml} MXN/${factura.moneda_original}`}>
                            ({new Intl.NumberFormat('en-US', { style: 'currency', currency: factura.moneda_original }).format(factura.total_original_moneda)} {factura.moneda_original})
                            {factura.tipo_cambio_xml && (
                              <span className="ml-1 text-gray-600">@{factura.tipo_cambio_xml}</span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Columnas de Método de Pago y Tipo CFDI */}
                      <td className="px-6 py-4 text-center">
                        {factura.metodo_pago && (
                          <span className={`text-[10px] px-2 py-1 rounded font-bold border uppercase ${factura.metodo_pago === 'PPD' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                            {factura.metodo_pago}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-xs font-medium text-gray-300">
                        {factura.tipo_cfdi}
                      </td>
                      
                      {/* Columna de Acciones (Expediente y Subida Manual) */}
                      <td className="px-6 py-4 text-center">
                        {factura.estatus === 'pagado' ? (
                          <div className="flex items-center justify-center gap-1">
                            {factura.expediente && (
                              <a 
                                href={obtenerEnlaceLocal(factura.expediente)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                title={factura.expediente}
                              >
                                <FolderOpen size={18} />
                              </a>
                            )}
                            <button
                              onClick={() => handleEliminarPago(factura.uuid)}
                              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                              title="Eliminar comprobante / Deshacer pago"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                          {factura.expediente ? (
                            <a 
                              href={obtenerEnlaceLocal(factura.expediente)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                              title={factura.expediente}
                            >
                              <FolderOpen size={18} />
                            </a>
                          ) : (
                            <span className="text-gray-600 inline-flex items-center justify-center p-2" title="Carpeta aún no generada">
                              <FolderOpen size={18} opacity={0.5} />
                            </span>
                          )}
                            <label 
                              className="cursor-pointer inline-flex items-center justify-center p-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                              title="Adjuntar comprobante manual"
                            >
                              <Upload size={18} />
                              <input 
                                type="file" 
                                className="hidden" 
                                onChange={(e) => handleSubidaManual(e, factura.uuid)} 
                                accept=".pdf,.jpg,.jpeg,.png" 
                              />
                            </label>
                            
                            <label 
                              className="cursor-pointer inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors md:hidden"
                              title="Tomar foto de comprobante"
                            >
                              <Camera size={18} />
                              <input 
                                type="file" 
                                className="hidden" 
                                onChange={(e) => handleSubidaManual(e, factura.uuid)} 
                                accept="image/*" 
                                capture="environment"
                              />
                            </label>
                          </div>
                        )}
                      </td>

                      {/* Columna de Estatus (Movida al final) */}
                      <td className="px-6 py-4 text-center">
                        {factura.tipo_comprobante?.toUpperCase() === 'P' ? (
                          <span className="inline-flex items-center justify-center gap-1.5 bg-purple-500/10 text-purple-400 px-2.5 py-1 rounded-full text-xs font-medium border border-purple-500/20 w-full">
                            <FileText size={14} /> Informativo
                          </span>
                        ) : factura.estatus === 'pagado' ? (
                          <span className="inline-flex items-center justify-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-500/20 w-full">
                            <CheckCircle2 size={14} /> Pagado
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center gap-1.5 bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-full text-xs font-medium border border-orange-500/20 w-full">
                            <Clock size={14} /> Pendiente
                          </span>
                        )}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="px-6 py-8 text-center text-gray-500">
                      No se encontraron facturas en la base de datos con los filtros actuales.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Controles de Paginación */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-gray-900">
              <span className="text-sm text-gray-400">
                Mostrando <span className="text-white font-medium">{indicePrimerItem + 1}</span> a <span className="text-white font-medium">{Math.min(indiceUltimoItem, facturasFiltradas.length)}</span> de <span className="text-white font-medium">{facturasFiltradas.length}</span> resultados
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

      </div>
    </div>

    {/* MODAL DE DESCARGA SAT */}
    {mostrarModalSAT && (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 border border-emerald-500/30 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <DownloadCloud size={20} className="text-blue-400" />
              Sincronizar con el SAT
            </h3>
            <button onClick={() => setMostrarModalSAT(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Fecha de Inicio</label>
              <input 
                type="date" 
                value={satFechaInicio} 
                onChange={e => setSatFechaInicio(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Fecha de Fin</label>
              <input 
                type="date" 
                value={satFechaFin} 
                onChange={e => setSatFechaFin(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Acción / Estatus</label>
              <select 
                value={satAccion} 
                onChange={e => setSatAccion(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-emerald-500 transition-colors appearance-none"
              >
                <option value="active">Descargar XMLs Vigentes (Nuevas)</option>
                <option value="cancelled">Sincronizar Canceladas (Eliminar de BD)</option>
              </select>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-4">
              <p className="text-xs text-blue-300">
                {satAccion === 'active' 
                  ? "Se buscarán las facturas vigentes emitidas en el rango seleccionado y se guardarán en la base de datos." 
                  : "Se buscarán las facturas canceladas en el rango. Si existen en tu base de datos, serán ELIMINADAS permanentemente junto con el archivo XML."}
              </p>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-800 flex justify-end gap-3 bg-gray-900/50">
            <button 
              onClick={() => setMostrarModalSAT(false)}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={sincronizarSAT}
              className={`px-4 py-2 text-sm font-medium rounded-lg text-white shadow-lg transition-colors flex items-center gap-2 ${
                satAccion === 'active' 
                ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20' 
                : 'bg-red-600 hover:bg-red-500 shadow-red-900/20'
              }`}
            >
              <DownloadCloud size={16} />
              {satAccion === 'active' ? 'Descargar' : 'Sincronizar y Eliminar'}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Panel de Logs en tiempo real */}
    <LogPanel visible={mostrarLogs} onClose={() => setMostrarLogs(false)} />
    </>
  );
}