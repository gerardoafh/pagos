import { connection as redis } from './queues.js';

export const cacheMiddleware = (durationInSeconds) => {
  return async (req, res, next) => {
    // Solo cacheamos peticiones GET
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__express__${req.originalUrl || req.url}`;
    
    try {
      const cachedResponse = await redis.get(key);
      if (cachedResponse) {
        // Enviar respuesta desde el caché
        return res.json(JSON.parse(cachedResponse));
      } else {
        // Sobrescribir res.json para guardar en caché antes de enviar
        const originalJson = res.json.bind(res);
        res.json = (body) => {
          // Guardar en Redis de forma asíncrona
          redis.set(key, JSON.stringify(body), 'EX', durationInSeconds).catch(err => {
            console.error('Error al guardar en caché de Redis:', err);
          });
          return originalJson(body);
        };
        next();
      }
    } catch (error) {
      console.error('Error en middleware de caché:', error);
      // Fallback: si falla Redis, continua normal
      next();
    }
  };
};

export const clearCachePrefix = async (prefix) => {
  try {
    const keys = await redis.keys(`__express__${prefix}*`);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  } catch (error) {
    console.error('Error al limpiar caché:', error);
  }
};
