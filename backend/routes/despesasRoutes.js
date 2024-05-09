const express = require('express');
const router = express.Router();
const despesasController = require('../controllers/despesasController');

// Rota para adicionar despesa
router.post('/adicionar', despesasController.adicionarDespesa);

module.exports = router;
