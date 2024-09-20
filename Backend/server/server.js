const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const bcrypt = require('bcrypt')

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    return res.status(202).json({ message: "Servidor online!" })
})
app.listen(4000)
console.log("online")

// Conexão com o banco de dados MongoDB
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.3jnymxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    app.listen(3000)
    console.log("Conectado ao banco!")
    })
    .catch((err) => console.log(err))

// Importação do modelo de usuário
const User = require('../models/User');

// Rota para registro de usuário
app.post('/registro', async (req, res) => {
    const { nome, email, numeroCadastroEmpresa, telefone, senha, confirmarSenha } = req.body

    try {
        // Verificar se o usuário já existe
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return res.status(422).json({ erroemailmsg: "Por favor, utilize outro email!" })
            
            
        }

        // Hash da senha
        const passwordHash = await bcrypt.hash(senha, 10);

        // Criação do novo usuário
        const novoUsuario = new User({
            nome,
            email,
            telefone,
            numeroCadastroEmpresa,
            senha: passwordHash,
            confirmarSenha
        });

        // Salvar o novo usuário no banco de dados
        await novoUsuario.save();

        res.status(200).json({ message: "Usuário cadastrado!" });
        console.log('Usuário cadastrado:', novoUsuario);
    } catch (error) {
        console.error('Erro ao salvar o usuário:', error);
        res.status(500).json({ message: "Erro inesperado ao cadastrar o usuário. Tente novamente mais tarde." });
    }
})

// Rota para login de usuário
app.post("/login", async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(422).json({ msg: "O Email e a Senha são obrigatórios!" })
        
    }
    try {
        // Verificar se o usuário existe
        const user = await User.findOne({ email: email })
        console.log(user)
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado"});
        }

        // Verificar a senha
        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        if (!senhaCorreta) {
            return res.status(422).json({ msg: "Senha incorreta!"})
        }

        return res.status(200).json({ msg: "Login efetuado com sucesso!", nome: user.nome })
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: "Erro inesperado ao fazer login. Tente novamente mais tarde." });
    }


});
//rota para inserir Funcionario
const Funcionario = require('../models/Funcionario.js')
app.post("/funcCadastro", async (req, res) => {
    const { func_nome, func_email, func_cpf, 
        func_nasc, func_sexo, func_tel, 
        func_end, func_contrato, func_setor, 
        func_filial, func_escala } = req.body
    
    try {
        // Verificar se o funcionario já existe
        const funcExists = await Funcionario.findOne({ func_cpf: func_cpf })
        if (funcExists) {
            return res.status(422).json({ errorcpfmsg: "CPF ja cadastrado! Utilize outro cpf!" })
        }

        // Criação do novo funcionário
        const novoFuncionario = new Funcionario({
            func_nome,
            func_email,
            func_cpf,
            func_nasc,
            func_sexo,
            func_tel,
            func_end,
            func_contrato,
            func_setor,
            func_filial,
            func_escala
        });

        // Salvar o novo usuário no banco de dados
        await novoFuncionario.save();

        res.status(200).json({ message: "Funcionário cadastrado com sucesso!" });
        console.log('Funcionário cadastrado:', novoFuncionario);
    } catch (error) {
        console.error('Erro ao salvar o Funcionário:', error);
        res.status(500).json({ message: "Erro inesperado ao cadastrar o Funcionário. Tente novamente mais tarde." });
    }
})
// Rota para buscar usuário por nome
app.get('/buscar', async (req, res) => {
    const { nome } = req.query;

    if (!nome) {
        return res.status(422).json({ msg: "O nome do usuário é obrigatório!" });
    }

    try {
        // Buscar usuário por nome
        const usuario = await User.find({ nome: { $regex: new RegExp(nome, 'i') } });

        if (usuario.length === 0) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ message: "Erro inesperado ao buscar usuário. Tente novamente mais tarde." });
    }
});
module.exports = app;


