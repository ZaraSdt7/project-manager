const { TeamController } = require("../http/controller/team.controller");
const { checklogin } = require("../http/middlewares/autologin");
const { expressvalidatorMapper } = require("../http/middlewares/checkerrors");
const { mongoIDvalidation } = require("../http/validations/public");
const { createTeamValidator } = require("../http/validations/team");

const router=require("express").Router();
router.post("/create",checklogin,createTeamValidator(),expressvalidatorMapper,TeamController.createTeam)
router.get("/list",checklogin,TeamController.getlistofteam)
router.get("/me",checklogin,TeamController.getMyTeams)
router.get("/invite/:teamID/:user_name",checklogin,TeamController.inviteUsertoTeam)
router.put("/update/:teamID",checklogin,TeamController.UpdateTeam)
router.delete("/remove/:id",checklogin,mongoIDvalidation(),expressvalidatorMapper,TeamController.removeTeamByID)
router.get("/:id",checklogin,mongoIDvalidation(),expressvalidatorMapper,TeamController.getTeamByID)
module.exports={teamRouter:router}