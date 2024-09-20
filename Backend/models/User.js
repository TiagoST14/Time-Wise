
const mongoose = require('mongoose')

const User = mongoose.model('User',{
    nome: String,
    email: String,
    numeroCadastroEmpresa: String,
    telefone: String,
    senha: String,
    confirmarSenha: String

})

module.exports = User;