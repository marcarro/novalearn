const DBService = require('./dbService');

class AuthService extends DBService {
  constructor() {
    super();
    this.initialized = true;
    this.users = new Map();
    
    const registeredUsers = [
      { 
        username: 'ana.t', 
        password: 'libro123', 
        fullName: 'Ana Torres', 
        favoriteBook: 'Cien Años de Soledad' 
      },
      { 
        username: 'marco.r', 
        password: 'lectura456', 
        fullName: 'Marco Ramírez', 
        favoriteBook: 'El Principito' 
      },
      { 
        username: 'sofia.m', 
        password: 'novela789', 
        fullName: 'Sofía Morales', 
        favoriteBook: 'Orgullo y Prejuicio' 
      }
    ];

    registeredUsers.forEach((user) => {
      this.users.set(user.username, user);
    });
  }

  async verifyCredentials(username, password) {
    if (!this.initialized) {
      throw new Error('Service not initialized');
    }

    const user = this.users.get(username);
    
    if (!user || user.password !== password) {
      return null;
    }

    return {
      username: username,
      fullName: user.fullName,
      favoriteBook: user.favoriteBook
    };
  }
}

module.exports = AuthService;