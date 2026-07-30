// Helper centralizado para la URL base de la API.
// En Docker: VITE_API_URL = "" → las llamadas van a /api/... (Nginx hace el proxy)
// En desarrollo local: VITE_API_URL = "http://localhost:3000" (vite.config proxy o directo)
export const API_BASE = import.meta.env.VITE_API_URL || '';

// Socket.io: si VITE_API_URL es vacío, conecta a la misma origin (a través de Nginx)
export const SOCKET_URL = import.meta.env.VITE_API_URL || window.location.origin;
