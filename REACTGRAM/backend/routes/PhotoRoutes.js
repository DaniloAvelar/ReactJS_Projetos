const express = require("express");
const router = express.Router();

//Controller
const { insertPhoto, deletePhoto, getAllPhotos, getPhotosByUser, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhoto } = require("../controllers/PhotoController");

//Middlewares
const validate = require("../middlewares/handleValidation");
const { photoInsertValidation, photoUpdateValidation, commentValidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

//Routes
//Create Photo
router.post(
    "/",
    authGuard,
    imageUpload.single("image"),
    photoInsertValidation(),
    validate,
    insertPhoto
);



//Delete
router.delete("/:id", authGuard, deletePhoto);

//Get All
router.get("/", authGuard, getAllPhotos);

//Get photo By Id User
router.get("/user/:id", authGuard, getPhotosByUser);

//Search
router.get("/search", authGuard, searchPhoto)

//Get photo by Id Photo
router.get("/:id", authGuard, getPhotoById);

//Put - Update Photo
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);

//PUT - Like a Photo
router.put("/like/:id", authGuard, likePhoto)

//Put Comment
router.put("/comment/:id", authGuard, commentValidation(), validate, commentPhoto)

module.exports = router;