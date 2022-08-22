class UserController{
getProfile(req,res,next){
try {
 const user=req.user;   
return res.status(200).json({
 status:200,
 success:true,
 user   
})    
} catch (error) {
    next(error)
}
}
editProfile(){

}
addSkill(){

}
editSkill(){

}
AcceptInviteInTeam(){

}
RejectInviteInTeam(){

}    
}
module.exports={
 UserController:new UserController   
}