import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  CreditCard, 
  TrendingUp, 
  FileSpreadsheet, 
  ShieldAlert, 
  Terminal, 
  Settings, 
  LogOut,
  Menu,
  X,
  FileText,
  Landmark,
  Building,
  Users
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useEmpresa } from '../context/EmpresaContext.jsx';

export default function Layout({ children, handleLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { empresas, currentEmpresa, changeEmpresa, loading } = useEmpresa();

  const navigation = [
    { name: 'Dashboard Principal', hash: '/', icon: LayoutDashboard },
    { name: 'Reporte de Gastos', hash: '/gastos', icon: Receipt },
    { name: 'Módulo de Pagos', hash: '/pagos', icon: CreditCard },
    { name: 'Conciliación Bancaria', hash: '/conciliacion', icon: Landmark },
    { name: 'Modulo de Compras', hash: '/compras', icon: TrendingUp },
    { name: 'Mapeo Contable', hash: '/contabilidad', icon: FileSpreadsheet },
    { name: 'REPs Huérfanos', hash: '/reps-huerfanos', icon: FileText },
  ];

  const system = [
    { name: 'Logs del Sistema', hash: '/logs', icon: Terminal },
    { name: 'Auditoría', hash: '/auditoria', icon: ShieldAlert },
    { name: 'Configurar SAT', hash: '/config-empresa', icon: Building },
    { name: 'Usuarios y Perfiles', hash: '/usuarios', icon: Users },
    { name: 'Configuración', hash: '/config', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col md:flex-row font-sans text-gray-200">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white tracking-tight">CWM</h1>
        <button 
          className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden md:block border-b border-gray-800">
          <h1 className="text-2xl font-bold text-white tracking-tight">CWM System</h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Pagos y Conciliación</p>
          
          <div className="mt-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-bold">Empresa Activa</p>
            {loading ? (
              <div className="h-8 bg-gray-800 rounded animate-pulse"></div>
            ) : (
              <select 
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                value={currentEmpresa?.rfc || ''}
                onChange={e => changeEmpresa(e.target.value)}
              >
                {empresas.map(e => (
                  <option key={e.rfc} value={e.rfc}>{e.razon_social}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          
          {/* Main Navigation */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Finanzas</p>
            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.hash}>
                    <NavLink
                      to={item.hash}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                        isActive 
                          ? 'bg-blue-600/10 text-blue-400' 
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      {({ isActive }) => (
                        <>
                          <Icon size={18} className={isActive ? 'text-blue-400' : 'text-gray-500'} />
                          {item.name}
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* System Navigation */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Sistema</p>
            <ul className="space-y-1">
              {system.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.hash}>
                    <NavLink
                      to={item.hash}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) => `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                        isActive 
                          ? 'bg-purple-600/10 text-purple-400' 
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      {({ isActive }) => (
                        <>
                          <Icon size={18} className={isActive ? 'text-purple-400' : 'text-gray-500'} />
                          {item.name}
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* The content will scroll inside this container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full animate-fade-in">
            {children}
          </div>
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
