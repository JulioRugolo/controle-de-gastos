const multer = require('multer');

// Configuração do multer para armazenar arquivos na memória
const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single('comprovante'); // Garanta que 'comprovante' é o nome do campo do arquivo

module.exports = upload;
