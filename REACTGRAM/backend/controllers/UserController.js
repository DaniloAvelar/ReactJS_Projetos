//Usando o Model de Usuario
const User = require("../models/UserModel");

//Usando pacotes BCrypt e JWT
const bcrypt = require("bcryptjs");
const { profile } = require("console");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

//Pegando a KeySecret do .env
const jwtSecret = process.env.JWT_SECRET;

//Função auxiliar para gerar o token, aqui utilizo o id do usuario na função + jwtsecret
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, { expiresIn: "1d", });
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

    //Generate password Hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //Create User
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
        profileImage: "null",
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
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({ errors: ["Senha é inválida"] })
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

    res.status(200).json({ user });

};

//Update User

const update = async (req, res) => {
    const { name, password, bio, file } = req.body;
    let profileImage = null;

    if (req.file) {
        profileImage = req.file.profilename;
    }

    const reqUser = req.user;

    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password");


    if ((name) && (name.length >= 3)) {
        user.name = name;
    }
    else return res.status(422).json({ errors: ["O usuário deve conter no mínimo 3 caracteres! xxx"] })

    if (password) {
        //Generate password Hash
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash;
    }

    if (profileImage) {
        user.profileImage = profileImage;
    }

    if (bio) {
        user.bio = bio;
    }

    //Salvando no DB
    await user.save()

    res.status(200).json({ msg: "Usuário alterado com sucesso !", data: user })
}

//Get User by Id
//Params, pois o ID é passado no parametro da URL e nao no corpo da msm
const getUserById = async (req, res) => {

    const { id } = req.params;

    try {

        const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password");
        //Checa se o usuario existe no padrãpo do ID do Mongoose
        if (!user) {
            return res.status(404).json({ errors: ["Usuário nao encontrato na base de dados."] })
        }
        return res.status(200).json({ data: user })


    } catch (error) {

        return res.status(404).json({ errors: ["Tivemos um erro com sua busca de Usuário, certifique-se que o id esteja correto."] })
    }
}

const getAllUser = async (req, res) => {
    const users = await User.find({})
    .sort([["createdAt", -1]])
    .exec()

    return res.status(200).json(users);
}


//Exportando um objeto onde tenha cada função do arquivo, assim podemos utilizar separadamente no arquivo de rotas
module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
    getAllUser,
};

