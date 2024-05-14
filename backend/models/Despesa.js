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
    required: true
  },
  quemGastou: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  comprovante: { // Campo para armazenar o arquivo
    data: Buffer,
    contentType: String
  }
});

const Despesa = mongoose.model('Despesa', despesaSchema);

module.exports = Despesa;
