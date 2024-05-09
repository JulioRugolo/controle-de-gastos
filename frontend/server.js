const express = require('express');
const path = require('path');

const app = express();

// Servir arquivos estáticos da pasta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Rota principal para servir o arquivo HTML do seu aplicativo React
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Use PORT provided in environment or default to 3000
const port = process.env.PORT || 3000;

// Listen on `port` and 0.0.0.0
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
