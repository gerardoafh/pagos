import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal, Trash2, ChevronDown } from 'lucide-react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../api.js';

// Colores por tipo de línea
function getLineStyle(linea) {
  if (linea.startsWith('✅') || linea.startsWith('✔')) return '#4ade80'; // verde
  if (linea.startsWith('❌')) return '#f87171'; // rojo
  if (linea.startsWith('⚠️')) return '#facc15'; // amarillo
  if (linea.startsWith('🚀') || linea.startsWith('☁️') || linea.startsWith('🤖')) return '#60a5fa'; // azul
  if (linea.startsWith('📥') || linea.startsWith('📦')) return '#c084fc'; // morado
  return '#e2e8f0'; // blanco/gris por defecto
}

export default function LogPanel({ visible, onClose }) {
  const [logs, setLogs] = useState([]);
  const [filtroTarea, setFiltroTarea] = useState('todos');
  const [autoScroll, setAutoScroll] = useState(true);
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('process-log', (data) => {
      setLogs(prev => [...prev.slice(-500), { // Mantener máx 500 líneas
        id: Date.now() + Math.random(),
        tarea: data.tarea,
        linea: data.linea,
        ts: data.ts,
      }]);
    });

    socket.on('task-completed', (data) => {
      setLogs(prev => [...prev, {
        id: Date.now() + Math.random(),
        tarea: data.task,
        linea: `✅ [FIN] ${data.message}`,
        ts: new Date().toISOString(),
      }]);
    });

    socket.on('task-error', (data) => {
      setLogs(prev => [...prev, {
        id: Date.now() + Math.random(),
        tarea: data.task,
        linea: `❌ [ERROR] ${data.error}`,
        ts: new Date().toISOString(),
      }]);
    });

    return () => socket.disconnect();
  }, []);

  // Auto-scroll al fondo cuando llegan nuevos logs
  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  // Detectar scroll manual para desactivar auto-scroll
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const atBottom = scrollHeight - scrollTop - clientHeight < 50;
    setAutoScroll(atBottom);
  };

  const tareas = ['todos', ...new Set(logs.map(l => l.tarea).filter(Boolean))];
  const logsFiltrados = filtroTarea === 'todos' ? logs : logs.filter(l => l.tarea === filtroTarea);

  const formatTime = (ts) => {
    try {
      return new Date(ts).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch { return ''; }
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '380px',
      background: '#0f172a',
      borderTop: '2px solid #334155',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9999,
      fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace',
      boxShadow: '0 -8px 32px rgba(0,0,0,0.5)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 16px',
        background: '#1e293b',
        borderBottom: '1px solid #334155',
        flexShrink: 0,
      }}>
        <Terminal size={16} color="#60a5fa" />
        <span style={{ color: '#60a5fa', fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em' }}>
          LOG DE PROCESOS — SAT / NAS / XML
        </span>

        {/* Filtro por tarea */}
        <select
          value={filtroTarea}
          onChange={e => setFiltroTarea(e.target.value)}
          style={{
            marginLeft: 'auto',
            background: '#0f172a',
            border: '1px solid #334155',
            color: '#94a3b8',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          {tareas.map(t => (
            <option key={t} value={t}>{t === 'todos' ? 'Todas las tareas' : t}</option>
          ))}
        </select>

        {/* Auto-scroll indicator */}
        <button
          onClick={() => { setAutoScroll(true); bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
          title="Ir al final"
          style={{
            background: autoScroll ? '#1d4ed8' : '#334155',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            padding: '3px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
          }}
        >
          <ChevronDown size={12} /> Final
        </button>

        {/* Limpiar */}
        <button
          onClick={() => setLogs([])}
          title="Limpiar logs"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px' }}
        >
          <Trash2 size={14} />
        </button>

        {/* Cerrar */}
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Log output */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1px',
        }}
      >
        {logsFiltrados.length === 0 ? (
          <div style={{ color: '#475569', fontSize: '12px', marginTop: '16px', textAlign: 'center' }}>
            Esperando actividad... Dispara una tarea (Sync SAT, Escanear NAS, Leer XMLs) para ver los logs aquí.
          </div>
        ) : (
          logsFiltrados.map(log => (
            <div key={log.id} style={{ display: 'flex', gap: '12px', fontSize: '12px', lineHeight: '1.6' }}>
              <span style={{ color: '#475569', flexShrink: 0, userSelect: 'none' }}>
                {formatTime(log.ts)}
              </span>
              <span style={{ color: '#64748b', flexShrink: 0, userSelect: 'none', fontSize: '11px' }}>
                [{log.tarea?.split(' ')[0] || '—'}]
              </span>
              <span style={{ color: getLineStyle(log.linea), wordBreak: 'break-all' }}>
                {log.linea}
              </span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Status bar */}
      <div style={{
        padding: '3px 16px',
        background: '#1e293b',
        borderTop: '1px solid #1e293b',
        fontSize: '11px',
        color: '#475569',
        flexShrink: 0,
      }}>
        {logsFiltrados.length} líneas{!autoScroll && ' · Scroll manual activado — haz clic en "Final" para volver al live'}
      </div>
    </div>
  );
}
