const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send('Usuário registrado com sucesso!');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        const payload = { id: user._id };
        const options = { algorithm: 'HS256' };
        if (!user) {
            return res.status(404).send('Usuário não encontrado!');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign(payload, secret, options);
            console.log('Usuário autenticado:', user.username + ' com token: ' + token);
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