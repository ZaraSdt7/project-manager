const { usermodel } = require("../../models/user");
const { hashstring } = require("../../modules/function");

class AuthController{
 async register(req,res,next){
     try {
const{user_name,password,email,mobile}=req.body;
const hash_password=hashstring(password);
const user= await usermodel.create({user_name,email,mobile,password:hash_password })
.catch(err =>{
   if(err?.code == 11000){
    throw {status:400,message:"username already use to system"}
   }  
})
return res.json(user);
     } catch (error) {
       next(error)   
     }
}
login(){

}
resetpassword(){

}



}
module.exports={
     AuthController:new AuthController
}