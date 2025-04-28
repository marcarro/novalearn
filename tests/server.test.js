const request = require('supertest');
const app = require('../server');

describe('Auth API Endpoints', () => {
  it('Login exitoso con datos validos', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'ana.t',
        password: 'libro123'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('fullName', 'Ana Torres');
    expect(response.body.user).toHaveProperty('favoriteBook', 'Cien Años de Soledad');
  });

  it('Login fallido con datos invalidos', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'invalid',
        password: 'wrongpassword'
      });
    
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty('message');
  });

  it('Requerir usuario y password', async () => {
    const response1 = await request(app)
      .post('/login')
      .send({
        username: 'ana.t'
      });
    
    expect(response1.statusCode).toBe(400);
    expect(response1.body.success).toBe(false);
    
    const response2 = await request(app)
      .post('/login')
      .send({
        password: 'libro123'
      });
    
    expect(response2.statusCode).toBe(400);
    expect(response2.body.success).toBe(false);
    
    const response3 = await request(app)
      .post('/login')
      .send({});
    
    expect(response3.statusCode).toBe(400);
    expect(response3.body.success).toBe(false);
  });

  it('Verificar datos de los usuarios', async () => {
    const marcoResponse = await request(app)
      .post('/login')
      .send({
        username: 'marco.r',
        password: 'lectura456'
      });
    
    expect(marcoResponse.statusCode).toBe(200);
    expect(marcoResponse.body.success).toBe(true);
    expect(marcoResponse.body.user).toHaveProperty('fullName', 'Marco Ramírez');
    expect(marcoResponse.body.user).toHaveProperty('favoriteBook', 'El Principito');
    
    const sofiaResponse = await request(app)
      .post('/login')
      .send({
        username: 'sofia.m',
        password: 'novela789'
      });
    
    expect(sofiaResponse.statusCode).toBe(200);
    expect(sofiaResponse.body.success).toBe(true);
    expect(sofiaResponse.body.user).toHaveProperty('fullName', 'Sofía Morales');
    expect(sofiaResponse.body.user).toHaveProperty('favoriteBook', 'Orgullo y Prejuicio');
  });
});