const express = require('express');
const router = express.Router();
const entradasController = require('../controllers/entradasController');
const authenticateJWT = require('../middlewares/authenticateJWT');

// Rota para adicionar entrada
router.post('/adicionar', authenticateJWT, entradasController.adicionarEntrada);


module.exports = router;
