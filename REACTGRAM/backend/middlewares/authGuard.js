const { error } = require("console");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
    //  console.log("Entrei no AuthGuard");
    //Checando se o Cabeçalho foi enviado, a autenticação [Bearer] vem via cabeçalho
    const authHeader = req.headers.authorization;
    //Aqui que quebro no primeiro espaço, pois, não preciso da palavra [Bearer], pego somente a chave enviada
    const token = authHeader && authHeader.split(" ")[1];

    //Se o token não foi passado no cabeçalho, eu já retorno um acesso negado
    if (!token) return res.status(401).json({errors: ["Acesso negado"]}) 

    //Checando se o token é valido
    try {
        //Verificando se o token e jwtSecret
        const tokenResponse = jwt.verify(token, jwtSecret);

        req.user = await User.findById(tokenResponse.id).select("-password");

        next();
        
    } catch (error) {
        res.status(401).json({errors: ["Token inválido."]})
    }
}

module.exports = authGuard
