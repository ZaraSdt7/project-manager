const { authRouter } = require("./auth");
const { projectRouter } = require("./project");
const { teamRouter } = require("./team");
const { userRouter } = require("./user");
const router=require("express").Router();
router.use("/auth",authRouter)
router.use("/user",userRouter)
router.use("/project",projectRouter)
router.use("/team",teamRouter)
module.exports={AllRouter:router}