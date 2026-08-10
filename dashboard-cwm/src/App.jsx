import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEmpresa } from './context/EmpresaContext.jsx';
import { API_BASE, SOCKET_URL } from './api.js';
import { io } from 'socket.io-client';

import Login from './components/Login.jsx';
import Configuracion from './components/Configuracion.jsx';
import MapeoContable from './components/MapeoContable.jsx';
import ReporteConceptos from './components/ReporteConceptos.jsx';
import Gastos from './pages/Gastos.jsx';
import Pagos from './pages/Pagos.jsx';
import LogPanel from './components/LogPanel.jsx';
import AuditLogs from './components/AuditLogs.jsx';
import RepsHuerfanos from './pages/RepsHuerfanos.jsx';
import Conciliacion from './pages/Conciliacion.jsx';
import Layout from './components/Layout.jsx';
import DashboardPrincipal from './pages/DashboardPrincipal.jsx';
import MobileUpload from './pages/MobileUpload.jsx';
import ConfiguradorEmpresa from './pages/ConfiguradorEmpresa.jsx';
import UsuariosYPerfiles from './pages/UsuariosYPerfiles.jsx';
import { DownloadCloud, X } from 'lucide-react';

// ─── Toast Notification Component ──────────────────────────────────────────
function Toast({ toasts, removeToast }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`toast-enter pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-sm cursor-pointer ${
            t.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-300' :
            t.type === 'error'   ? 'bg-red-950/90 border-red-500/30 text-red-300' :
            'bg-gray-900/95 border-gray-700 text-gray-200'
          }`}
          onClick={() => removeToast(t.id)}
        >
          <span className="text-base flex-shrink-0 mt-0.5">{t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : '💡'}</span>
          <p className="text-sm font-medium leading-relaxed">{t.message}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const { currentEmpresa } = useEmpresa();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();
  const location = useLocation();
  const [facturas, setFacturas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Toast System
  const [toasts, setToasts] = useState([]);
  const toast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  // Modales
  const [mostrarModalSAT, setMostrarModalSAT] = useState(false);
  const [satFechaInicio, setSatFechaInicio] = useState('');
  const [satFechaFin, setSatFechaFin] = useState('');
  const [satAccion, setSatAccion] = useState('active');



  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const cargarFacturas = async () => {
    if (!token || !currentEmpresa) return;
    setCargando(true);
    try {
      const respuesta = await fetch(`${API_BASE}/api/facturas`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'x-empresa-rfc': currentEmpresa.rfc
        }
      });
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
    if (token && currentEmpresa) {
      cargarFacturas();
    }
  }, [token, currentEmpresa]);

  // WebSockets
  useEffect(() => {
    if (!token) return;
    const socket = io(SOCKET_URL || API_BASE);
    
    socket.on('connect', () => console.log('🟢 Conectado a notificaciones en tiempo real'));
    socket.on('nueva-auditoria', (data) => toast(`${data.titulo}: ${data.mensaje}`, data.tipo || 'info'));
    socket.on('task-completed', (data) => {
      toast(`Tarea completada: ${data.task} — ${data.message}`, 'success');
      cargarFacturas();
    });
    socket.on('task-error', (data) => toast(`Error en tarea: ${data.task} — ${data.error}`, 'error'));

    return () => socket.disconnect();
  }, [token]);

  // Acciones Globales
  const forzarEscaneo = async () => {
    try {
      await fetch(`${API_BASE}/api/escanear-nas`, { 
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast('Orquestador IA iniciado en segundo plano. Te avisaremos cuando termine.', 'success');
    } catch (error) {
      toast('No se pudo conectar con el servidor API.', 'error');
    }
  };

  const conciliarXML = async () => {
    if (!currentEmpresa) return;
    try {
      const res = await fetch(`${API_BASE}/api/verificar`, { 
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'x-empresa-rfc': currentEmpresa.rfc
        }
      });
      const data = await res.json();
      toast(data.mensaje || 'Lectura de XMLs iniciada. Recibirás una notificación al terminar.', 'success');
    } catch (error) {
      toast('No se pudo conectar con el servidor API.', 'error');
    }
  };

  const sincronizarSAT = async () => {
    if (!satFechaInicio || !satFechaFin) {
      toast('Selecciona ambas fechas', 'error');
      return;
    }
    if (!currentEmpresa) {
      toast('Selecciona una empresa primero', 'error');
      return;
    }
    setMostrarModalSAT(false);
    try {
      const respuesta = await fetch(`${API_BASE}/api/sat/sync`, { 
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'x-empresa-rfc': currentEmpresa.rfc
        },
        body: JSON.stringify({ fechaInicio: satFechaInicio, fechaFin: satFechaFin, estatus: satAccion })
      });
      const data = await respuesta.json();
      toast(data.mensaje || 'Sincronización iniciada. Recibirás una notificación al terminar.', 'success');
    } catch (error) {
      toast('No se pudo conectar con el servidor API.', 'error');
    }
  };

  // Mobile Upload via QR (No requiere login)
  if (location.pathname.startsWith('/mobile-upload/')) {
    const sessionId = location.pathname.split('/')[2];
    return <MobileUpload sessionId={sessionId} />;
  }

  // Login
  if (!token) return <Login setAuthToken={setToken} />;

  return (
    <>
      <Toast toasts={toasts} removeToast={removeToast} />
      
      <Layout handleLogout={handleLogout}>
        <Routes>
          <Route path="/" element={
            <DashboardPrincipal
              facturas={facturas}
              cargarFacturas={cargarFacturas}
              cargando={cargando}
              setCargando={setCargando}
              token={token}
              toast={toast}
              API_BASE={API_BASE}
              forzarEscaneo={forzarEscaneo}
              conciliarXML={conciliarXML}
              setMostrarModalSAT={setMostrarModalSAT}
            />
          } />
          <Route path="/gastos" element={<Gastos />} />
          <Route path="/pagos" element={<Pagos facturas={facturas} />} />
          <Route path="/conciliacion" element={<Conciliacion token={token} />} />
          <Route path="/compras" element={<ReporteConceptos token={token} onVolver={() => navigate('/')} />} />
          <Route path="/contabilidad" element={<MapeoContable token={token} onVolver={() => navigate('/')} />} />
          <Route path="/reps-huerfanos" element={<RepsHuerfanos token={token} />} />
          <Route path="/logs" element={<LogPanel visible={true} onClose={() => navigate('/')} inline={true} />} />
          <Route path="/auditoria" element={<AuditLogs token={token} />} />
          <Route path="/config" element={<Configuracion token={token} />} />
          <Route path="/usuarios" element={<UsuariosYPerfiles token={token} />} />
          <Route path="/config-empresa" element={<ConfiguradorEmpresa token={token} />} />
        </Routes>
      </Layout>

      {/* Modal Descarga SAT */}
      {mostrarModalSAT && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
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
            
            <div className="p-6 space-y-4 text-gray-300">
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
    </>
  );
}