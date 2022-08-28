const { UserController } = require("../http/controller/user.controller");
//const userController = require("../http/controller/user.controller");
const { checklogin } = require("../http/middlewares/autologin");
const { uploadmulter } = require("../modules/multer");

const router=require("express").Router();
router.get("/profile",checklogin,UserController.getProfile)
router.post("/profile",checklogin,UserController.editProfile)
router.post("/profile-image",uploadmulter.single("image"),checklogin,UserController.UploadProfileImage)
module.exports={userRouter:router}