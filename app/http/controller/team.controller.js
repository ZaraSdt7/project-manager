const { teammodel } = require("../../models/team");

class TeamController{
 async createTeam(req,res,next){
    try {
    const {user_name,description,name}=req.body;
    const owner=req.user._id;
    const team = await teammodel.create({
        user_name,
        name,
        description,
        owner
    })
    if(!team) throw {status:500,message:" create team failed"}
    return res.status(201).json({
        status:201,
        success:true,
        message:"Create Team Success"
    })     
    } catch (error) {
      next(error)  
    }

}
 async getlistofteam(req,res,next){
    try {
    const team=await teammodel.find({});
    return res.status(201).json({
        status:201,
        success:true,
        team
    })    
    } catch (error) {
        next(error)
    }

}
inviteUsertoTeam(){

}
RemoveTeam(){

}
UpdateTeam(){

}
RemoveUserFromTeam(){

}    
}
module.exports={
    TeamController:new TeamController()
}