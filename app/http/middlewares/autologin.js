const { usermodel } = require("../../models/user");
const { jwttokenverify } = require("../../modules/function");

const checklogin=async(req,res,next)=>{
    try {
    let errormessage={status:401,message:"please login in your account"}
     const authorization=req?.headers?.authorization;
     console.log(authorization);
     if(!authorization) throw errormessage
     let token=authorization.split(" ")?.[1];
     if(!token) throw errormessage
     const result=jwttokenverify(token)
     const{user_name}=result;
     console.log(result);  
     const user=await usermodel.findOne({user_name},{password:0})
     if(!user) throw errormessage
     req.user=user;
    return next();
    } catch (error) {
        next(error)
    }
}
module.exports={checklogin}