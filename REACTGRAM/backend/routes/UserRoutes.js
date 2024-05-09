const express = require("express");
const router = express.Router();

//Controller, desestruturando
const {register, login, getCurrentUser} = require("../controllers/UserController");

//Middlewares
const validate = require("../middlewares/handleValidation");
const {userCreateValidation, loginValidation} = require("../middlewares/userValidations");
const { authGuard } = require("../middlewares/authGuard");

//Routes
/*
    Lógica:
    1- Rota para acesso
    2- Valida o usuario - A função deve ser invocada ()
    3- Monta os erros no Validate
    4- Registra o usuario
*/
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)

module.exports = router;