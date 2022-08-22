const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
function hashstring(str){
    const salt=bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str,salt)
}
 function tokengenerator(payload){
    const token=jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"100 days"})
    return token;
 }
 function jwttokenverify(token){
  const result=jwt.verify(token,process.env.SECRET_KEY);
  if(!result?.user_name) throw {status:401,message:"please login in your account"}
  return result;   
 }
module.exports={hashstring,tokengenerator,jwttokenverify}