const { UserController } = require("../http/controller/user.controller");
//const userController = require("../http/controller/user.controller");
const { checklogin } = require("../http/middlewares/autologin");
const { expressvalidatorMapper } = require("../http/middlewares/checkerrors");
const { ImageValidation } = require("../http/validations/user");
const { uploadmulter } = require("../modules/multer");

const router=require("express").Router();
router.get("/profile",checklogin,UserController.getProfile)
router.post("/profile",checklogin,UserController.editProfile)
router.post("/profile-image",uploadmulter.single("image"),ImageValidation(),expressvalidatorMapper,checklogin,UserController.UploadProfileImage)
router.get("/requests",checklogin,UserController.getAllRequest)
router.get("/requests/:Status",checklogin,UserController.getRequestByStatus)
router.get("/change-status-request/:id/:Status",checklogin,UserController.ChangeStatusRequest)
module.exports={userRouter:router}