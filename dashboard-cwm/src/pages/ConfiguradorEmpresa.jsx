import React, { useState } from 'react';
import { Upload, CheckCircle2, Lock, Building, FileKey, FileBadge } from 'lucide-react';
import { API_BASE } from '../api.js';
import { useEmpresa } from '../context/EmpresaContext.jsx';

export default function ConfiguradorEmpresa({ token }) {
  const { currentEmpresa, empresas, refrescarEmpresas } = useEmpresa();
  
  const [rfcForm, setRfcForm] = useState('');
  const [razonSocialForm, setRazonSocialForm] = useState('');
  const [cerFile, setCerFile] = useState(null);
  const [keyFile, setKeyFile] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  // Cuando se selecciona una empresa de la lista
  const handleSeleccionarEmpresa = (emp) => {
    setRfcForm(emp.rfc);
    setRazonSocialForm(emp.razon_social);
    setCerFile(null);
    setKeyFile(null);
    setPassword('');
    setMensaje(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rfcForm.trim()) {
      setError('El RFC es requerido');
      return;
    }
    
    setLoading(true);
    setMensaje(null);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('rfc', rfcForm);
      formData.append('razon_social', razonSocialForm);
      if (password) formData.append('fiel_password', password);
      if (cerFile) formData.append('cerFile', cerFile);
      if (keyFile) formData.append('keyFile', keyFile);
      
      const res = await fetch(`${API_BASE}/api/empresas/${rfcForm}/fiel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMensaje(data.mensaje || 'Credenciales guardadas correctamente');
        // Si era una empresa nueva, refrescar el contexto global
        if (!empresas.find(e => e.rfc === rfcForm)) {
           await refrescarEmpresas();
        }
      } else {
        setError(data.error || 'Error al guardar credenciales');
      }
    } catch (err) {
      console.error(err);
      setError('Error de red al comunicarse con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Building className="text-blue-500" />
          Configurador de Empresa y SAT
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Registra nuevas empresas o actualiza las credenciales FIEL necesarias para la sincronización automática de facturas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Selector de Empresas Existentes */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-medium text-white">Empresas Registradas</h3>
          <div className="flex-1 overflow-y-auto space-y-2 max-h-[400px]">
            {empresas.map((emp) => (
              <button
                key={emp.rfc}
                onClick={() => handleSeleccionarEmpresa(emp)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${rfcForm === emp.rfc ? 'bg-blue-900/30 border-blue-500' : 'bg-gray-800 border-gray-700 hover:border-gray-500'}`}
              >
                <div className="font-medium text-white">{emp.rfc}</div>
                <div className="text-xs text-gray-400 line-clamp-1">{emp.razon_social}</div>
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => handleSeleccionarEmpresa({ rfc: '', razon_social: '' })}
            className="w-full mt-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white p-2 rounded-lg text-sm transition-colors"
          >
            + Registrar Nueva Empresa
          </button>
        </div>

        {/* Formulario de Configuración */}
        <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-6">Datos y Credenciales FIEL</h3>
          
          {mensaje && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-800 rounded-lg flex items-center gap-3 text-green-400">
              <CheckCircle2 size={20} />
              <p className="text-sm font-medium">{mensaje}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">RFC de la Empresa</label>
                <input 
                  type="text" 
                  value={rfcForm}
                  onChange={(e) => setRfcForm(e.target.value.toUpperCase())}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-white"
                  placeholder="Ej. AAA010101AAA"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Razón Social</label>
                <input 
                  type="text" 
                  value={razonSocialForm}
                  onChange={(e) => setRazonSocialForm(e.target.value.toUpperCase())}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-white"
                  placeholder="Empresa S.A. de C.V."
                  required
                />
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h4 className="text-md font-medium text-gray-300 mb-4 flex items-center gap-2">
                <Lock size={16} /> Autenticación SAT (FIEL)
              </h4>
              
              <div className="space-y-4">
                {/* Certificado */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                    <FileBadge size={14} /> Certificado (.cer)
                  </label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".cer"
                      onChange={(e) => setCerFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full bg-gray-800 border border-gray-700 border-dashed rounded-lg p-3 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
                      <Upload size={16} />
                      {cerFile ? cerFile.name : 'Clic o arrastra el archivo .cer aquí'}
                    </div>
                  </div>
                </div>

                {/* Llave Privada */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
                    <FileKey size={14} /> Llave Privada (.key)
                  </label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept=".key"
                      onChange={(e) => setKeyFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full bg-gray-800 border border-gray-700 border-dashed rounded-lg p-3 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
                      <Upload size={16} />
                      {keyFile ? keyFile.name : 'Clic o arrastra el archivo .key aquí'}
                    </div>
                  </div>
                </div>

                {/* Contraseña */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Contraseña de la FIEL</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-white"
                    placeholder="Contraseña de clave privada"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Solo llena este campo si deseas cambiar/establecer la contraseña.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Guardar Configuración'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
