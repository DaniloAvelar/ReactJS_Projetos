//importando o express
const express = require("express")
const router = express();

//Controller
//Usuarios
router.use("/api/users", require("./UserRoutes"));

//Rota teste
router.get("/", (req, res,) => {
    res.send("API Working!")
})

module.exports = router;