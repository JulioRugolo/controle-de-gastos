const Despesa = require('../models/Despesa');
const PDFDocument = require('pdfkit');

// Controlador para adicionar despesa
exports.adicionarDespesa = async (req, res) => {
  try {
    const { descricao, valor, data, categoria } = req.body;
    const quemGastou = req.user.id;

    let despesa = new Despesa({
      descricao,
      valor,
      data,
      quemGastou,
      categoria,
      id: req.user.id
    });

    if (req.file) {
      despesa.comprovante = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    await despesa.save();

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
    const descricao = req.params.lugar; // Obtenha o nome da consulta de parâmetros de consulta
    const usuarioId = req.user.id; // ID do usuário autenticado

    // Consulte o banco de dados para encontrar despesas com o nome fornecido e que pertencem ao usuário
    const despesas = await Despesa.find({
      descricao: { $regex: new RegExp(descricao, 'i') }, // Use expressões regulares para busca de case-insensitive
      quemGastou: usuarioId // Filtra também pelo ID do usuário
    });

    res.json({ success: true, data: despesas }); // Envie as despesas encontradas como resposta
  } catch (error) {
    console.error('Erro ao buscar despesas por nome:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
};


// Controlador para excluir uma despesa pelo ID
exports.excluirDespesa = async (req, res) => {
  try {
    const despesaId = req.params.id; // Obtenha o ID da despesa dos parâmetros de rota

    // Tente encontrar e remover a despesa especificada que também pertence ao usuário autenticado
    const despesa = await Despesa.findOneAndDelete({ _id: despesaId });

    if (!despesa) {
      return res.status(404).json({ success: false, error: 'Despesa não encontrada' });
    }

    res.status(200).json({ success: true, data: despesa, message: 'Despesa excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir despesa:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
};

// Controlador para consultar o comprovante de uma despesa pelo ID
exports.consultarComprovante = async (req, res) => {
  try {
    const despesaId = req.params.id; // Obtenha o ID da despesa dos parâmetros de rota

    // Tente encontrar a despesa especificada
    const despesa = await Despesa.findById(despesaId);

    if (!despesa || !despesa.comprovante) {
      return res.status(404).json({ success: false, error: 'Comprovante não encontrado' });
    }

    // Defina o cabeçalho Content-Type para o tipo de conteúdo do comprovante
    res.set('Content-Type', despesa.comprovante.contentType);

    // Envie o comprovante como resposta
    res.send(despesa.comprovante.data);
  } catch (error) {
    console.error('Erro ao consultar comprovante:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
};

exports.gerarPDF = async (req, res) => {
  try {
    const despesas = await Despesa.find({ quemGastou: req.user.id });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="relatorio-${Date.now()}.pdf"`);

    const fontRegular = './fonts/Roboto-Regular.ttf';
    const fontBold = './fonts/Roboto-Bold.ttf';

    doc.fontSize(20).text('Relatório de Gastos e Entradas', { align: 'center' });
    doc.moveDown(2);

    // Início da tabela de despesas
    const tableTop = doc.y;
    const columnWidths = [150, 100, 100, 150]; // Larguras das colunas
    const rowHeight = 20; // Altura das linhas

    // Cabeçalhos da tabela
    doc.font(fontBold);
    ['Descrição', 'Valor', 'Data', 'Categoria'].forEach((header, i) => {
      doc.text(header, 50 + i * columnWidths[i], tableTop, { width: columnWidths[i], align: 'center' });
    });

    doc.font(fontRegular);
    despesas.forEach((despesa, index) => {
      let y = tableTop + (index + 1) * rowHeight;
      doc.text(despesa.descricao, 50, y, { width: columnWidths[0], align: 'center' });
      doc.text(`R$${despesa.valor.toFixed(2)}`, 50 + columnWidths[0], y, { width: columnWidths[1], align: 'center' });
      doc.text(despesa.data.toLocaleDateString(), 50 + columnWidths[0] + columnWidths[1], y, { width: columnWidths[2], align: 'center' });
      doc.text(despesa.categoria, 50 + columnWidths[0] + columnWidths[1] + columnWidths[2], y, { width: columnWidths[3], align: 'center' });
    });

    // Adicionando uma nova página para comprovantes
    doc.addPage();
    doc.font(fontBold).fontSize(20);
    doc.text('Comprovantes', { align: 'center' });
    doc.moveDown(2);

    // Renderizando comprovantes
    despesas.forEach(despesa => {
      if (despesa.comprovante) {
        const imageWidth = 300;
        const xPosition = (doc.page.width - imageWidth) / 2;
        doc.image(Buffer.from(despesa.comprovante.data, 'base64'), xPosition, doc.y, {
          fit: [350, 400]
        });
        doc.addPage();
      }
    });

    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    res.status(500).send('Erro interno ao gerar o PDF');
  }
};


