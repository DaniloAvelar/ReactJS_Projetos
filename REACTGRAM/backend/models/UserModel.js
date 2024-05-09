//Importa o mongoose
const { profile, timeStamp } = require("console");
const mongoose = require("mongoose");

//Importa o Schema do Mongoose
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
},
{
    //Criando 2 datas, Created and Updated somente com TimeStamp
    timeStamp: true,
}
);

//Definindo o Model com Schema e Nome
const User = mongoose.model("User", userSchema);

//Exportando o Model
module.exports = User;
