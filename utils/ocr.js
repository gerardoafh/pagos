import { execSync } from 'child_process';
import { readFileSync, unlinkSync } from 'fs';
import path from 'path';

/**
 * Convierte el primer folio de un PDF a imagen (Base64) usando poppler-utils (pdftoppm) o lee una imagen directamente
 */
function obtenerImagenBase64(rutaArchivo, extension) {
  if (extension === '.pdf') {
    const rutaImagenTmp = `${rutaArchivo}_tmp`;
    try {
      // Usamos pdftoppm (de poppler-utils) para convertir la página 1 a jpeg
      execSync(`pdftoppm -jpeg -f 1 -l 1 "${rutaArchivo}" "${rutaImagenTmp}"`);
      // pdftoppm añade sufijos, usualmente -1.jpg
      const archivoGenerado = `${rutaImagenTmp}-1.jpg`;
      const data = readFileSync(archivoGenerado);
      unlinkSync(archivoGenerado); // limpiar
      return data.toString('base64');
    } catch (err) {
      console.error('Error al convertir PDF a imagen:', err);
      throw new Error('No se pudo procesar el PDF para OCR.');
    }
  } else {
    // Es una imagen directa
    const data = readFileSync(rutaArchivo);
    return data.toString('base64');
  }
}

/**
 * Envía la imagen al modelo multimodal de Ollama para extraer datos del recibo
 */
export async function procesarReciboOCR(rutaArchivo, nombreArchivo) {
  const extension = path.extname(nombreArchivo).toLowerCase();
  
  try {
    const base64Data = obtenerImagenBase64(rutaArchivo, extension);
    
    // Formato de Prompt estricto para extraer un JSON
    const promptText = `
      Eres un asistente experto en contabilidad. Analiza esta imagen de un recibo o ticket de compra.
      Extrae la siguiente información y devuélvela ESTRICTAMENTE como un JSON válido, sin ningún otro texto:
      {
        "proveedor": "Nombre del negocio o comercio",
        "fecha": "YYYY-MM-DD",
        "monto": 0.00,
        "concepto": "Breve resumen de lo que se compró"
      }
      Si no puedes determinar la fecha, usa la fecha actual. Si no puedes ver el monto, pon 0.
    `;

    const cuerpoPeticion = {
      model: process.env.OLLAMA_MODEL || "glm-4.7-flash",
      messages: [
        {
          role: "user",
          content: promptText,
          images: [base64Data]
        }
      ],
      stream: false,
      format: "json" // Fuerza a Ollama a devolver JSON
    };

    const urlOllama = process.env.OLLAMA_API_URL || 'http://192.168.1.56:11434/api/chat';
    
    const respuesta = await fetch(urlOllama, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpoPeticion),
    });

    if (!respuesta.ok) throw new Error(`Ollama falló con status: ${respuesta.status}`);

    const data = await respuesta.json();
    let contenido = data.message?.content || '{}';
    
    // Parsear el JSON devuelto
    const resultadoJSON = JSON.parse(contenido);
    return resultadoJSON;
    
  } catch (error) {
    console.error('⚠️ [OCR] Falló el procesamiento del recibo:', error);
    throw error;
  }
}
