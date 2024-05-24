//BODY retorna o corpo da requisição inteira
const { body } = require("express-validator");

const photoInsertValidation = () => {
    // console.log("Entrei no Validation");
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O título é obrigatório.")
            .isString()
            .withMessage("O título é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O título deve conter o mínimo de 3 caracteres."),
        body("image")
            .custom((value, { req }) => {
                if (!req.file) {
                    throw new Error("A imagem é obrigatória.");
                }
                return true;
            }),
    ];
};

const photoUpdateValidation = () => {
    // console.log("Entrei no Validation");
    return [
        body("title")
            .isString()
            .withMessage("O título é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O título deve conter o mínimo de 3 caracteres.")
    ];
};

const commentValidation = () => {
    return [
        body("comment")
            .isString()
            .withMessage("O comentário é obrigatório.")
    ];
};

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    commentValidation,
} 