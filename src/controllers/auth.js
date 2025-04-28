class AuthController {
    constructor(authService) {
      this.authService = authService;
    }
  
    async login(username, password) {
      if (!username || !password) {
        throw new Error('Se requiere ingresar un usuario y un password');
      }
      
      const user = await this.authService.verifyCredentials(username, password);
      
      if (!user) {
        throw new Error('Usuario o password invalido');
      }
      
      return {
        fullName: user.fullName,
        favoriteBook: user.favoriteBook
      };
    }
  }
  
  module.exports = AuthController;