const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).send('As senhas não coincidem!');
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Usuário já registrado com esse email!');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send('Usuário registrado com sucesso!');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('Usuário não encontrado!');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const payload = { id: user._id };
            const options = { algorithm: 'HS256' };
            const token = jwt.sign(payload, secret, options);
            console.log('Usuário autenticado:', user.email + ' com token: ' + token);
            res.status(200).json({ token });
        } else {
            res.status(400).send('Senha incorreta!');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('Usuário não encontrado!');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};