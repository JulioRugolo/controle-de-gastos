const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://admin:OJwkZsJFmw8HMxr9@mdiniz.ktzbflu.mongodb.net/?retryWrites=true&w=majority&appName=mdiniz', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Ou, para configurar de forma mais específica:
app.use(cors({
    origin: 'http://localhost:5173' // Permitir apenas requisições desta origem
}));

app.use(bodyParser.json());

// Rotas
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});