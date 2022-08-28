const { set } = require("mongoose");
const { usermodel } = require("../../models/user");

class UserController{

getProfile(req,res,next){
try {
 const user=req.user;
 user.profile_image=req.protocol + "://" + req.get("host") + "/" +(user.profile_image.replace(/[\\\\]/gm, "/"));   
return res.status(200).json({
 status:200,
 success:true,
 user   
})    
} catch (error) {
    next(error)
}
}
 async editProfile(req,res,next){
    try {
    let data={...req.body};
    const userID=req.user._id;
    let fields=["frist_name","last_name","skills"];
    let badvalue=[""," ",0,null,-1,undefined,NaN,[],{}];
    Object.entries(data).forEach(([key,value])=>{
     console.log(key,value);
     if(!fields.includes(key)) delete data[key];
     if(badvalue.includes(value)) delete data[key];
    
    })
    console.log(data);
    const result=await usermodel.updateOne({_id:userID},{$set:data})
    if(result.modifiedCount>0){
     return res.status(200).json({
      status:200,
      success:true,
      message:"Update Success"  
     })   
    } 
    throw {status:400,message:"Update Unsuccess..."}   
        
    } catch (error) {
    next(error)
    }

}
async UploadProfileImage(req,res,next){
    try {
    const userID=req.user._id;
    const filePath=req.file?.path?.substring(7);
    const result=await usermodel.updateOne({_id:userID},{$set : {profile_image:filePath}});
    if(result.modifiedCount == 0) throw{status:400,message:"Update failed"}
    return res.status(200).json({
        status:200,
        success:true,
        message:"Update done!"
    })
    } catch (error) {
        next(error)
    }
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