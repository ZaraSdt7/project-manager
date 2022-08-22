const { UserController } = require("../http/controller/user.controller");
const userController = require("../http/controller/user.controller");
const { checklogin } = require("../http/middlewares/autologin");

const router=require("express").Router();
router.get("/profile",checklogin,UserController.getProfile)
module.exports={userRouter:router}