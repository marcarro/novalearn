const AuthService = require('../src/db/authService');
const AuthController = require('../src/controllers/auth');

describe('Auth Service', () => {
  let authService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('Inicializar con usuarios de prueba', () => {
    expect(authService.initialized).toBe(true);
    expect(authService.users.size).toBe(3);
    expect(authService.users.has('ana.t')).toBe(true);
    expect(authService.users.has('marco.r')).toBe(true);
    expect(authService.users.has('sofia.m')).toBe(true);
  });

  it('Verificar datos validos', async () => {
    const user = await authService.verifyCredentials('ana.t', 'libro123');
    
    expect(user).not.toBeNull();
    expect(user.username).toBe('ana.t');
    expect(user.fullName).toBe('Ana Torres');
    expect(user.favoriteBook).toBe('Cien Años de Soledad');
  });

  it('Rechazar datos invalidos', async () => {

    const result1 = await authService.verifyCredentials('nonexistent', 'libro123');
    expect(result1).toBeNull();
    

    const result2 = await authService.verifyCredentials('ana.t', 'wrongpassword');
    expect(result2).toBeNull();
    

    const result3 = await authService.verifyCredentials('nonexistent', 'wrongpassword');
    expect(result3).toBeNull();
  });
});

describe('Auth Controller', () => {
  let authService;
  let authController;

  beforeEach(() => {
    authService = new AuthService();
    authController = new AuthController(authService);
  });

  it('Arrojar datos de usuario para login valido', async () => {
    const userData = await authController.login('ana.t', 'libro123');
    
    expect(userData).toHaveProperty('fullName', 'Ana Torres');
    expect(userData).toHaveProperty('favoriteBook', 'Cien Años de Soledad');
  });

  it('Arrojar error para login invalido', async () => {
    await expect(authController.login('nonexistent', 'wrongpassword'))
      .rejects.toThrow('Usuario o password invalido');
  });

  it('Arrojar error para datos faltantes', async () => {

    await expect(authController.login(null, 'libro123'))
      .rejects.toThrow('Se requiere ingresar un usuario y un password');


    await expect(authController.login('ana.t', null))
      .rejects.toThrow('Se requiere ingresar un usuario y un password');


    await expect(authController.login(null, null))
      .rejects.toThrow('Se requiere ingresar un usuario y un password');
  });

  it('Verificar pruebas por el controlador', async () => {

    const marcoData = await authController.login('marco.r', 'lectura456');
    expect(marcoData).toHaveProperty('fullName', 'Marco Ramírez');
    expect(marcoData).toHaveProperty('favoriteBook', 'El Principito');
    

    const sofiaData = await authController.login('sofia.m', 'novela789');
    expect(sofiaData).toHaveProperty('fullName', 'Sofía Morales');
    expect(sofiaData).toHaveProperty('favoriteBook', 'Orgullo y Prejuicio');
  });
});