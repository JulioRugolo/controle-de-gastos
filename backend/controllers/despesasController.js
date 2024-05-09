const Despesa = require('../models/Despesa');

// Controlador para adicionar despesa
exports.adicionarDespesa = async (req, res) => {
  try {
    const { descricao, valor } = req.body;
    // Crie a despesa
    const despesa = await Despesa.create({ descricao, valor });
    return res.status(201).json({ success: true, data: despesa });
  } catch (error) {
    console.error('Erro ao adicionar despesa:', error);
    return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
};
