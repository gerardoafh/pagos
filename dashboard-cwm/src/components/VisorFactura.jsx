import React, { useState, useEffect, useRef } from 'react';
import { API_BASE } from '../api.js';
import { X, Printer, Download, RefreshCw, FileText } from 'lucide-react';

export default function VisorFactura({ uuid, token, onClose }) {
  const [factura, setFactura] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/facturas/${uuid}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setFactura(await res.json());
        } else {
          setError('No se pudo cargar la factura.');
        }
      } catch (err) {
        setError('Error de red al cargar factura.');
      } finally {
        setLoading(false);
      }
    };
    if (uuid) fetchFactura();
  }, [uuid, token]);

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white">
          <RefreshCw size={32} className="animate-spin text-blue-500" />
          <p className="font-medium text-lg">Cargando Representación Visual...</p>
        </div>
      </div>
    );
  }

  if (error || !factura) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
          <FileText size={48} className="text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Error</h3>
          <p className="text-gray-400 mb-6">{error || 'Factura no encontrada'}</p>
          <button onClick={onClose} className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full">
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto no-print">
      <div className="min-h-screen p-4 flex justify-center py-10">
        
        {/* Floating Action Bar */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 rounded-full px-6 py-3 flex items-center gap-4 shadow-2xl z-50 no-print animate-fade-in">
          <button onClick={handlePrint} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <Printer size={18} /> <span className="font-medium">Imprimir / PDF</span>
          </button>
          <div className="w-px h-6 bg-gray-700"></div>
          <button onClick={onClose} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
            <X size={18} /> <span className="font-medium">Cerrar</span>
          </button>
        </div>

        {/* FACTURA CONTAINER (A4 format style) */}
        <div 
          ref={printRef} 
          className="print-container bg-white text-gray-900 w-full max-w-[850px] shadow-2xl p-10 mt-16 relative"
          style={{ minHeight: '1100px' }}
        >
          {/* Print only styles embedded */}
          <style>{`
            @media print {
              body * { visibility: hidden; }
              .print-container, .print-container * { visibility: visible; }
              .print-container { 
                position: absolute; 
                left: 0; 
                top: 0; 
                width: 100%; 
                margin: 0; 
                padding: 10px; 
                box-shadow: none; 
                color: black !important;
                background-color: white !important;
              }
              .no-print { display: none !important; }
            }
          `}</style>

          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-6">
            <div className="w-1/2">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase mb-2">Factura Electrónica</h1>
              <p className="text-sm font-bold text-gray-600 mb-1">EMISOR</p>
              <h2 className="text-lg font-bold text-blue-900">{factura.nombre_emisor}</h2>
              <p className="text-sm"><strong>RFC:</strong> {factura.rfc_emisor}</p>
              <p className="text-sm"><strong>Régimen Fiscal:</strong> {factura.regimen_fiscal_emisor || 'No especificado'}</p>
              <p className="text-sm"><strong>Lugar de Expedición (CP):</strong> {factura.cp_emisor || 'No especificado'}</p>
            </div>
            
            <div className="w-1/3 text-right">
              <div className="bg-gray-100 p-3 rounded-lg border border-gray-200 inline-block text-left w-full">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1 border-b border-gray-300 pb-1">Datos del Comprobante</p>
                <p className="text-sm mb-1"><strong className="text-gray-700">Folio:</strong> <span className="text-red-600 font-bold">{factura.folio_interno || 'S/F'}</span></p>
                <p className="text-sm mb-1"><strong className="text-gray-700">Fecha:</strong> {new Date(factura.fecha_emision).toLocaleString('es-MX')}</p>
                <p className="text-sm mb-1"><strong className="text-gray-700">Tipo:</strong> {factura.tipo_comprobante === 'I' ? 'Ingreso' : factura.tipo_comprobante === 'E' ? 'Egreso' : factura.tipo_comprobante === 'P' ? 'Pago' : factura.tipo_comprobante}</p>
                <p className="text-xs mt-2 text-gray-600 break-all"><strong className="text-gray-700 block">Folio Fiscal (UUID):</strong> {factura.uuid}</p>
              </div>
            </div>
          </div>

          {/* Receptor */}
          <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-8">
            <p className="text-sm font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1 uppercase">Receptor</p>
            <h2 className="text-lg font-bold text-gray-900">{factura.receptor_nombre || factura.nombre_receptor || 'Nombre no especificado'}</h2>
            <p className="text-sm"><strong>RFC:</strong> {factura.rfc_receptor}</p>
            <p className="text-sm mt-1">
              <strong>Método de Pago:</strong> {factura.metodo_pago || 'No especificado'} &nbsp;&nbsp;|&nbsp;&nbsp; 
              <strong>Moneda:</strong> {factura.moneda || 'MXN'} &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong>Tipo de Cambio:</strong> {factura.tipo_cambio || 1}
            </p>
          </div>

          {/* Conceptos Table */}
          <div className="mb-8 overflow-hidden rounded-lg border border-gray-300">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2 font-semibold">Cód. / ProdServ</th>
                  <th className="px-4 py-2 font-semibold">Cant. / Unidad</th>
                  <th className="px-4 py-2 font-semibold w-1/2">Descripción</th>
                  <th className="px-4 py-2 font-semibold text-right">V. Unitario</th>
                  <th className="px-4 py-2 font-semibold text-right">Importe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {factura.conceptos?.map((c, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 align-top">
                      <div className="font-medium">{c.no_identificacion || 'S/C'}</div>
                      <div className="text-xs text-gray-500">{c.clave_prod_serv}</div>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="font-bold">{c.cantidad}</div>
                      <div className="text-xs text-gray-500">{c.unidad} ({c.clave_unidad})</div>
                    </td>
                    <td className="px-4 py-3 align-top text-gray-700">{c.descripcion}</td>
                    <td className="px-4 py-3 align-top text-right whitespace-nowrap">{formatCurrency(c.valor_unitario)}</td>
                    <td className="px-4 py-3 align-top text-right font-medium whitespace-nowrap">{formatCurrency(c.importe)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-12">
            <div className="w-1/2 lg:w-1/3">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-2 text-right font-bold text-gray-600">Subtotal:</td>
                    <td className="py-2 text-right font-medium">{formatCurrency(factura.subtotal)}</td>
                  </tr>
                  {parseFloat(factura.iva) > 0 && (
                    <tr>
                      <td className="py-2 text-right font-bold text-gray-600">IVA (16%):</td>
                      <td className="py-2 text-right font-medium">{formatCurrency(factura.iva)}</td>
                    </tr>
                  )}
                  {parseFloat(factura.iva_retenido) > 0 && (
                    <tr>
                      <td className="py-2 text-right font-bold text-gray-600">Retención IVA:</td>
                      <td className="py-2 text-right font-medium text-red-600">-{formatCurrency(factura.iva_retenido)}</td>
                    </tr>
                  )}
                  {parseFloat(factura.isr_retenido) > 0 && (
                    <tr>
                      <td className="py-2 text-right font-bold text-gray-600">Retención ISR:</td>
                      <td className="py-2 text-right font-medium text-red-600">-{formatCurrency(factura.isr_retenido)}</td>
                    </tr>
                  )}
                  <tr className="border-t-2 border-gray-800">
                    <td className="py-3 text-right font-black text-gray-900 text-lg">TOTAL:</td>
                    <td className="py-3 text-right font-black text-blue-900 text-lg">{formatCurrency(factura.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sellos y Cadenas */}
          <div className="mt-8 border-t border-gray-300 pt-6 flex gap-4">
            {/* QR Code Placeholder */}
            <div className="w-32 h-32 bg-gray-200 border border-gray-300 p-2 flex items-center justify-center shrink-0">
              {/* This is a placeholder since generating SAT QRs requires specific formatting */}
              <div className="text-center text-xs text-gray-500">
                <span className="block border-2 border-dashed border-gray-400 w-24 h-24 mb-1 mx-auto"></span>
                Código QR SAT
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-700 uppercase">Sello Digital del CFDI</p>
                <p className="text-[9px] text-gray-500 break-all leading-tight font-mono">
                  {factura.sello_cfd || 'No disponible en base de datos. (Actualizar facturas para extraer)'}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-700 uppercase">Sello del SAT</p>
                <p className="text-[9px] text-gray-500 break-all leading-tight font-mono">
                  {factura.sello_sat || 'No disponible en base de datos. (Actualizar facturas para extraer)'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-700 uppercase">No. Certificado Emisor</p>
                  <p className="text-[10px] text-gray-600 font-mono">{factura.no_certificado || 'No disponible'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-700 uppercase">No. Certificado SAT</p>
                  <p className="text-[10px] text-gray-600 font-mono">{factura.no_certificado_sat || 'No disponible'}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-700 uppercase">Fecha y Hora de Certificación</p>
                <p className="text-[10px] text-gray-600 font-mono">
                  {factura.fecha_timbrado ? new Date(factura.fecha_timbrado).toLocaleString('es-MX') : 'No disponible'}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mt-8 pt-4 border-t border-gray-200">
            Este documento es una representación impresa de un CFDI
          </div>
        </div>
      </div>
    </div>
  );
}
