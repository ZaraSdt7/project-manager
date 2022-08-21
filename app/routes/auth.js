const { AuthController } = require("../http/controller/auth.controller");
const { expressvalidatorMapper } = require("../http/middlewares/checkerrors");
const { registervalidator, loginvalidation } = require("../http/validations/auth");

const router=require("express").Router();
router.post("/register",registervalidator(),expressvalidatorMapper,AuthController.register)
router.post("/login",loginvalidation(),expressvalidatorMapper,AuthController.login)
module.exports={authRouter:router}