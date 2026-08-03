import { XMLParser } from 'fast-xml-parser';

export function extractCFDIData(xmlContent) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: ""
  });
  
  try {
    const parsed = parser.parse(xmlContent);
    const comprobante = parsed['cfdi:Comprobante'] || parsed.Comprobante;
    if (!comprobante) return null;

    // Emisor y Receptor
    const emisor = comprobante['cfdi:Emisor'] || comprobante.Emisor || {};
    const receptor = comprobante['cfdi:Receptor'] || comprobante.Receptor || {};

    // Impuestos y Retenciones
    const impuestos = comprobante['cfdi:Impuestos'] || comprobante.Impuestos || {};
    const traslados = impuestos['cfdi:Traslados']?.['cfdi:Traslado'] || impuestos.Traslados?.Traslado || [];
    const retenciones = impuestos['cfdi:Retenciones']?.['cfdi:Retencion'] || impuestos.Retenciones?.Retencion || [];

    // Normalizar arrays
    const trasladosArr = Array.isArray(traslados) ? traslados : [traslados];
    const retencionesArr = Array.isArray(retenciones) ? retenciones : [retenciones];

    // Cálculos
    let iva = 0;
    let iva_retenido = 0;
    let isr_retenido = 0;

    trasladosArr.forEach(t => {
      if (t && (t.Impuesto === '002' || t.Impuesto === 'IVA') && t.TipoFactor !== 'Exento') {
        iva += parseFloat(t.Importe || 0);
      }
    });

    retencionesArr.forEach(r => {
      if (r && (r.Impuesto === '002' || r.Impuesto === 'IVA')) iva_retenido += parseFloat(r.Importe || 0);
      if (r && (r.Impuesto === '001' || r.Impuesto === 'ISR')) isr_retenido += parseFloat(r.Importe || 0);
    });

    // Conceptos
    const conceptosNode = comprobante['cfdi:Conceptos']?.['cfdi:Concepto'] || comprobante.Conceptos?.Concepto || [];
    const conceptosArr = Array.isArray(conceptosNode) ? conceptosNode : [conceptosNode];
    const conceptos = conceptosArr.filter(Boolean).map(c => ({
      claveProdServ: c.ClaveProdServ || '',
      noIdentificacion: c.NoIdentificacion || '',
      cantidad: parseFloat(c.Cantidad || 0),
      claveUnidad: c.ClaveUnidad || '',
      unidad: c.Unidad || '',
      descripcion: c.Descripcion || '',
      valorUnitario: parseFloat(c.ValorUnitario || 0),
      importe: parseFloat(c.Importe || 0),
      descuento: parseFloat(c.Descuento || 0),
      objetoImp: c.ObjetoImp || ''
    }));

    // Relaciones de Pago (REPs)
    const relacionados = [];
    const complementoPagos = comprobante['cfdi:Complemento']?.['pago20:Pagos'] || comprobante['cfdi:Complemento']?.['pago10:Pagos'];
    
    if (complementoPagos) {
      const pagos = complementoPagos['pago20:Pago'] || complementoPagos['pago10:Pago'] || [];
      const pagosArr = Array.isArray(pagos) ? pagos : [pagos];
      
      pagosArr.forEach(pago => {
        const docs = pago['pago20:DoctoRelacionado'] || pago['pago10:DoctoRelacionado'] || [];
        const docsArr = Array.isArray(docs) ? docs : [docs];
        docsArr.forEach(doc => {
          if (doc && doc.IdDocumento) {
            relacionados.push({
              uuid_relacionado: doc.IdDocumento,
              importe_pagado: parseFloat(doc.ImpPagado || 0),
              moneda: doc.MonedaDR || 'MXN'
            });
          }
        });
      });
    }

    return {
      uuid: comprobante['cfdi:Complemento']?.['tfd:TimbreFiscalDigital']?.UUID || null,
      total: parseFloat(comprobante.Total || 0),
      subtotal: parseFloat(comprobante.SubTotal || 0),
      moneda: comprobante.Moneda || 'MXN',
      tipo_cambio: parseFloat(comprobante.TipoCambio || 1),
      fecha: comprobante.Fecha || null,
      tipo_comprobante: comprobante.TipoDeComprobante || null,
      metodo_pago: comprobante.MetodoPago || null,
      forma_pago: comprobante.FormaPago || null,
      folio: comprobante.Folio || null,
      serie: comprobante.Serie || null,
      rfc_emisor: emisor.Rfc || null,
      nombre_emisor: emisor.Nombre || null,
      regimen_fiscal_emisor: emisor.RegimenFiscal || null,
      cp_emisor: comprobante.LugarExpedicion || null,
      rfc_receptor: receptor.Rfc || null,
      nombre_receptor: receptor.Nombre || null,
      tiene_complemento: !!complementoPagos,
      iva,
      iva_retenido,
      isr_retenido,
      conceptos,
      relacionados
    };
  } catch (error) {
    console.error("Error parseando XML:", error.message);
    return null;
  }
}
