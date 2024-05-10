//Lib para uploa de arquivo
const multer = require("multer");
//Lib para ler diretório completo
const path = require("path");

//Destination save image

const imageStore = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = "";

        if(req.baseUrl.includes("users")) {
            folder = "users"
        } else if(req.baseUrl.includes("photo")) {
            folder = "photos"
        }

        //Callback dizendo que a pasta padrão é Uploads/....variavel
        cb(null, `uploads/${folder}/`)
    },

    //Mudando o nome do arquivo para padrão do sistema
    //O nome do aquivo será Data Now + extensão do arquivo Ex: 654654654.jpeg
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

//Função para validar a imagem e salvar a msm
const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            //Somente upload com extensao .jpg ou .png
            return cb(new Error("Por favor, envie fotos com somente com as extensões .jpg ou .png!"))
        }
        cb(undefined, true);
    }
})

module.exports = {imageUpload};

