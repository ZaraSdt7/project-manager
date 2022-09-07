const { ProjectController } = require("../http/controller/project.controller");
const { checklogin } = require("../http/middlewares/autologin");
const { expressvalidatorMapper } = require("../http/middlewares/checkerrors");
const { CreateProjectValidator } = require("../http/validations/project");
const { uploadfile } = require("../modules/express.file.upload");
const router=require("express").Router();
const fileupload=require("express-fileupload");
const { mongoIDvalidation } = require("../http/validations/public");
router.post("/create",fileupload(),uploadfile,checklogin,CreateProjectValidator(),expressvalidatorMapper,ProjectController.createprojet)
router.get("/list",checklogin,ProjectController.getAllproject)
router.get("/:id",checklogin,mongoIDvalidation(),expressvalidatorMapper,ProjectController.getProjectById)
router.delete("/remove/:id",checklogin,mongoIDvalidation(),expressvalidatorMapper,ProjectController.RemoveProject)
router.put("/edit/:id",checklogin,mongoIDvalidation(),expressvalidatorMapper,ProjectController.UpdateProject)
router.patch("/edit-project-image/:id",fileupload(),checklogin,uploadfile,mongoIDvalidation(),expressvalidatorMapper,ProjectController.UpdateProjectImage);
module.exports={projectRouter:router}