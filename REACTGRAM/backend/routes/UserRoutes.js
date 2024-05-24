const express = require("express");
const router = express.Router();

//Controller, desestruturando
const {register, 
    login,
    getCurrentUser,
    update, 
    getUserById,
    getAllUser,
} = require("../controllers/UserController");

//Middlewares
const validate = require("../middlewares/handleValidation");
const {userCreateValidation, loginValidation, userUpdateValidation} = require("../middlewares/userValidations");
const  authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

//Routes
/*
    Lógica:
    1- Rota para acesso
    2- Valida o usuario - A função deve ser invocada ()
    3- Monta os erros no Validate
    4- Registra o usuario
    5- Se vc precisa estar logado para a rota use o authGuard
*/
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update);
router.get("/user/:id", authGuard, getUserById);
router.get("/", authGuard, getAllUser)

module.exports = router;