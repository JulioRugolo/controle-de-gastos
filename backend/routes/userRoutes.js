const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Criar conta
router.post('/register', userController.registerUser);

// Login
router.post('/login', userController.loginUser);

// Consultar usuário
router.get('/:id', userController.getUser);

module.exports = router;