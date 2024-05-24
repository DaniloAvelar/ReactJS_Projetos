const Photo = require("../models/PhotoModel");
const mongoose = require("mongoose");
const User = require("../models/UserModel");

//Insere uma foto com um usuário relacionado

const insertPhoto = async (req, res) => {

    // console.log("Entrei no InsertPhotos");

    const { title } = req.body;
    const image = req.file.filename;

    //Pegando o Id que vem da requisição
    const reqUser = req.user;

    //Buscando esse usuário pelo ID
    const user = await User.findById(reqUser.id);

    // Criando uma Foto
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    });

    //Checando se foto foi criada com sucesso
    if (!newPhoto) {
        res.status(422).json({
            errors: ["Houve um problema, por favor tente novamente mais tarde."]
        })
        return;
    }

    res.status(201).json(newPhoto)
};

//Deletar Foto
const deletePhoto = async (req, res) => {

    //Pegando o ID da foto que vem da URL
    const { id } = req.params;

    //Pegando o usuário pela requisição
    const user = req.user;

    try {
        //Pegando a Foto pelo Model PHOTO
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

        //Checando se a foto existe
        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada"] });
            return;
        }

        //Checando se a foto pertence ao usuario que está excluindo a mesma
        if (!photo.userId.equals(user._id)) {
            res
                .status(422)
                .json({ errors: ["Ocorreu um erro, por favor tente novamente mais tarde."] });
            return;
        }

        //Se passou das checagens, então deleta a foto
        await Photo.findByIdAndDelete(photo._id);

        res.status(200).json({ id: photo._id, message: "Foto excluída com sucesso" });

    } catch (error) {
        res.status(404).json({ errors: ["Foto não encontrada"] });
        return;
    }

};

//GET all Photos
const getAllPhotos = async (req, res) => {

    /*
        Criando uma variável,
        Passando o Model PHOTO,
        Passando pelo .find() -> No find eu posso crir um filtro (Where), mas nesse caso queremos todas as fotos,
        Passando pelo .sort() -> função para ordenar a lista.
        .exec() para executar a query
    */

    const photos = await Photo.find({})
        .sort([["createdAt", -1]])
        .exec();

    return res.status(200).json(photos);
}

//Get photo by User 
const getPhotosByUser = async (req, res) => {
    //Pegando o id que vem da URL do parametro do usuario
    const { id } = req.params;
    //Filtrando todas as fotos daquel determinado usuario
    const photos = await Photo.find({ userId: id })
        .sort([["createdAt", -1]])
        .exec()

    return res.status(200).json(photos)
}

//Get Photo By Id - Details
const getPhotoById = async (req, res) => {

    //Se é por id eu preciso do parametro do id
    const { id } = req.params;
    //Pegando a foto no Mongoose por id
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    //Checando se a foto existe
    if (!photo) return res.status(404).json({ errors: ["Foto não encontrada."] });

    return res.status(200).json({ photo });
};

//Update a Photo
const updatePhoto = async (req, res) => {

    // console.log("Entrei no Update")
    const { id } = req.params;
    const { title } = req.body;

    const reqUser = req.user;

    const photo = await Photo.findById(id)

    //Checando se foto existe
    if (!photo) return res.status(404).json({ errors: ["Foto não acontrada."] });

    //Checando se a foto é daquele determinado usuario
    if (!photo.userId.equals(reqUser._id)) {
        return res.status(422).json({ errors: ["Ocorreu um erro, por favor tente novamente mais tarde."] })
    }

    //Checando se o title veio na requisição
    if (title) {
        photo.title = title;
    }
    // else{return res.status(422).json({ errors: ["O tíitulo é de preenchimento obrigatório."] })}

    await photo.save();

    return res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};

//Like in Photo

const likePhoto = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;
    const photo = await Photo.findById(id);

    //Checa se foto ja existe
    if (!photo) return res.status(404).json({ message: "Foto não encontrada" });

    //Checa se usuario ja deu like
    if (photo.likes.includes(reqUser._id)) {
        return res.status(422).json({ message: ["Você já curtiu a foto"] });
    }

    //Colocando o Id do usuario no Array de Like DB
    photo.likes.push(reqUser._id);
    photo.save();

    return res.status(200).json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida." });
}

// PUT comment in Photo
const commentPhoto = async (req, res) => {

    const { id } = req.params;
    console.log("1-", id);
    const { comment } = req.body;
    console.log("2-", comment);
    const reqUser = req.user;
    console.log("3-", reqUser);
    const user = await User.findById(reqUser._id);
    console.log("4-", user);
    const photo = await Photo.findById(id);
    console.log("5-", photo);

    //Checa se foto ja existe
    if (!photo) return res.status(404).json({ message: "Foto não encontrada" });

    let userComment = {};

    try {
        //Add Comment in Array Comment
        userComment = {
            comment,
            userName: user.name,
            userImage: user.profileImage,
            userId: user._id,
        };

        console.log("6-", userComment);

        photo.comments.push(userComment);

        await photo.save();
    }
    catch (err) {
        return res.status(500).json({message:[err.message]})    
     }

    return res.status(200)
        .json({
            comment: userComment,
            message: "Comentário adicionado com sucesso"
        })
};

//Search Photos
const searchPhoto = async (req, res, next) => {

    const {q} = req.query;

    const photos = await Photo.find({title: new RegExp(q, "i")}).exec();

    return res.status(200).json({photos})
}


module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getPhotosByUser,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhoto,
};