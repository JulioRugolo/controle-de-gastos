const mongoose = require('mongoose');

const entradaSchema = new mongoose.Schema({
  origem: {
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
  }
});

const Entrada = mongoose.model('Entrada', entradaSchema);

module.exports = Entrada;
