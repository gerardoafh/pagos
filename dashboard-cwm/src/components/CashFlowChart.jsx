import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';

const API_BASE = 'http://localhost:3000';

export default function CashFlowChart({ token, currentEmpresa = 'Todas' }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlujo = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/dashboard/flujo?rfc_receptor=${currentEmpresa}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Error cargando gráfica de flujo:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchFlujo();
  }, [token, currentEmpresa]);

  if (loading) {
    return (
      <div className="w-full h-80 bg-gray-900 rounded-xl border border-gray-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-500 animate-pulse">
          <Activity size={32} />
          <span className="text-sm font-medium">Proyectando flujo de efectivo...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-80 bg-gray-900 rounded-xl border border-gray-800 flex items-center justify-center text-gray-500">
        No hay suficientes datos históricos para graficar.
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-xl">
          <p className="text-gray-300 font-bold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-gray-400">{entry.name}:</span>
              <span className="text-white font-medium">
                ${entry.value.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-blue-500" size={20} />
            Flujo de Efectivo
          </h2>
          <p className="text-sm text-gray-400 mt-1">Egresos pagados vs Compromisos pendientes por mes</p>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPagado" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPasivo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis dataKey="mes" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} tickMargin={10} axisLine={false} />
            <YAxis 
              stroke="#9ca3af" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }}/>
            <Area 
              type="monotone" 
              dataKey="pagado" 
              name="Capital Erogado" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPagado)" 
              activeDot={{ r: 6, fill: '#3b82f6', stroke: '#1e3a8a', strokeWidth: 2 }}
            />
            <Area 
              type="monotone" 
              dataKey="pasivo" 
              name="Pasivos Circulantes" 
              stroke="#ef4444" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPasivo)" 
              activeDot={{ r: 6, fill: '#ef4444', stroke: '#7f1d1d', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
