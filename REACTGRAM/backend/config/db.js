const mongoose = require("mongoose");
const DBUSER = process.env.DB_USER;
const DBPASS = process.env.DB_PASS;


//Connection
const conn = async () => {
    try {
        //String de conexão com o DB Mongo Atlas
        const dbConn = await mongoose.connect(
            `mongodb+srv://${DBUSER}:${DBPASS}@cluster0.nk9uolf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );

        console.log("Conectei ao DB");
    }
    catch (err) {
        //Erro de conexão com o DB
        console.log(err);
    }
};

conn();

module.exports = conn;