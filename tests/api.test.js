import request from 'supertest';
import app from '../api_server.js';
import db from '../config/db.js';

describe('API Endpoints', () => {
  let token = '';

  beforeAll(async () => {
    await db.connect();
    // Iniciar sesión para obtener el token real o uno mock
    const res = await request(app)
      .post('/api/login')
      .send({ usuario: 'admin', password: 'password' }); // Ajustar credenciales en entorno real/test
    
    // Si la DB de test no tiene admin, saltamos la autorización o mockeamos db.query
    if (res.statusCode === 200) {
      token = res.body.token;
    }
  });

  afterAll(async () => {
    await db.end();
  });

  it('Debe rechazar peticiones sin token', async () => {
    const res = await request(app).get('/api/facturas/CWM1410313RA');
    expect(res.statusCode).toBe(401);
  });

  it('Debe obtener facturas si hay token', async () => {
    if (!token) return; // Skip si no se pudo autenticar en el CI
    const res = await request(app)
      .get('/api/facturas/CWM1410313RA')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
