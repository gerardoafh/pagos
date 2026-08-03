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
  Landmark
} from 'lucide-react';

export default function Layout({ children, currentHash, handleLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard Principal', hash: '', icon: LayoutDashboard },
    { name: 'Reporte de Gastos', hash: 'gastos', icon: Receipt },
    { name: 'Módulo de Pagos', hash: 'pagos', icon: CreditCard },
    { name: 'Conciliación Bancaria', hash: 'conciliacion', icon: Landmark },
    { name: 'Inteligencia Compras', hash: 'compras', icon: TrendingUp },
    { name: 'Mapeo Contable', hash: 'contabilidad', icon: FileSpreadsheet },
    { name: 'REPs Huérfanos', hash: 'reps-huerfanos', icon: FileText },
  ];

  const system = [
    { name: 'Logs del Sistema', hash: 'logs', icon: Terminal },
    { name: 'Auditoría', hash: 'auditoria', icon: ShieldAlert },
    { name: 'Configuración', hash: 'config', icon: Settings },
  ];

  const navigateTo = (hash) => {
    window.location.hash = hash;
    setSidebarOpen(false);
  };

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
        <div className="p-6 hidden md:block">
          <h1 className="text-2xl font-bold text-white tracking-tight">CWM System</h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Pagos y Conciliación</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          
          {/* Main Navigation */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Finanzas</p>
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = currentHash === item.hash;
                const Icon = item.icon;
                return (
                  <li key={item.hash}>
                    <button
                      onClick={() => navigateTo(item.hash)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                        isActive 
                          ? 'bg-blue-600/10 text-blue-400' 
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-blue-400' : 'text-gray-500'} />
                      {item.name}
                    </button>
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
                const isActive = currentHash === item.hash;
                const Icon = item.icon;
                return (
                  <li key={item.hash}>
                    <button
                      onClick={() => navigateTo(item.hash)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                        isActive 
                          ? 'bg-purple-600/10 text-purple-400' 
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-purple-400' : 'text-gray-500'} />
                      {item.name}
                    </button>
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
