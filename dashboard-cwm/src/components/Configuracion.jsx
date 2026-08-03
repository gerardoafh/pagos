import React, { useState, useEffect } from 'react';
import { API_BASE } from '../api.js';
import { Save, AlertCircle, CheckCircle2, RefreshCw, Settings, Eye, EyeOff } from 'lucide-react';

export default function Configuracion({ token }) {
  const [config, setConfig] = useState({});
  const [mensaje, setMensaje] = useState(null); // { texto, tipo: 'exito' | 'error' | 'info' }
  const [guardando, setGuardando] = useState(false);
  const [camposVisibles, setCamposVisibles] = useState({});

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/config`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) setConfig(await res.json());
      } catch (err) {
        console.error("Error al cargar config", err);
      }
    };
    if (token) fetchConfig();
  }, [token]);

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const toggleVisibilidad = (key) => {
    setCamposVisibles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje({ texto: 'Guardando configuración...', tipo: 'info' });
    try {
      const res = await fetch(`${API_BASE}/api/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje({ texto: data.mensaje || 'Configuración guardada correctamente.', tipo: 'exito' });
      } else {
        setMensaje({ texto: data.error || 'Error al guardar.', tipo: 'error' });
      }
    } catch (err) {
      setMensaje({ texto: 'Error de red al intentar guardar la configuración.', tipo: 'error' });
    } finally {
      setGuardando(false);
      setTimeout(() => setMensaje(null), 5000);
    }
  };

  const esSecreto = (key) => config[key] === '***' || key.toLowerCase().includes('password') || key.toLowerCase().includes('secret') || key.toLowerCase().includes('token');

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-gray-800 p-2.5 rounded-lg text-gray-400">
            <Settings size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Configuración del Sistema</h2>
            <p className="text-gray-400 text-sm mt-0.5">Variables de entorno (.env) del servidor</p>
          </div>
        </div>
      </div>

      {/* Notificación */}
      {mensaje && (
        <div className={`animate-slide-down mb-6 p-4 rounded-xl flex items-center gap-3 border ${
          mensaje.tipo === 'exito' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
          mensaje.tipo === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
          'bg-blue-500/10 border-blue-500/20 text-blue-400'
        }`}>
          {mensaje.tipo === 'exito' ? <CheckCircle2 size={18} /> :
           mensaje.tipo === 'error' ? <AlertCircle size={18} /> :
           <RefreshCw size={18} className="animate-spin" />}
          <span className="font-medium text-sm">{mensaje.texto}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave}>
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800">
            {Object.keys(config).map((key) => (
              <div key={key} className="bg-gray-900 p-5">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{key}</label>
                <div className="relative">
                  <input
                    type={esSecreto(key) && !camposVisibles[key] ? 'password' : 'text'}
                    name={key}
                    value={config[key]}
                    onChange={handleChange}
                    className="w-full bg-gray-950 border border-gray-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all hover:border-gray-600 pr-10"
                  />
                  {esSecreto(key) && (
                    <button
                      type="button"
                      onClick={() => toggleVisibilidad(key)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      tabIndex={-1}
                    >
                      {camposVisibles[key] ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-gray-800 bg-gray-950/50 flex justify-end">
            <button 
              type="submit" 
              disabled={guardando}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-all text-sm shadow-lg shadow-blue-600/15 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {guardando ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Guardar Cambios
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}