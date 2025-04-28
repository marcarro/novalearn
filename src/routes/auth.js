const express = require('express');
const router = express.Router();

const DBFactory = require('../db/factory');
const AuthController = require('../controllers/auth');
const AuthHttpHandler = require('../handlers/auth');

const authService = DBFactory.create();
const authController = new AuthController(authService);

const authHandler = new AuthHttpHandler(authController);

router.post('/login', authHandler.login.bind(authHandler));

module.exports = router;