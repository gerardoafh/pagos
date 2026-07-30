import React, { useState, useEffect } from 'react';
import { API_BASE } from '../api.js';

export default function Configuracion({ token }) {
  const [config, setConfig] = useState({});
  const [mensaje, setMensaje] = useState('');

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

  const handleSave = async (e) => {
    e.preventDefault();
    setMensaje('Guardando...');
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
      setMensaje(data.mensaje || data.error);
    } catch (err) {
      setMensaje('Error al intentar guardar la configuración');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ Configuración del Sistema (.env)</h2>
      {mensaje && <div className="mb-6 p-3 bg-blue-100 text-blue-800 font-semibold rounded">{mensaje}</div>}
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(config).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">{key}</label>
            <input
              type={config[key] === '***' ? 'password' : 'text'}
              name={key}
              value={config[key]}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="col-span-1 md:col-span-2 mt-4 flex justify-end">
          <button type="submit" className="bg-green-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-green-700 transition duration-200">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}