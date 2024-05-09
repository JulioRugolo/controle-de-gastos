const mongoose = require('mongoose');

const despesaSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  },
  // Adicione outros campos conforme necessário
});

const Despesa = mongoose.model('Despesa', despesaSchema);

module.exports = Despesa;
