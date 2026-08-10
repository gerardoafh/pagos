import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE } from '../api.js';

const EmpresaContext = createContext(null);

export function EmpresaProvider({ children }) {
  const [empresas, setEmpresas] = useState([]);
  const [currentEmpresa, setCurrentEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarEmpresas = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    return fetch(`${API_BASE}/api/empresas`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEmpresas(data);
          const savedRfc = localStorage.getItem('current_empresa_rfc');
          const found = savedRfc ? data.find(e => e.rfc === savedRfc) : null;
          setCurrentEmpresa(found || data[0] || null);
        }
      })
      .catch(err => console.error("Error fetching empresas", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarEmpresas();
  }, []);

  const changeEmpresa = (rfc) => {
    const empresa = empresas.find(e => e.rfc === rfc);
    if (empresa) {
      setCurrentEmpresa(empresa);
      localStorage.setItem('current_empresa_rfc', rfc);
    }
  };

  return (
    <EmpresaContext.Provider value={{ empresas, currentEmpresa, changeEmpresa, loading, refrescarEmpresas: cargarEmpresas }}>
      {children}
    </EmpresaContext.Provider>
  );
}

export function useEmpresa() {
  return useContext(EmpresaContext);
}
