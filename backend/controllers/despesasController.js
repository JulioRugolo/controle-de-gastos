const Despesa = require('../models/Despesa');

// Controlador para adicionar despesa
exports.adicionarDespesa = async (req, res) => {
  try {
    const { lugar, valor, data, categoria } = req.body;
    const quemGastou = req.usuario.id; // Assumindo que req.usuario.id contém o ID do usuário logado
    // Crie a despesa
    const despesa = await Despesa.create({ lugar, valor, data, quemGastou, categoria });
    return res.status(201).json({ success: true, data: despesa });
  } catch (error) {
    console.error('Erro ao adicionar despesa:', error);
    return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
};

// Controlador para consultar todas as despesas
exports.consultarDespesas = async (req, res) => {
  try {
    // Consulte todas as despesas
    const despesas = await Despesa.find();
    return res.status(200).json({ success: true, data: despesas });
  } catch (error) {
    console.error('Erro ao consultar despesas:', error);
    return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
};
