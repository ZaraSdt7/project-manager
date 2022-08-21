const { usermodel } = require("../../models/user");
const { hashstring, tokengenerator } = require("../../modules/function");
const bcrypt=require("bcrypt");
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
 async login(req,res,next){
 try {
 const {user_name,password}=req.body;
 const user=await usermodel.findOne({user_name});
 console.log(req.headers);
 if(!user) throw {status:401,message:"username or password is not true"}
 const resultcompare=bcrypt.compareSync(password,user.password)
 if(!resultcompare) throw {status:401,message:"username or password invalid"}
 const token=tokengenerator({user_name});
 user.token=token;
  await user.save();
 return res.status(200).json({
     status:200,
     success:true,
     message:" you success login",
     token
 }) 
 } catch (error) {
     next(error)
 }
}
resetpassword(){

}



}
module.exports={
     AuthController:new AuthController
}