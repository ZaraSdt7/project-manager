const { body } = require("express-validator");
const path=require("path");
function ImageValidation(){
    return[
        body("image").custom((value,{req})=>{
        if(Object.keys(req.file).length == 0) throw "Please Choice a picture"
        const ext=path.extname(req.file.originalname);
        const exts=[".png",".jpg",".jpeg",".gif",".webp"];
        if(!exts.includes(ext)) throw "Send format is invalid.."
        const maxsize=2*1024*1024;
        if(req.file.size>maxsize) throw "The size of the file cannot be more than 2 MB";
        return true; 
        })
    ]
}
module.exports={ImageValidation}