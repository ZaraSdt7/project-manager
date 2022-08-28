const { ProjectController } = require("../http/controller/project.controller");
const { checklogin } = require("../http/middlewares/autologin");
const { expressvalidatorMapper } = require("../http/middlewares/checkerrors");
const { CreateProjectValidator } = require("../http/validations/project");

const router=require("express").Router();
router.post("/create",checklogin,CreateProjectValidator(),expressvalidatorMapper,ProjectController.createprojet)
module.exports={projectRouter:router}