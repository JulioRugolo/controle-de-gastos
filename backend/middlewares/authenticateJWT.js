const jwt = require('jsonwebtoken');

// Chave secreta (deve ser armazenada de forma segura, por exemplo, em variáveis de ambiente)
const secret = 'banana';

// Middleware de autenticação JWT
const authenticateJWT = (req, res, next) => {
    // Pega o token do cabeçalho de autorização
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Assume que o cabeçalho é "Bearer token"

        jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, user) => {
            if (err) {
                console.error('Erro na verificação do JWT:', err);
                // Envia uma resposta dependendo do tipo de erro
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: 'Token expirou' });
                } else {
                    return res.status(401).json({ error: 'Token inválido' });
                }
            }

            // Se o token for válido, adiciona o usuário decodificado ao objeto de requisição
            req.user = user;
            next(); // Chama o próximo middleware na cadeia
        });
    } else {
        // Se não houver token no cabeçalho, retorna um erro 401 (Não Autorizado)
        res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }
};

module.exports = authenticateJWT;
