import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

// Asegurarse de cargar variables
if (!process.env.EXPEDIENTES_PATH) {
  process.loadEnvFile(path.join(process.cwd(), '.env'));
}

export const NAS_PATHS = {
  expedientes: process.env.EXPEDIENTES_PATH ? process.env.EXPEDIENTES_PATH.replace(/['"]/g, '') : null,
  pagos: process.env.NAS_PAYMENTS_PATH ? process.env.NAS_PAYMENTS_PATH.replace(/['"]/g, '') : null,
};

export async function asegurarCarpetaDossier(anio, mes, rfcEmisor, uuid) {
  if (!NAS_PATHS.expedientes) throw new Error("Ruta NAS expedientes no configurada.");
  const carpeta = path.join(NAS_PATHS.expedientes, anio, String(mes).padStart(2, '0'), rfcEmisor, uuid);
  if (!fs.existsSync(carpeta)) {
    await fsp.mkdir(carpeta, { recursive: true });
  }
  return carpeta;
}

export function isValidNASPath(ruta) {
  const rutaNormalizada = path.normalize(ruta);
  const basesPermitidas = [NAS_PATHS.expedientes, NAS_PATHS.pagos]
    .filter(Boolean)
    .map(p => path.normalize(p));
    
  return basesPermitidas.some(base => rutaNormalizada.startsWith(base));
}

import { execSync } from 'child_process';

export function conectarRedNas(rutaNas) {
  try {
    const rutaWindows = rutaNas.replace(/\//g, '\\');
    const match = rutaWindows.match(/^(\\\\[^\\]+\\[^\\]+)/);
    const recursoRaiz = match ? match[1] : rutaWindows;
    execSync(`net use "${recursoRaiz}" "${process.env.NAS_PASSWORD}" /user:${process.env.NAS_USER} /persistent:no`, { stdio: 'ignore' });
    console.log(`✅ Acceso a NAS autorizado: ${recursoRaiz}`);
  } catch (error) {
    // Si ya está conectado, ignorar
    console.log(`ℹ️ Nota: El recurso NAS ya se encuentra disponible o hubo un error silencioso.`);
  }
}
