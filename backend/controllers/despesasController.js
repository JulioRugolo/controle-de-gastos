const Despesa = require('../models/Despesa');

// Controlador para adicionar despesa
exports.adicionarDespesa = async (req, res) => {
  try {
    const { lugar, valor, data, categoria } = req.body;
    const quemGastou = req.user.id; // Corrigido para acessar req.user.id

    // Crie a despesa
    const despesa = await Despesa.create({ lugar, valor, data, quemGastou, categoria, id: req.user.id});
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
    const quemGastou = req.user.id; // Corrigido para acessar req.user.id
    const despesas = await Despesa.find({ quemGastou });
    return res.status(200).json({ success: true, data: despesas });
  } catch (error) {
    console.error('Erro ao consultar despesas:', error);
    return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
};

exports.buscarDespesaPorNome = async (req, res) => {
  try {
    const lugar = req.params.lugar; // Obtenha o nome da consulta de parâmetros de consulta
    
    // Consulte o banco de dados para encontrar despesas com o nome fornecido
    const despesas = await Despesa.find({ lugar: { $regex: new RegExp(`^${lugar}$`, 'i') } }); // Use expressões regulares para buscar despesas com o nome fornecido, o 'i' faz com que seja uma pesquisa de case-insensitive
    const despesasDoUsuario = despesas.filter(despesa => despesa.quemGastou === req.user.id); // Filtrar despesas do usuário autenticado
    console.log(lugar);
    
    res.json({ success: true, data: despesasDoUsuario }); // Envie as despesas encontradas como resposta
  } catch (error) {
    console.error('Erro ao buscar despesas por nome:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
};