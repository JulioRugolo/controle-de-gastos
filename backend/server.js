const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const despesasRoutes = require('./routes/despesasRoutes');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

require('dotenv').config(); // Certifique-se de carregar as variáveis de ambiente

// Conexão com o MongoDB
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });


// Configuração de CORS
app.use(cors({
    origin: '*', // Permitir apenas requisições desta origem
    credentials: true
}));

app.use(bodyParser.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/despesas', despesasRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
