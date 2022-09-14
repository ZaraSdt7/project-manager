const { set } = require("mongoose");
const { usermodel } = require("../../models/user");
const { createlinkforfile } = require("../../modules/function");

class UserController{

getProfile(req,res,next){
try {
 const user=req.user;
 user.profile_image=createlinkforfile(user.profile_image,req)   
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
async getAllRequest(req,res,next){
    try {
    const userID=req.user._id;
    const {inviteRequests}=await usermodel.findOne({_id:userID},{inviteRequests:1});
    return res.json({
        requests:inviteRequests || []
    })
    } catch (error) {
       next(error) 
    }
}
async getRequestByStatus(req,res,next){
    try {
    const{Status}=req.params;
    const userID=req.user._id;
    const requests=await usermodel.aggregate([
     {
        $match:{_id:userID}
     },
     {
        $project:
        {inviteRequests:1,
        _id:0,
        inviteRequests:{
            $filter:{
            input:"$inviteRequests",
            as:"request",
            cond:{
                $eq:["$$request.Status",Status]
            }
    }}
    }}   
    ])   
    return res.status(200).json({
        status:200,
        success:true,
        requests:requests?.[0]?.inviteRequests ||[]
    }) 
    } catch (error) {
       next(error) 
    }
}
async ChangeStatusRequest(req,res,next){
    try {
    const {id,Status}=req.params;
    const request=await usermodel.findOne({"inviteRequests._id":id})
    if(!request) throw {status:404,message:"No request was found with this specification"} 
    const findRequest=request.inviteRequests.find(item=>item.id==id)
    if(findRequest.Status!=="pending") throw {status:400,message:"This request has already been rejected or accepted"}
    if(!["accepted","rejected"].includes(Status)) throw {status:400, message:"The information sent is not correct"} 
    const updateresult=await usermodel.updateOne({"inviteRequests._id":id},
    {$set: {
        "inviteRequests.$.Status":Status}
    })  
    if(updateresult.modifiedCount == 0) throw {status:500, message:"Change request status could not be sent"}
    return res.status(200).json({
        status:200,
        success:true,
        message:"Change request status sent!!!"
    })
    } catch (error) {
       next(error) 
    }

}

}
module.exports={
 UserController:new UserController()   
}