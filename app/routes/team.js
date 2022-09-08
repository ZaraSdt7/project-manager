const { TeamController } = require("../http/controller/team.controller");
const { checklogin } = require("../http/middlewares/autologin");
const { expressvalidatorMapper } = require("../http/middlewares/checkerrors");
const { createTeamValidator } = require("../http/validations/team");

const router=require("express").Router();
router.post("/create",checklogin,createTeamValidator(),expressvalidatorMapper,TeamController.createTeam)
router.get("/list",checklogin,TeamController.getlistofteam)

module.exports={teamRouter:router}