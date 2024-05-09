const mongoose = require("mongoose");
const { title } = require("process");

//Importa o Schema do Mongoose
const { Schema } = mongoose;

const photoSchema = new Schema({
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
},
{
    timestamps: true,
}
)

//Definindo o Model com Schema e Nome
const Photo = mongoose.model("Photo", photoSchema);

//Exportando o Model
module.exports = Photo;