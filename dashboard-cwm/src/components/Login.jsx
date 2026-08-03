import React, { useState } from 'react';
import { API_BASE } from '../api.js';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';

export default function Login({ setAuthToken }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    try {
      // Usamos el endpoint simulado que configuramos en api_server.js
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setAuthToken(data.token);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error de red al intentar conectar con el backend');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="animate-slide-up relative z-10 w-full max-w-md mx-4">
        {/* Glass card */}
        <div className="glass-card rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600/15 rounded-xl mb-4 border border-blue-500/20">
              <Lock size={24} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">APagos Admin</h2>
            <p className="text-gray-400 text-sm mt-1.5">Sistema de Pagos y Conciliación</p>
          </div>

          {/* Error */}
          {error && (
            <div className="animate-slide-down mb-6 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Usuario</label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="admin" 
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 hover:border-gray-600" 
                  value={usuario} 
                  onChange={(e) => setUsuario(e.target.value)} 
                  required 
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Contraseña</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 hover:border-gray-600" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={cargando}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-500 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {cargando ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-6">
          CWM — Sincronización automatizada SAT · NAS · CONTPAQi
        </p>
      </div>
    </div>
  );
}