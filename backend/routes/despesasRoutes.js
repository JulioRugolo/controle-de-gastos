const express = require('express');
const router = express.Router();
const despesasController = require('../controllers/despesasController');
const authenticateJWT = require('../middlewares/authenticateJWT');
const upload = require('../middlewares/multer');

// Rota para adicionar despesa
router.post('/adicionar', authenticateJWT, upload, despesasController.adicionarDespesa);

// Rota para consultar todas as despesas
router.get('/', authenticateJWT, despesasController.consultarDespesas);

// Rota para gerar PDF
router.get('/pdf', authenticateJWT, despesasController.gerarPDF);

// Rota para buscar despesas por nome
router.get('/buscar/:lugar', authenticateJWT, despesasController.buscarDespesaPorNome);

// Rota para excluir despesa
router.delete('/despesa/:id', despesasController.excluirDespesa);

// Rota para consultar comprovante de despesa por ID
router.get('/comprovante/:id', despesasController.consultarComprovante);



module.exports = router;
