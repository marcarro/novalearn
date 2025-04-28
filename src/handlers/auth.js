class AuthHttpHandler {
    constructor(authController) {
      this.authController = authController;
    }
  
    async login(req, res) {
      try {
        const { username, password } = req.body;
        
        if (!username || !password) {
          return res.status(400).json({ 
            success: false, 
            message: 'El nombre de usuario y la contraseña son obligatorios' 
          });
        }
        
        const userData = await this.authController.login(username, password);
        
        res.status(200).json({
          success: true,
          user: userData
        });
      } catch (error) {
        if (error.message === 'Usuario o password invalido') {
          return res.status(401).json({ 
            success: false, 
            message: 'Usuario o contraseña no válidos' 
          });
        }
        
        res.status(500).json({ 
          success: false, 
          message: 'Error en el servidor' 
        });
      }
    }
  
    renderLoginPage(req, res) {
      res.sendFile('login.html', { root: './public' });
    }
  
    renderWelcomePage(req, res) {
      res.sendFile('welcome.html', { root: './public' });
    }
  }
  
  module.exports = AuthHttpHandler;