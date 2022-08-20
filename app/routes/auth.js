const { AuthController } = require("../http/controller/auth.controller");
const { expressvalidatorMapper } = require("../http/middlewares/checkerrors");
const { registervalidator } = require("../http/validations/auth");

const router=require("express").Router();
router.post("/register",registervalidator,expressvalidatorMapper,AuthController.register)
module.exports={authRouter:router}