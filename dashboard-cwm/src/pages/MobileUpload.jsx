import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Camera, Upload, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { API_BASE } from '../api.js';

export default function MobileUpload({ sessionId }) {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, success, error
  const imageRef = useRef(null);

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
        if (!blob) return resolve(null);
        resolve(new File([blob], 'cropped_ticket.jpg', { type: 'image/jpeg' }));
      }, 'image/jpeg');
    });
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCrop(undefined);
      setStatus('idle');
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    let fileToUpload = null;
    
    if (completedCrop && completedCrop.width && completedCrop.height && imageRef.current) {
      fileToUpload = await getCroppedImg(imageRef.current, completedCrop);
    }

    if (!fileToUpload) return;

    const formData = new FormData();
    formData.append('documento', fileToUpload);

    try {
      setSubiendo(true);
      const res = await fetch(`${API_BASE}/api/recibos/upload-qr/${sessionId}`, {
        method: 'POST',
        body: formData
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setSubiendo(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 size={64} className="text-emerald-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">¡Listo!</h1>
        <p className="text-gray-400">El ticket se envió a tu computadora y está siendo analizado por la IA.</p>
        <p className="text-gray-500 mt-8 text-sm">Ya puedes cerrar esta pestaña.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      <div className="p-4 bg-gray-900 border-b border-gray-800 text-center">
        <h1 className="text-lg font-bold">Enviar Ticket a APagos</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {!imgSrc ? (
          <label className="flex flex-col items-center justify-center bg-gray-800 border-2 border-dashed border-gray-600 rounded-2xl w-full h-64 cursor-pointer hover:bg-gray-700 active:bg-gray-700 transition-colors">
            <Camera size={48} className="text-orange-500 mb-4" />
            <span className="text-xl font-bold">Tomar Foto</span>
            <span className="text-sm text-gray-400 mt-2">Se abrirá tu cámara</span>
            <input 
              type="file" 
              accept="image/*"
              capture="environment"
              onChange={onSelectFile}
              className="hidden"
            />
          </label>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-h-[60vh] overflow-auto bg-gray-900 border border-gray-700 rounded-lg flex flex-col items-center">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
              >
                <img 
                  ref={imageRef}
                  src={imgSrc} 
                  alt="Crop" 
                  style={{ maxHeight: '60vh', width: 'auto' }}
                />
              </ReactCrop>
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">
              Arrastra para recortar solo el ticket (opcional)
            </p>
            
            <div className="w-full grid grid-cols-2 gap-4 mt-6">
              <button 
                onClick={() => { setImgSrc(''); setStatus('idle'); }}
                className="py-3 px-4 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-700"
                disabled={subiendo}
              >
                Retomar
              </button>
              <button 
                onClick={handleUpload}
                disabled={subiendo || (!completedCrop?.width && !completedCrop?.height)}
                className="py-3 px-4 rounded-xl bg-orange-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-orange-500 disabled:opacity-50"
              >
                {subiendo ? <RefreshCw size={20} className="animate-spin" /> : <Upload size={20} />}
                {subiendo ? 'Enviando...' : 'Enviar Ticket'}
              </button>
            </div>
            
            {status === 'error' && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200 text-sm">
                <AlertCircle size={16} /> Hubo un error al subir el ticket. Intenta de nuevo.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
