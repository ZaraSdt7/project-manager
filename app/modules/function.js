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
module.exports={hashstring,tokengenerator}