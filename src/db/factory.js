const AuthService = require('./authService');

class DBFactory {
    static create() {
        return new AuthService();
    }
}

module.exports = DBFactory;