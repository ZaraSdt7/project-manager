const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const path=require("path");
const fs=require("fs");
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
 function createPathUpload(){
    let d=new Date();
    const year=d.getFullYear() + "";
    const month="" +d.getMonth();
    const day="" +d.getDate();
    const PathUpload=path.join(__dirname,"..","..","public","uploads",year,month,day);
    fs.mkdirSync(PathUpload,{recursive:true});
    return path.join("public","uploads",year,month,day);
     
 }
//console.log(createPathUpload());
module.exports={hashstring,tokengenerator,jwttokenverify,createPathUpload}