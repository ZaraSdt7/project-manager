const multer=require("multer");
const path=require("path");
const { checklogin } = require("../http/middlewares/autologin");
const { createPathUpload } = require("./function");
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,createPathUpload());   
    },
    filename:(req,file,cb)=>{
     const type=path.extname(file.originalname);
     cb(null,Date.now() + type);   
    }
})
const uploadmulter=multer({storage});
module.exports={uploadmulter}