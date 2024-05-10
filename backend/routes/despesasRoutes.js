const express = require('express');
const router = express.Router();
const despesasController = require('../controllers/despesasController');
const authenticateJWT = require('../middlewares/authenticateJWT'); // Importe o middleware de autenticação JWT

// Rota para adicionar despesa
router.post('/adicionar', authenticateJWT, despesasController.adicionarDespesa); // Use o middleware de autenticação JWT aqui

// Rota para consultar todas as despesas
router.get('/', despesasController.consultarDespesas);

module.exports = router;
