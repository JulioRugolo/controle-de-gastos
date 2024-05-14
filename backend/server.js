const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const despesasRoutes = require('./routes/despesasRoutes');
const entradasRoutes = require('./routes/entradasRoutes');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Certifique-se de carregar as variáveis de ambiente
const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(express.json());


// Conexão com o MongoDB
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });


// Configuração de CORS
app.use(cors({
    origin: '*', // Permitir apenas requisições desta origem
    credentials: true
}));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/despesas', despesasRoutes);
app.use('/api/entradas', entradasRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
