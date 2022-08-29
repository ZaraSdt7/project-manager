const fileupload=require("express-fileupload");
const path=require("path");
const { createPathUpload } = require("./function");
const uploadfile=async(req,res,next)=>{
 try {
  if(req.file || Object.keys(req.files).length == 0) throw{status:400,message:"Please send image project.."}
  let image=req.files.image;
  const image_path=path.join(createPathUpload(),(Date.now() + path.extname(image.name)));
  req.body.image=image_path;
  let uploadpath=path.join(__dirname,"..","..",image_path);
  console.log(uploadpath);
  image.mv(uploadpath,(err)=>{
    console.log(err);
    if(err) throw {status:500,message:"upload failed.."}
    next();
  })  
 } catch (error) {
    next(error)
 }   
}
module.exports={ uploadfile}