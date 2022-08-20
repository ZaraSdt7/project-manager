const bcrypt=require("bcrypt");
function hashstring(str){
    const salt=bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str,salt)
}
module.exports={hashstring}