const Entrada = require('../models/Entrada');

// Controlador para adicionar entrada
exports.adicionarEntrada = async (req, res) => {
    try {
      const { descricao, valor, data, categoria } = req.body;
      const quemGastou = req.user.id; // Corrigido para acessar req.user.id
  
      // Crie a entrada
      const entrada = await Entrada.create({ descricao, valor, data, quemGastou, categoria, id: req.user.id});
      return res.status(201).json({ success: true, data: entrada });
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error);
      return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
  };

// Controlador para consultar todas as entradas
exports.consultarEntradas = async (req, res) => {
    try {
      const quemGastou = req.user.id; // Corrigido para acessar req.user.id
      const entradas = await Entrada.find({ quemGastou });

      return res.status(200).json({ success: true, data: entradas });
    } catch (error) {
      console.error('Erro ao buscar entradas:', error);
      return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
    }
  };