const { ProjectController } = require("../http/controller/project.controller");
const { checklogin } = require("../http/middlewares/autologin");
const { expressvalidatorMapper } = require("../http/middlewares/checkerrors");
const { CreateProjectValidator } = require("../http/validations/project");
const { uploadfile } = require("../modules/express.file.upload");
const router=require("express").Router();
const fileupload=require("express-fileupload");
router.post("/create",fileupload(),uploadfile,checklogin,CreateProjectValidator(),expressvalidatorMapper,ProjectController.createprojet)
module.exports={projectRouter:router}