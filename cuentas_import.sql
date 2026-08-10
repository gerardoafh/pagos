-- Importar cuentas contables CONTPAQi
-- Generado el: 2026-08-06T22:00:35.155Z

BEGIN;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('900000002', 'PT', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('900000001', 'IMPUESTO SOBRE LA RENTA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('900000000', 'IMPUESTOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800200211', 'INGRESOS POR ACTUALIZACION DE IMPUESTOS', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800200210', 'DIVERSOS', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800200209', 'SERVICIOS PRESTADOS', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800200208', 'ACTUALIZACIONES DE IVA', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800200207', 'COMISIONES RECIBIDAS', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800200206', 'ESTIMULOS FISCALES', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800200205', 'INTERESES PRESTAMOS PERSONALES', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800200204', 'VENTA ACTIVO FIJO', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800200203', 'VENTA DE MATERIA PRIMA', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800200202', 'FLETES Y SEGUROS', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800200201', 'VENTA DE CHATARRA', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800200000', 'PRODUCTOS', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800100105', 'DCTOS POR PRONTO PAGO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800100104', '&quot;EXTEMPORANEOS, MULTAS Y ACTN.&quot;', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800100103', 'DIVERSOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800100102', 'COSTO DE VENTA ACTIVO FIJO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800100101', 'COSTO DE VENTA MATERIA PRIMA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800100000', 'GASTOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('800000000', 'OTROS GASTOS Y PRODUCTOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('710200204', 'OTROS PASIVOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('710200203', 'FILIALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('710200202', 'PROVEEDORES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('710200201', 'PRESTAMOS BANCARIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('710200000', 'PASIVOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('710100104', 'OTROS ACTIVOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('710100103', 'FILIALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('710100102', 'CLIENTES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('710100101', 'BANCOS MONEDA EXTRANJERA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('710100000', 'ACTIVOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('710000000', 'FLUCTUACION CAMBIARIA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('700200203', 'INTERESES A FILIALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('700200202', 'INTERESES A CLIENTES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('700200201', 'INTERESES BANCARIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('700200000', 'PRODUCTOS FINANCIEROS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('700100104', 'COMISIONES Y SITUACIONES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('700100103', 'INTERESES FILIALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('700100102', 'INTERESES A PROVEEDORES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('700100101', 'INTERESES BANCARIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('700100000', 'GASTOS FINANCIEROS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('700000000', 'FINANCIEROS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600280009', 'GASTO INDIRECTOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600280008', 'GASTO PST02', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600280007', 'GASTO PST01', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600280006', 'GASTO PTF02', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600280005', 'GASTO PTF01', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600280004', 'GASTO PTEPS02', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600280003', 'GASTO PTEPS01', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600280002', 'GASTO MP02', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600280001', 'GASTO MP01', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600280000', 'GASTOS ALMACENES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600275040', 'EQ. DE TRANSPORTE AUTOMOVILES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600275033', 'SOFTWARE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600275031', 'EQUIPO DE COMPUTO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600275030', 'MOBILIARIO Y EQUIPO DE OFICINA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600275012', 'HERRAMIENTA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600275011', 'MAQ. Y EQUIPO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600275001', 'EDIFICIO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600275000', 'DEPRECIACIONES QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600270040', 'EQ. DE TRANSPORTE AUTOMOVILES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600270033', 'SOFTWARE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600270031', 'EQUIPO DE COMPUTO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600270030', 'MOBILIARIO Y EQUIPO DE OFICINA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600270012', 'HERRAMIENTA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600270011', 'MAQ. Y EQUIPO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600270001', 'EDIFICIO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600270000', 'DEPRECIACIONES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600260263', 'PENALIZACIONES LG', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600260262', 'COMISIONES BANCARIAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600260261', 'INTERESES ADMINSITRATIVOS LG', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600260000', 'GASTOS ADMINISTRATIVOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600255255', 'GASTOS DE VIAJE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600255254', 'IVA ACREDITABLE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600255253', 'MULTAS Y ACTUALIZACIONES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600255252', 'MTTO. EQUIPO DE TRANSPORTE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600255251', 'GASTOS SIN COMPROBANTE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600255000', 'GASTOS NO DEDUCIBLES QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600250255', 'GASTOS DE VIAJE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600250254', 'IVA ACREDITABLE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600250253', 'MULTAS Y ACTUALIZACIONES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600250252', 'MTTO. EQUIPO DE TRANSPORTE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600250251', 'GASTOS SIN COMPROBANTE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600250000', 'GASTOS NO DEDUCIBLES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600245246', 'REDONDEO DE PROVEEDORES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600245245', 'RETRABAJOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600245244', 'RECARGOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600245243', 'OTROS IMPUESTOS Y DERECHOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600245242', 'GASTOS VARIOS DEDUCIBLES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600245241', 'DONATIVOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600245000', 'GASTOS VARIOS QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600240247', 'COMEDOR', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600240246', 'REDONDEO DE PROVEEDORES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600240245', 'RETRABAJOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600240244', 'RECARGOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600240243', 'OTROS IMPUESTOS Y DERECHOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600240242', 'GASTOS VARIOS DEDUCIBLES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600240241', 'DONATIVOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600240000', 'GASTOS VARIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600235235', 'SEGUROS DIRECTIVOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600235234', 'FIANZAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600235233', 'SEGURO DE AUTOMOVILES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600235232', 'SEGURO TRANSPORTE DE MERCANCIAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600235231', 'SEGURO TODO RIESGO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600235000', 'SEGUROS Y FINANZAS QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600230235', 'SEGUROS DIRECTIVOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600230234', 'FIANZAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600230233', 'SEGURO DE AUTOMOVILES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600230232', 'SEGURO TRANSPORTE DE MERCANCIAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600230231', 'SEGURO TODO RIESGO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600230000', 'SEGUROS Y FIANZAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600225224', 'ARREND. PURO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600225223', 'ARREND.CASA HABITACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600225222', 'ARREND. PERSONAS MORALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600225221', 'ARREND. PERSONAS FISICAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600225000', 'RENTAS QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600220224', 'ARREND. PURO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600220223', 'ARREND. CASA HABITACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600220222', 'ARREND. PERSONAS MORALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600220221', 'ARREND. PERSONAS FISICAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600220000', 'RENTAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600215215', 'GASTOS DE VIAJES DIVERSOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600215214', 'GASTOS DE AVION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600215213', 'IMPUESTOS Y CASETAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600215212', 'GASTOS DE RESTAURANT', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600215211', 'GASTOS DE HOSPEDAJE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600215000', 'GASTOS DE VIAJE QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600210215', 'GASTOS DE VIAJE DIVEROS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600210214', 'GASTOS DE AVION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600210213', 'IMPUESTOS Y CASETAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600210212', 'GASTOS DE RESTAURANT', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600210211', 'GASTOS DE HOSPEDAJE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600210000', 'GASTOS DE VIAJE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600205210', 'AGUA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600205209', 'CUSROS Y SEMINARIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600205208', 'GASTOS SINDICALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600205207', 'GASTOS MEDICOS Y MEDICINAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600205206', 'MATERIAL DE LIMPIEZA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600205205', 'CUOTAS Y SUSCRIPCIONES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600205204', 'MENSAJERIA Y CORREOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600205203', 'SOFTWARE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600205202', 'FOTO COPIADO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600205001', 'ACCESORIOS DE OFNA Y PAPELERIA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600205000', 'GASTOS DE OFICINA QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600200210', 'AGUA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600200209', 'CURSOS Y SEMINARIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600200208', 'GASTOS SINDICALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600200207', 'GASTOS MEDICOS Y MEDICINAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600200206', 'MATERIAL DE LIMPIEZA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600200205', 'CUOTAS Y SUSCRIPCIONES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600200204', 'MENSAJERIA Y CORREOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600200203', 'SOFTWARE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600200202', 'FOTO COPIADO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600200201', 'ACCESORIOS DE OFNA Y PAPELERIA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600200000', 'GASTOS DE OFICINA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600195197', 'SERVICIOS ADMINISTRATIVOS DE PERSONAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600195196', 'SERVICIOS DE VIGILANCIA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600195195', 'GASTOS ADMINISTRATIVOS DE OPERACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600195194', 'SERV. PROFESIONALES Y TECNICOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600195193', 'PRACTICAS PROFESIONALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600195192', 'HONORARIOS A PERSONAS MORALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600195191', 'HONORARIOS A PERSONAS FISICAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600195000', 'SERVICIOS PROFESIONALES QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600190199', 'OTROS SERVICIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600190198', 'SERVICIOS DE CONSTRUCCION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600190197', 'SERVICIOS ADMINISTRATIVOS DE PERSONAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600190196', 'SERVICIOS DE VIGILANCIA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600190195', 'GASTOS ADMINISTRATIVOS DE OPERACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600190194', 'SERV. PROFESIONALES Y TECNICOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600190193', 'PRACTICAS PROFESIONALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600190192', 'HONORARIOS A PERSONAS MORALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600190191', 'HONORARIOS A PERSONAS FISICAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600190000', 'SERVICIOS PROFESIONALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185192', 'MUESTRAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185191', 'MATERIALES INDIRECTOS PRODUCTO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185190', 'UTILES DE LIMPIEZA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185189', 'MATERIALES DE EMPAQUE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185188', 'GASTOS DE REPRESENTACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185187', 'PROPAGANDA Y PUBLICIDAD', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185186', 'CONVENCIONES Y PRESENTACIONES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185185', 'PROVISION DE REGALIAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185184', 'PROVISION CUENTAS INCOBRABLES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185183', 'PROVISION INVENTARIO OBSOLETO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185182', 'GASTOS DE EXPORTACION E IMPORTACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185181', 'FLETES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600185000', 'GASTOS DE VENTA QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180192', 'INSUMOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180191', 'MATERIALES INDIRECTOS PRODUCTO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180190', 'UTILES DE LIMPIEZA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180189', 'MATERIAL DE EMPAQUE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180188', 'GASTOS DE REPRESENTACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180187', 'PROPAGANDA Y PUBLICIDAD', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180186', 'CONVENCIONES Y PRESENTACIONES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180185', 'PROVISION DE REGALIAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180184', 'PROVISION CUENTAS INCOBRABLES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180183', 'PROVISION INVENTARIO OBSOLETO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180182', 'GASTOS DE EXPORTACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180181', 'FLETES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600180000', 'GASTOS DE VENTA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600175173', 'GAS PARA CARBURACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600175172', 'GASOLINA Y LUBRICANTES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600175171', 'MTTO.EQUIPO DE TRANSPORTE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600175000', 'MANTENIMIENTO TRANSPORTE QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600170173', 'GAS PARA CARBURACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600170172', 'GASOLINA Y LUBRICANTES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600170171', 'MTTO. EQUIPO DE TRANSPORTE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600170000', 'MANTENIMIENTO TRANSPORTE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600165164', 'MTTO. DE EQUIPO DE COMPUTO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600165163', 'MTTO. DE EQUIPO DE OFICINA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600165162', 'MTTO. DE AREAS VERDES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600165161', 'MTTO. DE EDIFICIO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600165000', 'MANTENIMIENTO EDIFICIO Y OFICINA QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600160164', 'MTTO. DE EQUIPO DE COMPUTO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600160163', 'MTTO. DE EQUIPO DE OFICINA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600160162', 'MTTO. DE AREAS VERDES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600160161', 'MTTO. DE EDIFICIO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600160000', 'MANTENIMIENTO EDIFICIO Y OFICINA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600155157', 'RENTAS DE GRUAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600155156', 'ACEITES Y LUBRICANTES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600155155', 'RENTA MONTACARGAS Y COMPRESORES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600155154', 'GASES Y PRODUCTOS QUIMICOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600155153', 'DISPOSITIVOS Y HERRAMIENTAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600155152', 'MATERIALES INDIRECTOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600155151', 'MANTENIMIENTO DE MAQUINARIA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600155000', 'MANTENIMIENTO MAQUINARIA Y EQUIPO QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600150157', 'RENTA DE GRUAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600150156', 'ACEITES Y LUBRICANTES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600150155', 'RENTA MONTACARGAS Y COMPRESORES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600150154', 'GASES Y PRODUCTOS QUIMICOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600150153', 'DISPOSITIVOS Y HERRAMIENTAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600150152', 'MATERIALES INDIRECTOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600150151', 'MANTENIMIENTO DE MAQUINARIA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600150000', 'MANTENIMIENTO MAQUINARIA Y EQUIPO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600145146', 'RESIDUOS IND Y REC DE BASURA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600145145', 'CELULAR Y RADIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600145144', 'TELEFONOS E INTERNET', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600145143', 'DERECHOS DE AGUA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600145142', 'ENERGIA ELECTRICA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600145141', 'GAS NATURAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600145000', 'SERVICIOS PUBLICOS QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600140146', 'RESIDUOS IND Y REC DE BASURA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600140145', 'CELULAR Y RADIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600140144', 'TELEFONOS E INTERNET', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600140143', 'DERECHOS DE AGUA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600140142', 'ENERGIA ELECTRICA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600140141', 'GAS NATURAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600140000', 'SERVICIOS PUBLICOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600125127', 'ACTIVIDADES SOCIALES Y DEPORTIVAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600125125', 'UNIFORMES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600125124', 'PROTECCION INDUSTRIAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600125000', 'SEGURIDAD INDUSTRIAL QRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600120127', 'ACTIVIDADES SOCIALES Y DEPORTIVAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600120125', 'UNIFORMES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600120124', 'PROTECCION INDUSTRIAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600120000', 'SEGURIDAD INDUSTRIAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105036', 'PRIMA DE ANTIGUEDAD', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105035', 'INDEMNIZACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105032', 'VALES DE DESPENSA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105031', 'DIFERENCIA TIEMPO ORDINARIO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105030', 'IMPUESTO SOBRE NOMINA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105029', 'APORTACIONES AL INFONAVIT', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105028', 'APORTACIONES AL SAR', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105027', 'CUOTAS AL IMSS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105026', 'BONO SEMANAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105025', 'BONOS DE PRODUCCION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105023', 'AYUDA TRANSPORTE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105019', 'FONDO DE AHORRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105012', 'AGUINALDO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105008', 'PRIMA DOMINICAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105007', 'PRIMA VACACIONAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105006', 'VACACIONES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105005', 'PREMIOS DE PUNTUALIDAD', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105004', 'PREMIOS DE ASISTENCIA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105003', 'TIEMPOS EXTRA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105002', 'LABORES EN DIA DE DESCANSO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105001', 'SUELDOS Y SALARIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600105000', 'PERCEPCIONES QUERETARO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100035', 'VALES DE DESPENSA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100034', 'GRATIFICACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100033', 'RETROACTIVO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100032', 'AJUSTES NOMINA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100031', 'DIFERENCIA TIEMPO ORDINARIO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100030', 'IMPUESTO SOBRE NOMINA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100029', 'APORTACIONES AL INFONAVIT', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100028', 'APORTACIONES AL SAR', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100027', 'CUOTAS AL IMSS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100026', 'BONO SEMANAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100025', 'BONOS PRODUCCION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100024', 'BONOS DE ASISTENCIA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100023', 'AYUDA TRANSPORTE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100020', 'CUOTAS SINDICALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100019', 'FONDO DE AHORRO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100012', 'AGUINALDO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100010', 'PRIMA DE ANTIGUEDAD', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100009', 'DIAS FESTIVOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100008', 'PRIMA DOMINICAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100007', 'PRIMA VACACIONAL', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100006', 'VACACIONES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100005', 'PREMIOS DE PUNTUALIDAD', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100004', 'PREMIOS DE ASISTENCIA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100003', 'TIEMPOS EXTRAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100002', 'LABORES EN DIA DE DESCANSO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100001', 'SUELDOS Y SALARIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600100000', 'PERCEPCIONES MONTERREY', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('600000000', 'GASTOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500053006', 'MATERIA PRIMA ENSAMBLE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500053005', 'P.T. PLANTA 2', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500053004', 'P.T. EPS 01', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500053003', 'MATERIA PRIMA PLANTA 2', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500053002', 'MATERIA PRIMA PLASTICOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500053001', 'MATERIA PRIMA PLASTICOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500053000', 'AJUSTES DE INVENTARIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500052004', 'ESAMBLE', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500052003', 'PLASTICOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500052002', 'E.P.P.', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500052001', 'E.P.S. MOLD', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500052000', 'OTROS COSTOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500045003', 'VARIACION EN PRECIO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500045002', 'REVALORIZACION DE INVENTARIOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500045001', 'COSTOS INDIRECTOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500045000', 'COSTO INDIRECTOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500006001', 'COSTO SEMITERMINADO PST', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500006000', 'PRODUCTO SEMITERMINADO', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500005004', 'COSTO PRODUCTO TERMINANDO FINAL PTF', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500005003', 'PLASTICOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500005002', 'E.P.P.', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500005001', 'E.P.S.', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500005000', 'RETRABAJOS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500004004', 'SCRAP PT', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500004003', 'ALMACEN DE MATERIA PRIMA', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500004002', 'SCRAP PRODUCCION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500004001', 'SCRAP POR PRODUCCION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500004000', 'SCRAP', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500003009', 'MULT', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500003008', 'MANIOBRAS IMP', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500003007', 'FLETES IMP', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500003006', 'ALMACENAJES IMP .', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500003005', 'HONORARIOS IMP', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500003004', 'CNT- REC', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500003003', 'PREVALIDACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500003002', 'I.G.I.', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500003001', 'D.T.A.', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500003000', 'GASTOS DE IMPORTACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500002002', 'IMPORTACION', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500002001', 'NACIONALES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500002000', 'FLETES', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500001003', 'COSTO DE VENTAS MOLD', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500001002', 'COSTO DE VENTAS M.P.', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500001001', 'COSTO DE VENTAS P.T.', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500001000', 'COSTO DE VENTAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('500000000', 'COSTO DE VENTAS', 'gasto')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('400001008', 'OTROS INGRESOS', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('400001007', 'OTRAS VENTAS QUERETARO M.N', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('400001006', 'VENTAS QRO USD COMPLEMENTARIA', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('400001005', 'VENTAS QRO USD', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('400001004', 'VENTAS MONTERREY USD COMPLEMENTARIA', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('400001003', 'VENTAS MONTERREY USD', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('400001002', 'VENTAS QUERETARO M.N.', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('400001001', 'VENTAS MONTERREY M.N.', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('400001000', 'VENTAS NETAS', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('400000000', 'INGRESOS', 'ingreso')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300003000', 'UTILIDAD(PERDIDA) DEL EJERCICO', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002024', 'EJERCICIO 2024', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002023', 'EJERCICIO 2023', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002022', 'EJERCICIO 2022', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002021', 'EJERICIO 2021', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002020', 'EJERCICIO 2020', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002019', 'EJERCICIO 2019', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002018', 'EJERCICIO 2018', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002017', 'EJERCICIO 2017', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002016', 'EJERCICIO 2016', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002015', 'EJERCICIO 2015', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002014', 'EJERCICIO 2014', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002013', 'EJERCICIO 2013', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002012', 'EJERCICIO 2012', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002011', 'EJERCICIO 2011', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002009', 'EJERCICIO 2010', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002008', 'EJERCICIO 2009', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002007', 'EJERCICIO 2008', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002006', 'EJERCICIO 2007', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002005', 'EJERCICIO 2006', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002004', 'EJERCICIO 2005', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002003', 'EJERCICIO 2004', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002002', 'EJERCICIO 2003', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002001', 'EJERCICIO 2002', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300002000', 'UTILIDAD(PERDIDA) ACUMULADA', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300001002', 'APORTACIONES PARA FUTUROS AUMENTOS DEL CAPITAL', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300001001', 'CAPITAL SOCIAL', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300001000', 'CAPITAL', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('300000000', 'CAPITAL CONTABLE', 'capital')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('222000000', 'OTRAS PROVISIONES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('221000000', 'PASIVO DIFERIDO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('220000130', 'SIELEK DE MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('220000004', 'BANREGIO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('220000003', 'GMAC MEXICANA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('220000002', 'BANORTE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('220000001', 'LG INTERNATIONAL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('220000000', 'LARGO PLAZO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219005002', 'PENSION ALIMENTICIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219005001', 'CUOTAS SINDICALES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219005000', 'CUOTAS Y PAGOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219004003', 'PROVISION DE AGUINALDO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219004002', 'PROVISION VACACIONES POR PAGAR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219004001', 'PROVISION DE SUELDOS Y SALARIOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219004000', 'PROVISION DE SUELDOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219003002', 'AYUDA POR DEFUNCION TRABAJADOR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219003001', 'FONDO DE AHORRO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219003000', 'PRESTACIONES AL TRABAJADOR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219002007', 'FONACOT', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219002006', 'SAR RETENIDO AL TRABAJADOR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219002005', 'INFONAVIT RETENIDO AL TRABAJADOR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219002004', 'IMSS RETENIDO AL TRABAJADOR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219002003', 'INFONAVIT', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219002002', 'SAR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219002001', 'IMSS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219002000', 'PROVISION DE CONTRIBUCIONES DE SEGURIDAD SOCIAL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219001005', 'CUENTA DE REDONDO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219001004', 'TELEFONO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219001003', 'ELECTRICIDAD', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219001002', 'GAS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219001001', 'AGUA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219001000', 'SERVICIOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('219000000', 'PROVISIONES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('218001004', 'IVA TRASLADADO PENDIENTE POR RETENER', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('218001003', 'IVA TRASLADADO EFECTIVAMENTE RETENIDO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('218001002', 'IVA TRASLADADO NO COBRADO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('218001001', 'IVA TRASLADADO COBRADO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('218001000', 'IVA TRASLADADO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('218000000', 'IVA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217002003', 'PTU', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217002002', 'IETU', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217002001', 'ISR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217002000', 'IMPUESTOS ANUALES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001018', 'ISR PTE 1.25 RESICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001017', 'ISR 1.25% RESICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001016', 'IMPUESTOS SOBRE NOMINA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001015', 'ISR SUELDOS Y SALARIOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001014', 'IVA 6% RETENIDO POR PAGAR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001013', 'IVA 6% POR RETENER (PROVISION)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001012', 'PAGOS PROVISIONALES ISR X PAGAR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001011', 'IVA POR PAGAR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001010', '10% ISR PENDIENTE POR RETENER', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001009', '10% IVA PENDIENTE POR RETENER', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001008', '4% IVA PENDIENTE POR RETENER FLETES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001007', '10% ISR POR PAGO DE REGALIAS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001006', '10% ISR POR PAGO DE INTERESES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001005', 'RET IVA HONORARIOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001004', 'RET IVA ARRENDAMIENTO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001003', '4% IVA RETENIDO POR FLETES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001002', '10% ISR HONORARIOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001001', '10% ISR ARRENDAMIENTO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217001000', 'RETENIDOS POR PAGAR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('217000000', 'IMPUESTOS POR PAGAR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('216000004', 'HSBC KRONER', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('216000003', 'GMAC MEXICANA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('216000002', 'BANORTE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('216000001', 'HSBC LG ANT PAGOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('216000000', 'INTERES POR PAGAR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001016', 'CW FRANQUICIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001015', 'INTERCAM EXPRESS DLL 36', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001014', 'CW QUERETARO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001013', 'BASE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001012', 'BBVA BANCOMER', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001011', 'INBURSA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001010', 'BANAMEX', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001009', 'FINANCIERA BAJIO BANBAJIO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001008', 'SHINHAN DE MEXICO S.A. INST DE BANCA MULTIPLE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001007', 'ASIA MOTORS SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001006', 'CREDI NISSAN', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001005', 'SANTANDER', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001004', 'HSBC KRONER', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001003', 'GMAC MEXICANA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001002', 'BANORTE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001001', 'FACTORAJE LG', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215001000', 'CORTO PLAZO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('215000000', 'DOCUMENTOS POR PAGAR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('214000000', 'ANTICIPO DE CLIENTES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('213003004', 'CUENTA DE NETOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('213003003', 'USD COMPLEM.', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('213003002', 'USD', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('213003001', 'MXN', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('213003000', 'SERVICIOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('213002001', 'CHEONG WOON HIGHTECH', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('213002000', 'REGALIAS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('213001002', 'CHEONG WOON HIGHTECH COMPLEMENTARIA USD COMPLEMENT', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('213001001', 'CHEONG WOON HIGHTECH USD', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('213001000', 'DOCUMENTOS POR PAGAR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('213000000', 'CUENTAS POR PAGAR FILIALES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212001002', 'LME AGENT', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212001001', 'VISA LOGISTICA ADUANERA SC', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212001000', 'AGENCIAS ADUANALES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000236', 'IMPULSORA TURISTICA CONVEX', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000235', 'DISTRIBUIDORA FARMACEUTICA STA. MARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000234', 'AHI CAM', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000233', 'ALEJANDRO TREVI&Ntilde;O MARTINEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000232', 'AXA SEGUROS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000231', 'MYUNG GA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000230', 'VICTORIA ELIZABETH CASTA&Ntilde;EDA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000229', 'LIMPIEZA Y JARDINERIA ROJAS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000228', 'ESPECIALISTAS EN OBRA Y EDIFICACION ULLOA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000227', 'FRANCISCA DANIELA FLORES SANDOVAL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000226', 'ENLACEFORTE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000225', 'ANDREA FRIAS DUARTE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000224', 'AISLANTES TERMICOS HINOJOSA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000223', 'TORTILLERIA MARTINEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000222', 'TIENDAS SORIANA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000221', 'GERARDO ANTONINO MIGUEL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000220', 'COMERCIALIZADORA CQESH', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000219', 'JUAN ANTONIO MARTINEZ VALADES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000218', 'ESTACION DE SERVICIO LIENZO CHARRO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000217', 'ESPECIALISTAS EN ADMINISTRACION JHSO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000216', 'CONSULTORIO MEDICO SAN FRANCISCO DE ASIS APODACA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000215', 'PEQUE&Ntilde;O CAESARMEX', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000214', 'JOMAR INDUSTRIAS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000213', 'CONSTRUCTORA INTEGRAL ESIC', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000212', 'PASE, SERVICIOS ELECTRONICOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000211', 'NESPRESSO MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000210', 'MOAYO MEX', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000209', 'JUNIOR FOODS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000208', 'ESTACION DE SERVICIO PUEBLO NUEVO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000207', 'FRANCISCO JAVIER TORRES VILLAGOMEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000206', 'C1 ALEMANA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000205', 'NUEVA WAL MART DE MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000204', 'MYOUNGSOOK SEO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000203', 'DHL EXPRESS MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000202', 'ACCESO DEPORTIVO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000201', 'WONKOO LEE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000200', 'MIKAI', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000199', 'SERVICIOS GASOLINEROS DE MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000198', 'RECICLADORA SAN RAFAEL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000197', 'BULMARO HERNANDEZ MARTINEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000196', 'QUALITAS COMPA&Ntilde;IA DE SEGUROS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000195', 'JOSE FEDERICO BRAVO MERCHANT', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000194', 'RENE GONZALEZ MENDOZA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000193', 'ADIOS A LAS PLAGAS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000192', 'VICTOR IVAN CAMACHO AGUILAR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000191', 'ELOH TRANSPORTES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000190', 'EVELYN JOANNA ESMERADO GARCIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000189', 'JORGE DIDIER BORDA OVALLE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000188', 'JENNIFER SELENA TREVI&Ntilde;O RODRIGUEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000187', 'SCA PALLETS PRODUCTION', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000186', 'COMERCIAL ANGEL GARZA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000185', 'DISTRIBUIDORA VOLADORA MUNDIAL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000184', 'COMPA&Ntilde;IA MEXICANA DE SEGURIDAD PRIVADA, TRASLADO D', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000183', 'BLACK DERTH', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000182', 'GERARDO RODRIGUEZ ELIZONDO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000181', 'GEMBER AMBIENTAL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000180', 'H B ALIMENTOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000179', 'H B CARNES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000178', 'POLYEMPAQUES Y DERIVADOS MONTERREY', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000177', 'HUMBERTO SEPULVEDA FLORES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000176', 'MANUEL TREVI&Ntilde;O RAMOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000175', 'COMERCIALIZADORA INDUSTRIAL UTD3', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000174', 'VICTOR MANUEL HERNANDEZ MARTINEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000173', 'CCT MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000172', 'BOB COPERATION', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000171', 'JUAN CARLOS ESMERADO GARCIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000170', 'MARIO ALBERTO TORRES MARTINEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000169', 'PROYECTOS INSTALACIONES Y DISE&Ntilde;O ODEP', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000168', 'ASESORES INTEGRADOS DE MONTERREY', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000167', 'VELMEX POLIESTIRENO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000166', 'IMPRESOS COMERCIALES HERO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000165', 'SELENE FABIOLA ELIZONDO LOPEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000164', 'ABC ASSESSOR LEGAL CONSULTING SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000163', 'CORPORATIVO MEXICANO DE SEGURIDAD PRIVADA Y TRASLA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000162', 'ADAN OLVERA IBARRA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000161', 'DESIGN THE SPACE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000160', 'REICI', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000159', 'KEUN BAE PARK', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000158', 'MARCO ANTONIO TREVI&Ntilde;O FLORES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000157', 'OCTAVIANO RAMIREZ GONZALEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000156', 'CJ LOGISTICS MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000155', 'CYBERPUERTA SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000154', 'DAVID EDUARDO HERRERA GUTIERREZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000153', 'SERGIO EMILIANO LARA MARTINEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000152', 'ANTONIO ALEXANDER BARBA MONTEMAYOR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000151', 'MG MECHATRONICS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000150', 'VICA INDUSTRIAL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000149', 'SUNCNS MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000148', 'VACUUM SYSTEMS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000147', 'CIBANCO SA IBM FIDEICOMISO CIB 2528', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000146', 'ADSTRA TOURS SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000145', 'START BANREGIO SA DE CV SOFOM ER BANREGIO GRUPO FI', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000144', 'HWA SOOK LEE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000143', 'FIRMA CAR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000142', 'Ab&c Leasing de México S.A.P.I. de C.V.', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000141', 'CLEAN UP GROCERY', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000140', 'GRUAS Y MANIOBRAS ARLE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000139', 'OLGA ELIZABETH RODRIGUEZ REYES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000138', 'SUSAN IVONN NAVARRO CASTA&Ntilde;EDA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000137', 'JUAN ANTONIO ALVAREZ MONTES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000136', 'SG PROVEEDORES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000135', 'TECNO SERVICIOS DIABLO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000134', 'DISTRIBUIDORA OC MEXICO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000132', 'GRUPO DISTRIBUIDOR DE GAS GARAGE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000131', 'NHS CONTROLS SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000130', 'JINSEONG TECH', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000129', 'EMERGENCIA MEDICA PROFESIONAL SC', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000128', 'MAYRA PUENTE REYES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000127', 'RENE GONZALEZ SANCHEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000126', 'MIGUEL ANGEL CRUZ CRUZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000125', 'SERVICIO Y DISTRIBUCION HERCOM SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000124', 'WERE HOUSE LIFT SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000123', 'LUIS OSCAR CABRERA RAMIREZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000122', 'MGPHARMA SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000121', 'JUAN MARTIN CISNEROS PADILLA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000120', 'CONTENEDORES Y QUIMICOS DE MEXICO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000119', 'MANUEL FUENTES CARRANZA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000118', 'TECH TOP COMPONENTES SAS DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000117', 'ROADX GLOBAL MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000116', 'MARIA ELISA EUDELIA SEPULVEDA GUERRERO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000115', 'LUIS FERNANDO PINEDA CAZARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000114', 'TRANSPORTE DE PERSONAL RLG DE SAN JOSE SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000113', 'REAL PACKING MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000112', 'WC MOVIL DE MONTERREY SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000111', 'JULIO CESAR CRUZ MAZARIEGOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000110', 'ABALON SERVICIOS ELECTRONICOS S DE RL DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000109', 'SACAR DEL CENTRO MEXICO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000108', 'NORTE SUR REPUESTOS SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000107', 'CPH CAPITAL HUMANO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000106', 'INGENIERIA DISE&Ntilde;O Y CONTROL DE AUTOMATIZACION SA D', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000105', 'BIO SISTEMAS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000104', 'SISTEMAS DIGITALES DE TECNOLOGIA APLICADA SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000103', 'GLOBAL GRAPHICS CUE SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000102', 'PARAN TECH', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000101', 'GRUPO SETTEPI SA PI DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000100', 'MELISENDA DOMINGUEZ ACU&Ntilde;A', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000099', 'MAYOREO DE PLUMAS SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000098', 'WILY EDUARDO MONTOYA REYES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000097', 'CAZPY ADMINISTRACION', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000096', 'MARIA DEL ROSARIO TORRES SIERRA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000095', 'GARZA ELIZONDO Y COMPA&Ntilde;&Iacute;A SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000094', 'TIP AUTO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000093', 'MIAE PARK', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000092', 'ERICK GABRIEL YA&Ntilde;EZ RUIZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000091', 'CANAAN SHALOM DE MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000090', 'APSI MONTERREY SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000089', 'CONTROL PERIMETRAL DEL NORTE SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000088', 'ALEJANDRA BERNARDETTE BALLESTEROS CARRIZALES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000087', 'ELECTRO FERRETERA REAL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000086', 'CW TECH', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000085', 'GOSSLER S.C.', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000084', 'IMPULSORA ELIZONDO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000083', 'BUHMWOO AMERICA SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000082', 'ROSA ELIA BAZALDUA GUTIERREZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000081', 'ALMA DELIA SANCHEZ PUENTE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000080', 'SERVICIOS INDUSTRIALES ALONSO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000079', 'NEUMATICA E HIDRAULICA MAS SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000078', 'LAYER INDUSTRIAL S DE RL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000077', 'OFFICE DEPOT DE MEXICO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000076', 'MARIO JORGE MORALES RODRIGUEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000075', 'HERIBERTO LOPEZ RODRIGUEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000074', 'JAIME GUTIERREZ CHAPA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000073', 'FOGAFIS CONSULTORES SC', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000072', 'ROBERTO ELIZONDO GUAJARDO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000071', 'RIGOBERTO ULISES SINECIO PEREZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000070', 'JOSE GUADALUPE CONTRERAS GARAY', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000069', 'JESUS SERGIO MEZQUITIC NAVARRO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000068', 'JESUS ALBERTO FLORES MENDOZA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000067', 'AUTOMATIZACION INDUSTRIAL MAROV SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000066', 'ABASTECEDORA MEXIQUENSE SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000065', 'JUAN SEBASTIAN GARZA MERCADO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000064', 'LEON HECTOR NOYOLA FLORES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000063', 'STRATEGIC EJECUTIVE ADVISOR SC', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000062', 'TRANSPORTES DE AGUA EL FENIX SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000061', 'HEONGJOO SHIN', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000060', 'GARMEDICA QUERETARO SC', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000059', 'CONFYA CONSULTING SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000058', 'GUADALUPE GUERRERO CORTES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000057', 'EDER FRANCISCO JUAREZ OCEJO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000056', 'Cintas y Etiquetas Lorel S.A. de C.V.', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000055', 'BUMA AIR COMPRESSOR SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000054', 'MC CHEMICAL DE MEXICO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000053', 'MARTIN RIVERA ZU&Ntilde;IGA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000052', 'MAGALI ITZEL PEREZ RODRIGUEZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000051', 'DIOCELINO GARCIA BARRERA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000050', 'COMERCIALIZADORA QUERETANA ESMERADO HERNANDEZ S.A.', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000049', 'ALEJANDRO VILLEGAS GAONA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000048', 'PROMOTORA SKU S A P I DOLARES COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000047', 'PROMOTORA SKU S A P I DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000046', 'PROMOTORA SKU S A P I DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000045', 'ENERPIQ, S DE RL DE CV DOLARES COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000044', 'ENERPIQ, S DE RL DE CV DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000043', 'DIAVAZ GAS COM S.A.P.I. DOLARES COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000042', 'DIAVAZ GAS COM S.A.P.I. DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000041', 'DIAVAZ GAS COM S.A.P.I. de C.V.', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000040', 'KARINA GUADALUPE RUIZ AGUIRRE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000039', 'HOMERO SEPULVEDA GARCIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000038', 'EXI TECNOLOGIAS DE LA INFORMACION SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000037', 'RADIOMOVIL DIPSA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000036', 'MARTHA ALICIA RAMIREZ MU&Ntilde;OZ', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000035', 'ERIKA GUADALUPE CRUZ VARGAS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000034', 'YOURIM SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000033', 'INDC JOB S DE RL DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000032', 'CINDEMEX DIVISION JURIDICA SC', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000031', 'MARTHA JIMENEZ ALONSO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000030', 'SONIGAS SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000029', 'NUEVO GAS SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000028', 'HOGARES INTERNACIONALES SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000027', 'AT&T COMUNICACIONES DIGITALES S DE RL DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000026', 'SERVICIOS INTEGRALES ROYAN SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000025', 'GRUPO ASESORES INTEGRADOS SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000024', 'CW QUERETARO MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000023', 'MOVIMIENTO GENRADORA INTEGRAL AMBIENTAL MEXICO SA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000022', 'PRO WELD SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000021', 'YUDO MEXICO SA DE CV USD COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000020', 'YUDO MEXICO SA DE CV USD', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000019', 'YUDO MEXICO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000018', 'PANTOS LOGISTICS MEXICO SA DE CV USD COMPLEMENTARI', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000017', 'PANTOS LOGISTICS MEXICO SA DE CV USD', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000016', 'PANTOS LOGISTICS CO LTD USD COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000015', 'PANTOS LOGISTICS CO LTD USD', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000014', 'EDENRED (ACCOR) MEXICO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000013', 'PANTOS LOGISTICS MEXICO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000012', 'LAM MENDEZ ROBERTO ANTONIO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000011', 'CASA OSGUEL SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000010', 'VZZ SERVICIOS E INDUSTRIAS MONTERREY SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000009', 'PANTOS LOGISTICS CO LTD', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000008', 'SERVICIO INDUSTRIAL ROCA ELITE SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000007', 'ACREEDORES USD COMPLEM.', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000006', 'ACREEDORES USD', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000005', 'CW FRANQUICIA S.A. DE C.V.', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000004', 'ACREEDORES DIVERSOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000003', 'MAQUINARIA PARA PLASTICOS ARA SA DE C.V.', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000002', 'MIN HYUN', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000001', 'ACREEDORES MXN', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('212000000', 'ACREEDORES DIVERSOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211510000', 'SD-GLOBAL MEXICO SA DE CV COMPLE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000558', 'STYROPEK MEXICO COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000557', 'STYROPEK MEXICO DLL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000556', 'KCUM COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000555', 'KCUM DLL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000554', 'PRODUCTOS INDUSTRIALES SAAR COMPLE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000553', 'PRODUCTOS INDUSTRIALES SAAR DLL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000552', 'INNOVACION PACKING AUTOMOTORES COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000551', 'INNOVACION PACKING AUTOMOTORES DLL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000550', 'MATERIAL SOLUTION INCORPORATION COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000549', 'MATERIAL SOLUTION INCORPORATION DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000548', 'GRAND ASTOR LIMITED DOLARES COMPL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000547', 'GRAND ASTOR LIMITED DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000546', 'GRAND ASTOR LIMITED COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000545', 'GRAND ASTOR LIMITED', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000544', 'SUNGWON MEXICO COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000543', 'SUNGWON MEXICO DLL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000542', 'GLOBAL BOX', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000541', 'AIR CONTAINER LOGISTICS MEXICO DLL COMPLE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000540', 'AIR CONTAINER LOGISTICS MEXICO DLL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000539', 'L. LONGORIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000538', 'S&MIN INDUSTRIAL DOLARES COMPL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000537', 'S&MIN INDUSTRIAL DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000536', 'INICS AMERICA DOLARE COMPL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000535', 'INICS AMERICA DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000534', 'IMAGINA LEASING DLL COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000533', 'IMAGINA LEASING DLL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000532', 'FEQ COMPRA DE DESPERDICIOS INDUSTRIALES Y OBSOLETO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000531', 'HILDA VIRIDIANA ALVAREZ CORTES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000530', 'FABRICA DE EMPAQUES CORRUGADOS JR', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000529', 'PACTRA MEXICO S DE RL DE CV COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000528', 'PACTRA MEXICO S DE RL DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000527', 'FORWARDFLOW DLL COMPLEMENTARI', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000526', 'FORWARDFLOW', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000525', 'JSP INTERNATIONAL DE MEXICO DLL COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000524', 'JSP INTERNATIONAL DE MEXICO DLL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000523', 'ROADX GLOBAL MEXICO COMPL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000522', 'ROADX GLOBAL MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000521', 'HANWHA ADVANCED MATERIALS MEXICO COMPL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000520', 'HANWHA ADVANCED MATERIALS MEXICO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000513', 'RUGRAPACK', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000512', 'MATERIAL SOLUTION INCORPORATION DLL COMPL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000511', 'MATERIAL SOLUTION INCORPORATION DLL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000509', 'SD-GLOBAL MEXICO SA DE CV DLL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000508', 'PR TECH S DE RL DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000507', 'FDE FABRICA DE ESQUINERO DE ORIENTE SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000506', 'ASESORES EN DISTRIBUCI&Oacute;N Y LOG&Iacute;STICA, S.A. DE C.V.', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000505', 'LG ELECTRONICS MX', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000504', 'LG ELECTRONICS USA INC DOLAES COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000503', 'LG ELECTRONICS USA INC DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000502', 'HANMAC DOLARES COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000501', 'HANMAC DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000500', 'HANMAC MEXICO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000237', 'TERRALTA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000055', 'ALFA DESARROLLOS INDUSTRIALES SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000054', 'TOTAL PLAY TELECOMUNICACIONES SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000053', 'TELEFONOS DE MEXICO SAB DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000052', 'SERVICIOS DE AGUA Y DRENAJE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000051', 'AT&T COMUNICACIONES DIGITALES, S. DE R.L. DE C.V.', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000050', 'RADIOMOVIL DIPSA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000049', 'HOMERO SEPULVEDA GARCIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000048', 'RENTECO INTERNATIONAL DOLARES COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000047', 'RENTECO INTERNATIONAL DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000046', 'STICKER''S PACK DOLARES COMPLEMENTARIA', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000045', 'STICKER''S PACK DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000044', 'S S DELTA (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000043', 'FORMATION 3 SA DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000042', 'GONHERRPLAST SA DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000041', 'STICKER''S PACK SA DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000040', 'DESARROLLOS GRO (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000039', 'STARCLUSTER LOGISTICS COMPLEMENTARIA DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000038', 'STARCLUSTER LOGISTICS DOLARES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000037', 'STARCLUSTER LOGISTICS MEXICO S. DE R.L. DE C.V', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000036', 'ULINE SHIPPING SUPLIES S DE RL DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000035', 'KP EXTRUSION DE MEXICO SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000034', 'BOTON CLASS SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000033', 'PLASTICS MANAGEMENT SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000032', 'EMPACKUSA S DE RL DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000031', 'FLEXOCUERO Y PELETERA MONTERREY SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000030', 'MATERIAS PRIMAS CYR SA DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000029', 'ONE PLUS INDUSTRIAL SOLUTION SA DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000028', 'DONG JIN TECHWIN SA DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000027', 'NARA TECH SA DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000026', 'PAPELES IMPRESOS Y EMPAQUE EN GENERAL (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000025', 'CW QUERETARO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000024', 'TECNOLOGIAS DE POLIESTIRENO (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000023', 'HEXAGONOS MEXICANOS SA DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000022', 'MTY CONSULTORES SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000021', 'CFE SUMINISTRADOR DE SERVICIOS BASICOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000020', 'CORRUGADOS DE BAJA CALIFORNIA S DE RL DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000019', 'INTERAMERICANA DE ENLACE SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000018', 'DICKINSON DEL NORTE SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000017', 'COMPUTACION Y DESARROLLO RUGA SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000016', 'STARION MONTERREY MEXICO SA DE CV USD COMPLEMENT', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000015', 'STARION MONTERREY MEXICO USD', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000014', 'LG ELECTRONICS MONTERREY MEXICO SA DE CV USD COMPL', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000013', 'LG ELECTRONICS MONTERREY MEXICO SA DE CV USD', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000012', 'CARGA SEGURA S DE RL DE MI', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000011', 'KRAEM SA DE CV', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000010', 'TAE SUNG MEXICO SA DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000009', 'CORRUGADOS Y SUMINISTROS DEL NORTE SA DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000008', 'STARION MONTERREY MEXICO SA DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000007', 'LG ELECTRONICS MONTERREY MEXICO SA DE CV (MP)', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000006', 'PROVEEDORES SERVICIOS', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000005', 'PROVEEDORES MP', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000004', 'PROVEEDORES USD COMPLEM.', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000003', 'PROVEEDORES USD', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000002', 'PROVEEDORES C-P', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000001', 'PROVEEDORES MXN', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('211000000', 'PROVEDORES', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('210000000', 'PASIVO CIRCULANTE', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('200000000', 'PASIVO', 'pasivo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('127001004', 'OTROS GASTOS POR AMORTIZAR', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('127001003', 'MEJORAS A PROPIEDADES ARRENDADAS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('127001002', 'GASTOS DE INSTALACION', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('127001001', 'SEGUROS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('127001000', 'GASTOS ANTICIPADOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('127000000', 'ACTIVO DIFERIDO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126013001', 'DEPRECIACION EQUIPO DE COMUNICACION', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126013000', 'EQUIPO DE COMUNICACION', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126012002', 'DEPRECIACION HERRAMIENTAS QRO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126012001', 'DEPRECIACION HERRAMIENTA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126012000', 'HERRAMIENTA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126011001', 'DEPRECIACION PINTURA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126011000', 'PINTURA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126010001', 'DEPRECIACION TUBO DE COBRE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126010000', 'TUBO DE COBRE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126009001', 'DEPRECIACION PLASTICOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126009000', 'PLASTICOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126008001', 'DEPRECIACION EPP', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126008000', 'EPP', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126007002', 'DEPRECIACION EPS QRO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126007001', 'DEPRECIACION EPS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126007000', 'EPS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126006001', 'DEPRECIACION DE EQUIPO DE TRANSPORTE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126006000', 'EQUIPO DE TRANSPORTE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126005001', 'DEPRECIACION DE SOFTWARE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126005000', 'SOFTWARE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126004002', 'EQUIPO DE COMPUTO QRO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126004001', 'DEPRECIACION EQUIPO DE COMPUTO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126004000', 'EQUIPO DE COMPUTO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126003002', 'DEPRECIACION MOBILIARIO Y EQ OFICINA QRO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126003001', 'DEPRECIACION DE MOBILIARIO Y EQUIPO DE OFICINA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126003000', 'MOBILIARIO Y EQUIPO DE OFICINA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126002001', 'DEPRECIACION DE MAQUINARIA Y EQUIPO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126002000', 'MAQUINAFIA Y EQUIPO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126001001', 'DEPRECIACION DE EDFICIO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126001000', 'EDIFICIO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('126000000', 'DEPRECIACION ACUMULADA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125018000', 'TERRENO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125017000', 'EQUIPO COMPUTO QRO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125016000', 'MOBILIARIO Y EQ OFICINA QRO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125015000', 'HERRAMIENTA QRO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125014000', 'MAQUINARIA EPS QUERETARO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125013000', 'EQUIPO DE COMUNICACION', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125012000', 'HERRAMIENTA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125011000', 'PINTURA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125010000', 'TUBO DE COBRE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125009000', 'PLASTICOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125008000', 'EPP', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125007000', 'EPS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125006000', 'EQUIPO DE TRANSPORTE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125005000', 'SOFTWARE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125004000', 'EQUIPO DE COMPUTO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125003000', 'MOBILIARIO Y EQUIPO DE OFICINA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125002000', 'MAQUINARIA Y EQUIPO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125001000', 'EDIFICIO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('125000000', 'ACTIVO FIJO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124007000', 'ESTIMACION INVENTARIOS OBSOLETOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124006002', 'SEMITERMINADO PST02', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124006001', 'SEMITERMINADO PST01', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124006000', 'SEMITERMINADOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124005000', 'MERCANCIAS EN TRANSITO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124004001', 'EXISTENCIA INDIRECTOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124004000', 'MATERIALES INDIRECTOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124003005', 'EXISTENCIA PTEPS QRO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124003004', 'EXISTENCIA PTEPS01 PRODUCTO TERMINADO EPS 01', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124003003', 'EXISTENCIA PTF01 PRODUCTO TERMINADO FINAL 01', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124003002', 'EXISTENCIA PTEPS02 (M.PRIMA INTERNA)', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124003001', 'EXISTENCIA PTF02 PRODUCTO TERM FIN.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124003000', 'PRODUCTO TERMINADO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124002002', 'EXISTENCIA MP01 EN PRODUCCION', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124002001', 'TRABAJO EN PROCESO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124002000', 'PRODUCCION EN PROCESO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124001003', 'EXISTENCIA MATERIA PRIMA QRO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124001002', 'EXISTENCIA MATERIA PRIMA 02', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124001001', 'EXISTENCIA MATERIA PRIMA 01', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124001000', 'MATERIA PRIMA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('124000000', 'INVENTARIOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('123000005', 'IETU', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('123000004', '15% IVA RETENIDO SCRAP', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('123000003', 'IMPAC', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('123000002', 'CAS PAGADO EN NOMINAS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('123000001', 'ISR RETENIDO BANCOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('123000000', 'OTROS IMPUESTOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('122000002', 'ISR PAGO INDEBIDO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('122000001', 'PAGOS PROVISIONALES ISR', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('122000000', 'ISR', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('121000002', 'SUBSIDIO AL EMPLEO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('121000001', 'IVA A FAVOR', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('121000000', 'IMPUESTOS A FAVOR', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('120000005', 'IVA PENDIENTE POR RETENER', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('120000004', 'IVA ACREDITABLE RETENIDO EFECTIVAM', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('120000003', 'IVA PENDIENTE DE ACREDITAR', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('120000002', 'IVA ACREDTIBLE IMPORTACION', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('120000001', 'IVA ACREDITABLE EFECTIVAMENTE PAGADO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('120000000', 'IVA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119001009', 'DIVERSOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119001008', 'SECRETARIA DE HACIENDA Y CREDITO PUBLICO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119001007', 'INFRA SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119001006', 'SEGUROS COMERCIAL AMERICA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119001005', 'SEGUROS COMERCIAL AMERICA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119001004', 'PRAXAIR', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119001003', 'NEXTEL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119001002', 'CIA. MEXICANA DE GAS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119001001', 'COMISION FEDERAL DE ELECTRICIDAD', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119001000', 'SERVICIOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119000004', 'HUMBERTO SEPULVEDA RENTA BODEGA CORTE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119000003', 'SCOTIABANK', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119000002', 'TERSON, S.A. DE C.V.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119000001', 'RENTA DE INMUEBLES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('119000000', 'DEPOSITOS EN GARANTIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('118000001', 'ANTICIPOS A PROVEEDORES SERVICIOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('118000000', 'ANTICIPO A PROVEEDORES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('117000005', 'CW FRANQUICIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('117000004', 'CW QUERETARO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('117000003', 'SUK HYUN', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('117000002', 'OTROS DEUDORES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('117000001', 'EMPLEADOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('117000000', 'DEUDORES DIVERSOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003013', 'LG ELECTRONICS VEHICLE COMPONENTS USA LC COMPLEMEN', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003012', 'LG ELECTRONICS VEHICLE COMPONENTS USA LC', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003011', 'SHINSEONG DELTA TECH INDONESIA DLL COMPL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003010', 'SHINSEONG DELTA TECH INDONESIA DLL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003009', 'NIDEC GLOBAL APPLIANCE NORTH AMERICA, INC COMP', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003008', 'NIDEC GLOBAL APPLIANCE NORTH AMERICA, INC', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003007', 'IMAGINA LEASING COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003006', 'IMAGINA LEASING DLL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003005', 'MAN WAH GLOBAL (MACAO) LIMITED COMPLE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003004', 'MAN WAH GLOBAL (MACAO) LIMITED DLL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003003', 'LG ELECTRONICS USA INC MX', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003002', 'LG ELECTRONICS USA INC DOLARES COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003001', 'LG ELECTRONICS USA INC DOLARES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115003000', 'CLIENTES EXTRANJEROS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115002007', 'CHEONG WOON HIGTECH', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115002006', 'CHEONG WOON HIGHTECH CO. COMPL.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115002005', 'CHEONG WOON HIGHTECH CO.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115002004', 'CHEONG WOON HIGHTECH CO (AUM.C) COMPL.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115002003', 'CHEONG WOON HIGHTECH CO (AUM. CAP.)', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115002002', 'PROVEEDORA INDUSTRIAL SERVICIOS DE OUTS.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115002001', 'CHEONG WOON MEXICO SERVICES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115002000', 'CUENTAS POR PAGAR FILIALES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001560', 'RECICLADORA SAN RAFAEL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001559', 'TOP RUN MEXICO COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001558', 'TOP RUN MEXICO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001557', 'ASIAN FOOD MARKETING', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001556', 'CW TECH', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001555', 'DAEHAN SOLUTION MEXICO MONTERREY COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001554', 'DAEHAN SOLUTION MEXICO MONTERREY', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001553', 'HENAN NEW KELONG ELECTRICAL APPLIANCES CO. COMPLEM', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001552', 'HENAN NEW KELONG ELECTRICAL APPLIANCES CO., LTD.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001551', 'JUNG NAM LEE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001550', 'LG ELECTRONICS VIETNAM HAI PHONG CO., COMPLEMENTAR', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001549', 'LG ELECTRONICS VIETNAM HAI PHONG CO., LTD', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001548', 'NEPCOREY', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001547', 'CW FRANQUICIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001546', 'INNOVACION PACKING AUTOMOTORES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001545', 'HANWHA ADVANCED MATERIALS MEXICO COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001544', 'HANWHA ADVANCED MATERIALS MEXICO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001543', 'NEPCOMEX', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001542', 'YOURIM CONSTRUCTION', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001541', 'LEON HECTOR NOYOLA FLORES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001540', 'RECICLADORA FL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001539', 'FANASA DOLARES COMPL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001538', 'FANASA DOLARES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001537', 'WHIRLPOOL MEXICO DLL COMPLE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001536', 'WHIRLPOOL MEXICO DLL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001535', 'MEXIPC', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001534', 'SS DELTA TECH MEXICO DOLARES COMPL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001533', 'SS DELTA TECH MEXICO DOLARES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001532', 'SAMSUNG ELECTRONICS DIGITAL APPLIANCES MEXICO COMP', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001531', 'SAMSUNG ELECTRONICS DIGITAL APPLIANCES MEXICO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001530', 'ELICAMEX', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001528', 'ARCQ ARQUITECTURA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001527', 'BSH HOME APPLIANCES COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001526', 'BSH HOME APPLIANCES DLL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001525', 'HYUNDAI MOBIS MEXICO COMPLE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001524', 'HYUNDAI MOBIS MEXICO DLL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001523', 'WHIRLPOOL OVERSEAS MANUFACTURING, S.A.R.L COMPLE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001522', 'WHIRLPOOL OVERSEAS MANUFACTURING, S.A.R.L', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001520', 'AMAURI JULIAN PORTALES HINOJOSA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001519', 'INNOVACION PACKING AUTOMOTORES COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001518', 'INNOVACION PACKING AUTOMOTORES DLL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001517', 'REAL PACKING MEXICO COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001516', 'REAL PACKING MEXICO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001515', 'ACERLO SA DE CV COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001514', 'ACERLO SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001513', 'STARION MONTERREY MEXICO SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001512', 'CW QUERETARO SA DE CV COMPLE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001511', 'CW QUERETARO SA DE CV DLL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001510', 'LG ELECTRONICS REYNOSA COMPLE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001509', 'LG ELECTRONICS REYNOSA DLL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001508', 'HONGKI CHAE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001507', 'PR TECH S DE RL DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001506', 'WHIRLPOOL INTERNACIONAL COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001505', 'WHIRLPOOL INTERNACIONAL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001504', 'LG Electronics Reynosa S.A. de C.V.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001503', 'KP EXTRUSION DE MEXICO SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001502', 'DRNEC SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001501', 'HANMAC MEXICO SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001054', 'Comercializadora Queretana Esmerado Hernandez SA D', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001053', 'HEXAGONOS MEXICANOS S.A. DE C.V.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001052', 'JIN TECH S. DE R.L. C.V.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001051', 'JMIMX S.A. DE C.V. DOLARES COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001050', 'JMIMX S.A. DE C.V. DOLARES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001049', 'HAENG SUNG ELECTRONICS MONTERREY DE MEXICO, S.A. D', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001048', 'Comercial Acros Whirlpool S. DE R.L. DE C.V.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001047', 'REDVERSA S.A. DE C.V.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001046', 'DISE&OS Y MERCADOTECNIA DOLARES COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001045', 'DISE&OS Y MERCADOTECNIA DOLARES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001044', 'FORMATION 3 S.A. DE C.V', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001043', 'HECTOR REYNA HERNANDEZ', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001042', 'SERVICIOS LG MONTERREY MEXICO SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001041', 'TAE SUNG MEXICO SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001040', 'Eduardo Sanchez Aldama', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001039', 'TECNOLOG&Iacute;AS POLIESTIRENO S.A DE C.V', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001038', 'PANTOS LOGISTICS MEXICO SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001037', 'PROMOTORA SKU SAP I DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001036', 'STARCLUSTER LOGISTICS DOLARES COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001035', 'STARCLUSTER LOGISTICS DOLARES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001034', 'STARCLUSTER LOGISTICS MEXICO S.DE R.L DE C.V', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001033', 'LENNOX SWITZERLAND COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001032', 'LENNOX SWITZERLAND GMBH', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001031', 'CW QUERETARO S.A. DE C.V.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001030', 'INDUSTRIAS ACROS WHIRLPOOL COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001029', 'INDUSTRIAS ACROS WHIRLPOOL S DE RL DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001028', 'SERVICIOS EN PUERTOS Y TERMINALES S.A. DE C.V.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001027', 'COMERCIALIZADORA FARMACEUTICA DE CHIAPAS, S.A. PI', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001026', 'Farmacias Benavides, S.A.B. de C.V.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001025', 'KCU MEXICO, S.A. DE C.V.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001024', 'IMPCO, S. de R.L. de C.V. COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001023', 'IMPCO, S. de R.L. de C.V.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001022', 'LII MEXICO HOLDINGS LTD COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001021', 'LII MEXICO HOLDINGS LTD', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001020', 'SEAH PRECISION MEXICO S.A. DE C.V.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001019', 'BANCO NACIONAL DE MEXICO USD COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001018', 'BANCO NACIONAL DE MEXICO USD', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001017', 'BANCO NACIONAL DE MEXICO S.A.', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001016', 'FINANCIERA BAJIO SA DE CV SOFOM ER', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001015', 'NARA TECH SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001014', 'INPUVE SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001013', 'CORRUGADOS Y SUMINISTROS DEL NORTE SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001012', 'DONG JIN TECHWIN SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001011', 'SS DELTA TECH MEXICO SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001010', 'STARION MONTERREY MEXICO SA DE CV USD COMPLEMENTAR', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001009', 'STARION MONTERREY MEXICO SA DE CV USD', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001008', 'STARION MONTERREY MEXICO SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001007', 'LG ELECTRONICS MONTERREY MEXICO SA DE CV USD COMPL', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001006', 'LG ELECTRONICS MONTERREY MEXICO SA DE CV USD', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001005', 'LG ELECTRONICS MONTERREY MEXICO SA DE CV', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001004', 'PROVISION CUENTAS INCOBRABLES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001003', 'COMPLEMENTARIA CLIENTES USD', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001002', 'CLIENTES USD', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001001', 'CLIENTES MXN', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115001000', 'CLIENTES NACIONALES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('115000000', 'CLIENTES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('113000002', 'BANORTE CTA. #8078', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('113000000', 'INVERSIONES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100016', 'MONEX DOLARES COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100015', 'MONEX DOLARES', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100014', 'BANCO BASE USD COMPLEMENTARIA 2034', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100013', 'BANCO BASE USD 2034', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100012', 'INBURSA USD COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100011', 'INBURSA USD', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100010', 'BANAMEX USD #1366 COMP', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100009', 'BANAMEX USD 98011366', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100008', 'BANCO SHINHAN DE MEXICO, S.A. COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100007', 'BANCO SHINHAN DE MEXICO S.A. USD INSTITUCION DE BM', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100006', 'BBVA BANCOMER USD COMPLEM 10621', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100005', 'BBVA BANCOMER USD 10621', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100004', 'SANTANDER CTA #5351 COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100003', 'SANTANDER CTA #82500595351', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100002', 'BANORTE CTA #0435 COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100001', 'BANORTE CTA # 103720435', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112100000', 'BANCOS USD', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000020', 'INTERCAM EXPRESS DLL 36 COMPLEMENTARIA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000019', 'INTERCAM EXPRESS DLL 36', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000018', 'AFIRME', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000017', 'INTERCAM DLL CTA 28 COMPLE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000016', 'INTERCAM DLL CTA 28', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000015', 'INTERCAM MXM CTA 10', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000014', 'BANCO BASE MX', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000013', 'BBVA BANCOMER 439100', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000012', 'BBVA BANCOMER CTA 9920 QRO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000011', 'BANAMEX 3655 QRO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000010', 'UNBURSA MXN', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000009', 'BBVA BANCOMER CTA#4639', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000008', 'BANREGIO CTA #12041863300173', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000007', 'BANAMEX CTA #9246', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000006', 'BANCO SHINHAN DE MEXICO, S.A. INSTITUCION DE BM', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000005', 'BBVA BANCOMER NO SE USA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000004', 'SANTANDER CTA # 65503203207', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000003', 'BANREGIO CTA # 012041960017', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000002', 'HSBC CTA # 4033780636', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000001', 'BANORTE CTA # 528005993', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('112000000', 'BANCOS', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('111000002', 'PLANTA 2', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('111000001', 'PLANTA 1', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('111000000', 'CAJA', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('110000000', 'ACTIVO CIRCULANTE', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

INSERT INTO cuentas_contables (codigo_cuenta, nombre_cuenta, tipo_cuenta)
  VALUES ('100000000', 'ACTIVO', 'activo')
  ON CONFLICT (codigo_cuenta) DO UPDATE
    SET nombre_cuenta = EXCLUDED.nombre_cuenta,
        tipo_cuenta   = EXCLUDED.tipo_cuenta;

COMMIT;
\echo '✅ 1139 cuentas importadas/actualizadas.'
