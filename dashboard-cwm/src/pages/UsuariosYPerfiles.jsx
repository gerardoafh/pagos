import React, { useState, useEffect } from 'react';
import { API_BASE } from '../api.js';
import { Users, UserPlus, ShieldAlert, Edit2, Trash2, CheckCircle2, XCircle, KeyRound, AlertCircle, RefreshCw } from 'lucide-react';

export default function UsuariosYPerfiles({ token }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
    rol: 'contador',
    activo: true
  });

  const roles = [
    { value: 'admin', label: 'Administrador (Control Total)' },
    { value: 'contador', label: 'Contador (Gestión Financiera)' },
    { value: 'auditor', label: 'Auditor (Solo Lectura)' },
    { value: 'auxiliar', label: 'Auxiliar (Operativo)' }
  ];

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/usuarios`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setUsuarios(await res.json());
      } else {
        const data = await res.json();
        setError(data.error || 'No tienes permisos para ver esta sección');
      }
    } catch (err) {
      setError('Error al cargar la lista de usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUsuarios();
  }, [token]);

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingId(user.id);
      setFormData({
        usuario: user.usuario,
        password: '', // Leave blank unless changing
        rol: user.rol,
        activo: user.activo
      });
    } else {
      setEditingId(null);
      setFormData({
        usuario: '',
        password: '',
        rol: 'contador',
        activo: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    const isEditing = editingId !== null;
    const url = isEditing ? `${API_BASE}/api/usuarios/${editingId}` : `${API_BASE}/api/usuarios`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMensaje(isEditing ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente');
        fetchUsuarios();
        handleCloseModal();
        setTimeout(() => setMensaje(null), 3000);
      } else {
        setError(data.error || 'Error al guardar el usuario');
      }
    } catch (err) {
      setError('Error de comunicación con el servidor');
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    if (!window.confirm(`¿Estás seguro de que deseas ${currentStatus ? 'desactivar' : 'activar'} este usuario?`)) return;
    
    try {
      const user = usuarios.find(u => u.id === id);
      const res = await fetch(`${API_BASE}/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rol: user.rol, activo: !currentStatus }) // Mantener rol, cambiar activo
      });
      if (res.ok) {
        setMensaje(`Usuario ${currentStatus ? 'desactivado' : 'activado'} correctamente`);
        fetchUsuarios();
        setTimeout(() => setMensaje(null), 3000);
      }
    } catch (err) {
      setError('Error al cambiar el estado del usuario');
    }
  };

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <RefreshCw size={24} className="text-blue-500 animate-spin" />
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in p-4 md:p-8">
      {/* Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/10 p-2.5 rounded-lg text-blue-400">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Usuarios y Perfiles</h2>
            <p className="text-gray-400 text-sm mt-0.5">Gestiona el acceso y los roles administrativos del sistema</p>
          </div>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <UserPlus size={18} />
          Nuevo Usuario
        </button>
      </div>

      {mensaje && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg flex items-center gap-3">
          <CheckCircle2 size={20} />
          <span className="font-medium text-sm">{mensaje}</span>
        </div>
      )}

      {error && !showModal && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-center gap-3">
          <ShieldAlert size={20} />
          <span className="font-medium text-sm">{error}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-800/50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Perfil (Rol)</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Fecha Creación</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {usuarios.map(user => (
                <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-gray-300">
                        {user.usuario.substring(0,2).toUpperCase()}
                      </div>
                      <span className="font-medium text-white">{user.usuario}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      user.rol === 'admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      user.rol === 'contador' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      user.rol === 'auditor' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {user.rol.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.activo ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={user.activo ? 'text-gray-300' : 'text-red-400'}>
                        {user.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(user.creado_en).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => handleOpenModal(user)}
                      className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors"
                      title="Editar Usuario"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleToggleActive(user.id, user.activo)}
                      className={`p-1.5 rounded-md transition-colors ${
                        user.activo 
                          ? 'text-gray-500 hover:text-red-400 hover:bg-red-500/10' 
                          : 'text-gray-500 hover:text-green-400 hover:bg-green-500/10'
                      }`}
                      title={user.activo ? "Desactivar" : "Activar"}
                    >
                      {user.activo ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                    </button>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No se encontraron usuarios o no tienes permiso para verlos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-in">
            <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-gray-800/30">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {editingId ? <Edit2 size={18} className="text-blue-400" /> : <UserPlus size={18} className="text-green-400" />}
                {editingId ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-300">
                <XCircle size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-center gap-2 text-sm">
                  <AlertCircle size={16} /> {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nombre de Usuario</label>
                <input 
                  type="text" 
                  value={formData.usuario}
                  onChange={(e) => setFormData({...formData, usuario: e.target.value})}
                  disabled={!!editingId} // No permitir cambiar username si está editando
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-white disabled:opacity-50"
                  required
                  placeholder="ej. jperez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1 flex justify-between">
                  <span>Contraseña</span>
                  {editingId && <span className="text-xs text-gray-500">(Opcional: Dejar vacío para no cambiar)</span>}
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3 top-3 text-gray-500" />
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required={!editingId}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 pl-9 text-white"
                    placeholder={editingId ? "••••••••" : "Contraseña segura"}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Perfil (Rol)</label>
                <select 
                  value={formData.rol}
                  onChange={(e) => setFormData({...formData, rol: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-white"
                  required
                >
                  {roles.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              {editingId && (
                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="activo-check"
                    checked={formData.activo}
                    onChange={(e) => setFormData({...formData, activo: e.target.checked})}
                    className="w-4 h-4 rounded bg-gray-800 border-gray-700"
                  />
                  <label htmlFor="activo-check" className="text-sm text-gray-300">Usuario Activo en el sistema</label>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-medium transition-colors"
                >
                  {editingId ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
