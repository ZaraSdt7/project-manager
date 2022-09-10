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
async getTeamByID(req,res,next){
    try {
     const teamID=req.params.id;
     const team=await teammodel.findById(teamID)
     if(!team) throw {status:500,message:"team not found..."}
     return res.status(201).json({
        status:200,
        success:true,
        team
     })   
    } catch (error) {
       next(error) 
    }
}

async getMyTeams(req,res,next){
    try {
     const userID=req.user._id;
     const team=await teammodel.find({
    $or:[
        {owner:userID},
        {user:userID}
    ]
     })
     return res.status(201).json({
        status:200,
        success:true,
        team
     })   
    } catch (error) {
        next(error)
    }
}

async removeTeamByID(req,res,next){
    try {
    const teamID=req.params.id;
    const team= await teammodel.findById(teamID);
    if(!team) throw {status:500,message:" the team  was not found"}
    const resultDelete=await teammodel.deleteOne({_id:teamID});
    if(resultDelete.deletedCount == 0) throw {status:500,message:"The team was not deleted"}  
    return res.status(201).json({
        status:201,
        success:true,
        message:"the team was deleted!"
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