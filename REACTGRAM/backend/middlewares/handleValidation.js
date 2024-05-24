const { validationResult } = require("express-validator");


const validate = (req, res, next) => {

    // console.log("Entrei no Validate");

    //Toda validação retornará possíveis erros, então checamos isso primeiro
    const errors = validationResult(req);

    //Se não tem erro nenhum, então passa para o proximo passo (Next)
    if (errors.isEmpty()) {
        return next();
    }

    //Variavel Array que receberá os possiveis errors
    const extractedErrors = []

    //Mapeando os erros e inserindo cada um deles na variavel acima
    errors.array().map((err)=> extractedErrors.push(err));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = validate