//Usando o Model de Usuario
const User = require("../models/UserModel");

//Usando pacotes BCrypt e JWT
const bcrypt = require("bcryptjs");
const { profile } = require("console");
const jwt = require("jsonwebtoken");

//Pegando a KeySecret do .env
const jwtSecret = process.env.JWT_SECRET;

//Função auxiliar para gerar o token, aqui utilizo o id do usuario na função + jwtsecret
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, { expiresIn: "7d", });
};

//Função Register user and sign in
const register = async (req, res) => {

    //Pegando os dados da requisição
    const { name, email, password } = req.body;

    //check if user exist
    const user = await User.findOne({ email });

    if (user) {
        res.status(422).json({ errors: ["Email já cadastrado em nosso sistema."] });
        return;
    }

    //Generate password Has
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //Create User
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    })

    //If user created whit successfuly, return the token
    if (!newUser) {
        res.status(422).json({ errors: ["Houve um erro, por favor tente mais tarde."] })
        return;
    }

    //Returning the created user
    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });

};

//Login do usuario
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //Checando se o usuário não existe
    if (!user) {
        res.status(404).json({ errors: ["Usuário não encontrado."] })
        return
    }

    //Checar se senhas são iguais
    if(!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({errors:["Senha é inválida"] })
        return
    }

    //Se deu tudo certo
     //Returning the created user
     res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    });
}

//GET current login User
const getCurrentUser = async (req, res) => {

    //O usuario foi passado no middleware de AuthGuard, por isso funciona aqui
    const user = req.user;

    res.status(200).json({user});

};


//Exportando um objeto onde tenha cada função do arquivo, assim podemos utilizar separadamente no arquivo de rotas
module.exports = {
    register,
    login,
    getCurrentUser,
};

