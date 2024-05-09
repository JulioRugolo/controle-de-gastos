const express = require('express');
const router = express.Router();
const despesasController = require('../controllers/despesasController');

// Rota para adicionar despesa
router.post('/adicionar', despesasController.adicionarDespesa);

// Rota para consultar todas as despesas
router.get('/', despesasController.consultarDespesas);

module.exports = router;
