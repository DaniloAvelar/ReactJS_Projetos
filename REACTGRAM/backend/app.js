require ("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

//Sempre passar o process.nomeDoArquivo.NomeDaPropriedade
const port = process.env.PORT;

const app = express();

//Config JSON e Form Data Response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Resolvendo Problema de CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000"}));

//Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//DB Connection
require("./config/db.js")

//Rotas / Routes
const router = require("./routes/Router");
app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
