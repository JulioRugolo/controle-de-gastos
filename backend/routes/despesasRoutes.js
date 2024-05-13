const express = require('express');
const router = express.Router();
const despesasController = require('../controllers/despesasController');
const authenticateJWT = require('../middlewares/authenticateJWT');

// Rota para adicionar despesa
router.post('/adicionar', authenticateJWT, despesasController.adicionarDespesa);

// Rota para consultar todas as despesas
router.get('/', authenticateJWT, despesasController.consultarDespesas);

// Rota para buscar despesas por nome
router.get('/buscar/:lugar', authenticateJWT, despesasController.buscarDespesaPorNome);


module.exports = router;
