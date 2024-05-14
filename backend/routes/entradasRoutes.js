const express = require('express');
const router = express.Router();
const entradasController = require('../controllers/entradasController');
const authenticateJWT = require('../middlewares/authenticateJWT');

// Rota para adicionar entrada
router.post('/adicionar', authenticateJWT, entradasController.adicionarEntrada);

// Rota para consultar todas as entradas
router.get('/', authenticateJWT, entradasController.consultarEntradas);


module.exports = router;
