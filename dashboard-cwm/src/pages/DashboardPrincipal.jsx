import React, { useState, useEffect, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { 
  Search, 
  FolderOpen, 
  Clock, 
  CheckCircle2, 
  FileText,
  DownloadCloud,
  RefreshCw,
  Upload,
  ChevronLeft,
  ChevronRight,
  Camera,
  Trash2,
  Copy,
  Lock,
  Bot,
  Receipt,
  X,
  ShieldCheck,
  SearchCheck,
  XCircle,
  Smartphone
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../api.js';
import CashFlowChart from '../components/CashFlowChart.jsx';

export default function DashboardPrincipal({
  facturas,
  cargarFacturas,
  cargando,
  setCargando,
  token,
  toast,
  API_BASE,
  forzarEscaneo,
  conciliarXML,
  setMostrarModalSAT
}) {
  const [filtro, setFiltro] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroAnio, setFiltroAnio] = useState('todos');
  const [filtroMes, setFiltroMes] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  // Estados para el Ticket No Fiscal
  const [mostrarModalTicket, setMostrarModalTicket] = useState(false);
  const [archivoTicket, setArchivoTicket] = useState(null);
  const [subiendoTicket, setSubiendoTicket] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [qrSessionId, setQrSessionId] = useState(null);
  const imageRef = useRef(null);
  
  const [verificandoSAT, setVerificandoSAT] = useState({});
  const [aprobando, setAprobando] = useState({});

  const handleToggleAprobacion = async (uuid) => {
    setAprobando(prev => ({...prev, [uuid]: true}));
    try {
      const res = await fetch(`${API_BASE}/api/facturas/${uuid}/aprobar`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        toast(data.aprobado ? 'Factura aprobada para pago.' : 'Aprobación revocada.', 'success');
        cargarFacturas(); 
      } else {
        toast(data.error || 'No tienes permisos para aprobar.', 'error');
      }
    } catch (e) {
      toast('Error de conexión', 'error');
    } finally {
      setAprobando(prev => ({...prev, [uuid]: false}));
    }
  };

  const handleVerificarSAT = async (factura) => {
    setVerificandoSAT(prev => ({...prev, [factura.uuid]: true}));
    try {
      const res = await fetch(`${API_BASE}/api/fiscal/verificar-estatus-sat`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uuid: factura.uuid,
          rfcEmisor: factura.rfc,
          rfcReceptor: factura.rfc_receptor,
          total: factura.total
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast(`Estatus SAT: ${data.estatus_sat.toUpperCase()}`, data.esSeguroPagar ? 'success' : 'error');
        cargarFacturas();
      } else {
        toast(data.error || 'Falla al verificar.', 'error');
      }
    } catch (e) {
      toast('Error de conexión', 'error');
    } finally {
      setVerificandoSAT(prev => ({...prev, [factura.uuid]: false}));
    }
  };

  const getCroppedImg = (image, cropObj) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = cropObj.width;
    canvas.height = cropObj.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      cropObj.x * scaleX,
      cropObj.y * scaleY,
      cropObj.width * scaleX,
      cropObj.height * scaleY,
      0,
      0,
      cropObj.width,
      cropObj.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null);
          return;
        }
        resolve(new File([blob], 'cropped_ticket.jpg', { type: 'image/jpeg' }));
      }, 'image/jpeg');
    });
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCrop(undefined);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
        reader.readAsDataURL(file);
      } else {
        setImgSrc('');
      }
      setArchivoTicket(file);
    }
  };

  const iniciarVinculacionQR = () => {
    const newSessionId = Math.random().toString(36).substring(2, 10);
    setQrSessionId(newSessionId);
  };

  useEffect(() => {
    if (!qrSessionId) return;
    
    const socket = io(SOCKET_URL || API_BASE);
    
    const onQrCompleted = (data) => {
      if (data.success) {
        toast(`Ticket procesado vía QR: ${data.datosExtraidos?.proveedor || 'OK'}`, 'success');
        setMostrarModalTicket(false);
        setQrSessionId(null);
        cargarFacturas();
      } else {
        toast(`Error en el celular: ${data.error}`, 'error');
      }
    };

    socket.on(`qr_completed_${qrSessionId}`, onQrCompleted);

    return () => {
      socket.off(`qr_completed_${qrSessionId}`, onQrCompleted);
      socket.disconnect();
    };
  }, [qrSessionId]);

  const handleSubirTicket = async () => {
    if (!archivoTicket) return toast('Selecciona un archivo primero.', 'error');
    
    let fileToUpload = archivoTicket;
    if (completedCrop && completedCrop.width && completedCrop.height && imageRef.current) {
      const croppedFile = await getCroppedImg(imageRef.current, completedCrop);
      if (croppedFile) fileToUpload = croppedFile;
    }

    const formData = new FormData();
    formData.append('documento', fileToUpload);
    try {
      setSubiendoTicket(true);
      const res = await fetch(`${API_BASE}/api/recibos/subir`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        toast(`Ticket procesado con éxito: ${data.datosExtraidos?.proveedor || 'OK'}`, 'success');
        setMostrarModalTicket(false);
        setArchivoTicket(null);
        setImgSrc('');
        setCompletedCrop(null);
        cargarFacturas();
      } else {
        toast(`Error: ${data.error}`, 'error');
      }
    } catch (error) {
      toast('Falla de conexión al subir el ticket.', 'error');
    } finally {
      setSubiendoTicket(false);
    }
  };

  // Reiniciar a la página 1 cuando cambian los filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, filtro, filtroTipo, filtroAnio, filtroMes]);

  // Cálculos
  const totalPendiente = facturas.filter(f => f.estatus === 'pendiente' && f.tipo_comprobante?.toUpperCase() !== 'E' && f.tipo_comprobante?.toUpperCase() !== 'P').reduce((acc, f) => acc + Number(f.total), 0);
  const totalPagado = facturas.filter(f => f.estatus === 'pagado').reduce((acc, f) => acc + Number(f.total), 0);
  const totalRetencionesPendientes = facturas.filter(f => f.estatus === 'pendiente' && f.tipo_comprobante?.toUpperCase() === 'I').reduce((acc, f) => acc + Number(f.total_retenciones || 0), 0);
  const aniosDisponibles = [...new Set(facturas.map(f => f.fecha_emision ? f.fecha_emision.split('-')[0] : null).filter(Boolean))].sort((a, b) => b - a);

  const facturasFiltradas = facturas.filter(factura => {
    const coincideFiltroEstatus = filtro === 'todos' || factura.estatus === filtro;
    const coincideFiltroTipo = filtroTipo === 'todos' || 
                               (filtroTipo === 'factura' && factura.tipo_comprobante?.toUpperCase() !== 'P') || 
                               (filtroTipo === 'complemento' && factura.tipo_comprobante?.toUpperCase() === 'P');
    
    const fecha = factura.fecha_emision || '';
    const [anio, mes] = fecha.split('-');
    const coincideAnio = filtroAnio === 'todos' || anio === filtroAnio;
    const coincideMes = filtroMes === 'todos' || mes === filtroMes;
    
    const proveedorStr = factura.proveedor ? factura.proveedor.toLowerCase() : '';
    const rfcStr = factura.rfc ? factura.rfc.toLowerCase() : '';
    const folioStr = factura.folio_interno ? factura.folio_interno.toLowerCase() : '';
    const uuidStr = factura.uuid ? factura.uuid.toLowerCase() : '';
    
    const coincideBusqueda = proveedorStr.includes(busqueda.toLowerCase()) || 
                             rfcStr.includes(busqueda.toLowerCase()) ||
                             folioStr.includes(busqueda.toLowerCase()) ||
                             uuidStr.includes(busqueda.toLowerCase());
                             
    return coincideFiltroEstatus && coincideFiltroTipo && coincideBusqueda && coincideAnio && coincideMes;
  });

  const itemsPorPagina = 50;
  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  const facturasPaginadas = facturasFiltradas.slice(indicePrimerItem, indiceUltimoItem);
  const totalPaginas = Math.ceil(facturasFiltradas.length / itemsPorPagina);

  const formatearMoneda = (monto) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(monto);
  };

  const obtenerNombreCorto = (nombre) => {
    if (!nombre) return '';
    return nombre
      .replace(/,?\s*\b(S\.?A\.?P\.?I\.?|S\.?A\.?B\.?|S\.?A\.?|S\.?\s*DE\s*R\.?L\.?|S\.?A\.?S\.?|S\.?C\.?|A\.?C\.?|SOCIEDAD\s+AN[OÓ]NIMA|INSTITUCI[OÓ]N\s+DE\s+BANCA\s+M[UÚ]LTIPLE|GRUPO\s+FINANCIERO)(\s+DE\s+C\.?V\.?)?\b.*$/i, '')
      .trim();
  };

  const copiarAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto);
    toast(`UUID copiado: ${texto.substring(0, 20)}...`, 'success');
  };

  const handleSubidaManual = async (event, uuid) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('documento', file);
    try {
      setCargando(true);
      const res = await fetch(`${API_BASE}/api/subir-pago/${uuid}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        toast('Documento adjuntado y expediente armado correctamente en el NAS.', 'success');
        cargarFacturas(); 
      } else {
        const errorData = await res.json();
        toast(`Error del servidor: ${errorData.error || 'No se pudo procesar el archivo.'}`, 'error');
      }
    } catch (error) {
      toast('Falla de conexión al intentar subir el documento.', 'error');
    } finally {
      setCargando(false);
    }
  };

  const handleEliminarPago = async (uuid) => {
    if (!window.confirm('¿Estás seguro de eliminar este pago? La factura volverá al estatus "Pendiente" y el archivo se borrará del NAS.')) return;
    try {
      setCargando(true);
      const res = await fetch(`${API_BASE}/api/eliminar-pago/${uuid}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast('Pago eliminado correctamente.', 'success');
        cargarFacturas();
      } else {
        const errorData = await res.json();
        toast(`Error del servidor: ${errorData.error || 'No se pudo eliminar el archivo.'}`, 'error');
      }
    } catch (error) {
      toast('Falla de conexión al intentar eliminar el pago.', 'error');
    } finally {
      setCargando(false);
    }
  };

  const obtenerEnlaceLocal = (ruta) => {
    let rutaWindows = ruta;
    if (ruta.startsWith('/mnt/nas_pagos')) {
      rutaWindows = ruta.replace('/mnt/nas_pagos', '\\\\192.168.1.15\\pagos');
    } else if (ruta.startsWith('//192.168.1.15')) {
      rutaWindows = ruta.replace(/\//g, '\\');
    }
    rutaWindows = rutaWindows.replace(/\//g, '\\');
    return `file:///${rutaWindows}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Encabezado Principal y Acciones Rápidas */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Inicio</h2>
          <p className="text-sm text-gray-400 mt-1">Sincronización automatizada CWM - NAS</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setMostrarModalTicket(true)} className="flex items-center gap-2 bg-orange-600/10 hover:bg-orange-600/20 text-orange-400 px-4 py-2 rounded-xl transition-all border border-orange-500/20 shadow-sm text-sm font-semibold">
            <Receipt size={16} /> Subir Ticket
          </button>
          <button onClick={() => setMostrarModalSAT(true)} className="flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 px-4 py-2 rounded-xl transition-all border border-blue-500/20 shadow-sm text-sm font-semibold">
            <DownloadCloud size={16} /> Descargar SAT
          </button>
          <button onClick={forzarEscaneo} className="flex items-center gap-2 bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 px-4 py-2 rounded-xl transition-all border border-purple-500/20 shadow-sm text-sm font-semibold">
            <Bot size={16} /> Escaneo NAS
          </button>
          <button onClick={conciliarXML} className="flex items-center gap-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 px-4 py-2 rounded-xl transition-all border border-emerald-500/20 shadow-sm text-sm font-semibold">
            <FileText size={16} /> Conciliar XML
          </button>
        </div>
      </div>

      {/* Tarjetas de KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-stagger">
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <p className="text-gray-400 text-sm font-medium">Obligaciones Pendientes</p>
            <p className="text-2xl font-bold text-white mt-1">{formatearMoneda(totalPendiente)}</p>
          </div>
          <div className="bg-orange-500/10 p-3 rounded-xl text-orange-500 shadow-inner">
            <Clock size={24} />
          </div>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <p className="text-gray-400 text-sm font-medium">Conciliado (Histórico)</p>
            <p className="text-2xl font-bold text-white mt-1">{formatearMoneda(totalPagado)}</p>
          </div>
          <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500 shadow-inner">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <p className="text-gray-400 text-sm font-medium">Documentos</p>
            <p className="text-2xl font-bold text-white mt-1">{facturas.length}</p>
          </div>
          <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500 shadow-inner">
            <FileText size={24} />
          </div>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <p className="text-gray-400 text-sm font-medium">Retenciones Pendientes</p>
            <p className="text-2xl font-bold text-white mt-1">{formatearMoneda(totalRetencionesPendientes)}</p>
          </div>
          <div className="bg-purple-500/10 p-3 rounded-xl text-purple-500 shadow-inner">
            <Lock size={24} />
          </div>
        </div>
      </div>

      {/* Gráfica de Flujo de Efectivo */}
      <CashFlowChart token={token} currentEmpresa="Todas" />

      {/* Barra de Búsqueda y Filtros */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-4 bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-lg">
        <div className="relative w-full xl:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar proveedor, RFC, folio o UUID..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        
        <div className="flex flex-wrap gap-3 w-full xl:w-auto items-center justify-start xl:justify-end">
          <select
            value={filtroAnio}
            onChange={(e) => setFiltroAnio(e.target.value)}
            className="w-full sm:w-auto bg-gray-950 border border-gray-800 text-gray-400 text-sm rounded-xl focus:outline-none focus:border-blue-500 px-3 py-2.5 transition-colors cursor-pointer"
          >
            <option value="todos">Todos los años</option>
            {aniosDisponibles.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <select
            value={filtroMes}
            onChange={(e) => setFiltroMes(e.target.value)}
            className="w-full sm:w-auto bg-gray-950 border border-gray-800 text-gray-400 text-sm rounded-xl focus:outline-none focus:border-blue-500 px-3 py-2.5 transition-colors cursor-pointer"
          >
            <option value="todos">Todos los meses</option>
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>

          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="w-full sm:w-auto bg-gray-950 border border-gray-800 text-gray-400 text-sm rounded-xl focus:outline-none focus:border-blue-500 px-3 py-2.5 transition-colors cursor-pointer"
          >
            <option value="todos">Todos los tipos</option>
            <option value="factura">Solo Facturas</option>
            <option value="complemento">Solo Complementos</option>
          </select>

          <div className="flex bg-gray-950 rounded-xl p-1 border border-gray-800 w-full sm:w-auto">
            {['todos', 'pendiente', 'pagado'].map((estado) => (
              <button
                key={estado}
                onClick={() => setFiltro(estado)}
                className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors ${
                  filtro === estado 
                    ? 'bg-gray-800 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {estado}
              </button>
            ))}
            <button 
              onClick={cargarFacturas} 
              className="ml-2 px-3 py-1.5 text-gray-500 hover:text-white transition-colors flex items-center justify-center"
              title="Refrescar Tabla"
            >
              <RefreshCw size={16} className={cargando ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de Datos */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg flex flex-col">
        <div className="overflow-x-auto overflow-y-auto max-h-[65vh] 2xl:max-h-[70vh]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-950/90 backdrop-blur-md sticky top-0 z-10 border-b border-gray-800 text-gray-400">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Fecha Emisión</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Folio</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">UUID</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Proveedor</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs hidden md:table-cell">RFC</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Subtotal</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">IVA</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Total</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-center">Método Pago</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-center">Tipo CFDI</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-center">Expediente</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-center">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {cargando ? (
                <tr>
                  <td colSpan="12" className="px-6 py-16 text-center text-gray-500">
                    <RefreshCw size={32} className="animate-spin mx-auto mb-4 opacity-50 text-blue-500" />
                    <p className="font-medium text-gray-400">Sincronizando con base de datos...</p>
                  </td>
                </tr>
              ) : facturasPaginadas.length > 0 ? (
                facturasPaginadas.map((factura) => (
                  <tr key={factura.uuid} className="hover:bg-gray-800/30 transition-colors">
                    
                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{factura.fecha_emision}</td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {factura.folio_interno ? (
                        <div className="flex items-center gap-2 group">
                          <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{factura.folio_interno}</span>
                          <button onClick={() => copiarAlPortapapeles(factura.folio_interno)} className="text-gray-600 hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" title="Copiar Folio al portapapeles">
                            <Copy size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-700">-</span>
                      )}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 group">
                        <span className="text-xs font-mono text-gray-500 select-all group-hover:text-gray-400 transition-colors" title="Doble clic para seleccionar">{factura.uuid}</span>
                        <button 
                          onClick={() => copiarAlPortapapeles(factura.uuid)}
                          className="p-1.5 text-gray-600 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-all opacity-0 group-hover:opacity-100"
                          title="Copiar UUID al portapapeles"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-300 flex items-center gap-2" title={factura.proveedor}>
                        {obtenerNombreCorto(factura.proveedor)}
                        {factura.tipo_comprobante?.toUpperCase() === 'I' && factura.metodo_pago === 'PPD' && factura.estatus === 'pagado' && !factura.tiene_complemento && (
                          <span title="Falta XML de Complemento de Pago (REP). Póliza de egreso bloqueada." className="cursor-help text-red-500 flex items-center bg-red-500/10 p-1 rounded">
                            <Lock size={12} />
                          </span>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell font-mono text-xs">{factura.rfc}</td>
                    
                    <td className="px-6 py-4 text-right text-gray-400">{formatearMoneda(factura.subtotal)}</td>
                    <td className="px-6 py-4 text-right text-gray-400">{formatearMoneda(factura.iva)}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-200">
                      {formatearMoneda(factura.total)}
                      {factura.moneda_original && factura.moneda_original !== 'MXN' && (
                        <div className="text-xs text-gray-500 mt-0.5 font-normal" title={`Monto original: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: factura.moneda_original }).format(factura.total_original_moneda)} @ ${factura.tipo_cambio_xml} MXN/${factura.moneda_original}`}>
                          ({new Intl.NumberFormat('en-US', { style: 'currency', currency: factura.moneda_original }).format(factura.total_original_moneda)} {factura.moneda_original})
                          {factura.tipo_cambio_xml && <span className="ml-1 text-gray-600">@{factura.tipo_cambio_xml}</span>}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {factura.metodo_pago && (
                        <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold border uppercase tracking-wider ${factura.metodo_pago === 'PPD' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                          {factura.metodo_pago}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-xs font-medium text-gray-400 bg-gray-950/30">
                      {factura.tipo_cfdi}
                    </td>
                    
                    <td className="px-6 py-4 text-center">
                      {factura.estatus === 'pagado' ? (
                        <div className="flex items-center justify-center gap-1">
                          {factura.expediente && (
                            <a 
                              href={obtenerEnlaceLocal(factura.expediente)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                              title={factura.expediente}
                            >
                              <FolderOpen size={18} />
                            </a>
                          )}
                          <button
                            onClick={() => handleEliminarPago(factura.uuid)}
                            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="Eliminar comprobante / Deshacer pago"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          {factura.expediente ? (
                            <a 
                              href={obtenerEnlaceLocal(factura.expediente)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                              title={factura.expediente}
                            >
                              <FolderOpen size={18} />
                            </a>
                          ) : (
                            <span className="text-gray-700 inline-flex items-center justify-center p-2" title="Carpeta aún no generada">
                              <FolderOpen size={18} />
                            </span>
                          )}
                          <label 
                            className="cursor-pointer inline-flex items-center justify-center p-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                            title="Adjuntar comprobante manual"
                          >
                            <Upload size={18} />
                            <input 
                              type="file" 
                              className="hidden" 
                              onChange={(e) => handleSubidaManual(e, factura.uuid)} 
                              accept=".pdf,.jpg,.jpeg,.png" 
                            />
                          </label>
                          <label 
                            className="cursor-pointer inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors md:hidden"
                            title="Tomar foto de comprobante"
                          >
                            <Camera size={18} />
                            <input 
                              type="file" 
                              className="hidden" 
                              onChange={(e) => handleSubidaManual(e, factura.uuid)} 
                              accept="image/*" 
                              capture="environment"
                            />
                          </label>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col gap-1 items-center justify-center">
                        {factura.tipo_comprobante?.toUpperCase() === 'P' ? (
                          <span className="inline-flex items-center justify-center gap-1.5 bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-lg text-xs font-semibold border border-purple-500/20 w-full">
                            <FileText size={14} /> Informativo
                          </span>
                        ) : factura.estatus === 'pagado' ? (
                          <span className="inline-flex items-center justify-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-500/20 w-full">
                            <CheckCircle2 size={14} /> Pagado
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center gap-1.5 bg-orange-500/10 text-orange-400 px-3 py-1.5 rounded-lg text-xs font-semibold border border-orange-500/20 w-full">
                            <Clock size={14} /> Pendiente
                          </span>
                        )}
                        <div className="flex w-full gap-1 mt-1">
                          <button 
                            onClick={() => handleToggleAprobacion(factura.uuid)}
                            disabled={aprobando[factura.uuid]}
                            className={`flex-1 flex justify-center items-center py-1 rounded transition-colors text-xs font-medium border ${
                              factura.aprobado 
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30' 
                                : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white'
                            }`}
                            title={factura.aprobado ? 'Revocar Aprobación' : 'Aprobar para pago'}
                          >
                            {aprobando[factura.uuid] ? <RefreshCw size={12} className="animate-spin" /> : <ShieldCheck size={12} />}
                          </button>
                          
                          <button 
                            onClick={() => handleVerificarSAT(factura)}
                            disabled={verificandoSAT[factura.uuid] || !factura.rfc_receptor}
                            className={`flex-1 flex justify-center items-center py-1 rounded transition-colors text-xs font-medium border ${
                              factura.estatus_fiscal === 'vigente' 
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                                : factura.estatus_fiscal === 'cancelado'
                                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white'
                            }`}
                            title="Verificar estatus en el SAT"
                          >
                            {verificandoSAT[factura.uuid] ? <RefreshCw size={12} className="animate-spin" /> : factura.estatus_fiscal === 'cancelado' ? <XCircle size={12} /> : <SearchCheck size={12} />}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="px-6 py-12 text-center text-gray-500">
                    No se encontraron facturas con los filtros actuales.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {totalPaginas > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-gray-900/50">
            <span className="text-sm text-gray-400">
              Mostrando <span className="text-white font-medium">{indicePrimerItem + 1}</span> a <span className="text-white font-medium">{Math.min(indiceUltimoItem, facturasFiltradas.length)}</span> de <span className="text-white font-medium">{facturasFiltradas.length}</span> resultados
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
                disabled={paginaActual === 1}
                className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
                disabled={paginaActual === totalPaginas}
                className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Subir Ticket (No Fiscal) */}
      {mostrarModalTicket && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-gray-900 border border-orange-500/30 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Receipt size={20} className="text-orange-400" />
                Subir Ticket (No Fiscal)
              </h3>
              <button onClick={() => { setMostrarModalTicket(false); setArchivoTicket(null); }} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-gray-300">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                <p className="text-xs text-orange-300">
                  Sube una foto o PDF de un recibo, nota de remisión o ticket (sin validez fiscal). 
                  Nuestra IA extraerá el proveedor, concepto, fecha y monto automáticamente.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Origen del Archivo</label>
                {qrSessionId ? (
                  <div className="bg-gray-800 border border-orange-500/30 rounded-lg p-6 flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-300 mb-4 text-center">Escanea este código con tu celular para subir la foto directamente.</p>
                    <div className="bg-white p-2 rounded-lg">
                      <QRCodeSVG 
                        value={`${window.location.origin}/#mobile-upload/${qrSessionId}`}
                        size={200}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"H"}
                      />
                    </div>
                    <button 
                      onClick={() => setQrSessionId(null)}
                      className="mt-6 text-sm text-gray-400 hover:text-white"
                    >
                      Volver a opciones
                    </button>
                  </div>
                ) : !imgSrc && !archivoTicket ? (
                  <div className="grid grid-cols-3 gap-3">
                    <label className="flex flex-col items-center justify-center bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors">
                      <Camera size={24} className="text-orange-400 mb-2" />
                      <span className="text-sm font-medium text-white">Cámara</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        capture="environment"
                        onChange={onSelectFile}
                        className="hidden"
                      />
                    </label>
                    <button 
                      onClick={iniciarVinculacionQR}
                      className="flex flex-col items-center justify-center bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                    >
                      <Smartphone size={24} className="text-orange-400 mb-2" />
                      <span className="text-sm font-medium text-white">QR Celular</span>
                    </button>
                    <label className="flex flex-col items-center justify-center bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors">
                      <FolderOpen size={24} className="text-orange-400 mb-2" />
                      <span className="text-sm font-medium text-white">Galería / PDF</span>
                      <input 
                        type="file" 
                        accept="image/*,.pdf"
                        onChange={onSelectFile}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-white truncate max-w-[200px]">
                        {archivoTicket?.name || 'Archivo seleccionado'}
                      </span>
                      <button 
                        onClick={() => { setArchivoTicket(null); setImgSrc(''); setCrop(undefined); setCompletedCrop(null); }}
                        className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm"
                      >
                        <Trash2 size={16} /> Quitar
                      </button>
                    </div>
                    
                    {imgSrc && (
                      <div className="max-h-[40vh] overflow-auto border border-gray-600 rounded-md bg-black w-full flex flex-col items-center">
                        <ReactCrop
                          crop={crop}
                          onChange={(_, percentCrop) => setCrop(percentCrop)}
                          onComplete={(c) => setCompletedCrop(c)}
                        >
                          <img 
                            ref={imageRef}
                            src={imgSrc} 
                            alt="Crop" 
                            style={{ maxHeight: '40vh', width: 'auto' }}
                          />
                        </ReactCrop>
                        <p className="text-xs text-center text-gray-400 mt-2 pb-2 px-2">
                          Arrastra las esquinas para recortar solo el ticket.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-800 flex justify-end gap-3 bg-gray-900/50">
              <button 
                onClick={() => { setMostrarModalTicket(false); setArchivoTicket(null); setImgSrc(''); setCompletedCrop(null); setQrSessionId(null); }}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                disabled={subiendoTicket}
              >
                Cancelar
              </button>
              <button 
                onClick={handleSubirTicket}
                disabled={subiendoTicket || !archivoTicket}
                className="px-4 py-2 text-sm font-medium rounded-lg text-white shadow-lg transition-colors flex items-center gap-2 bg-orange-600 hover:bg-orange-500 shadow-orange-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subiendoTicket ? <RefreshCw size={16} className="animate-spin" /> : <Upload size={16} />}
                {subiendoTicket ? 'Procesando IA...' : 'Subir y Procesar'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
