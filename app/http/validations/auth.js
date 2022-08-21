const {body}=require("express-validator");
const { usermodel } = require("../../models/user");
function registervalidator(){
    return[
        body("user_name").custom(async(value,ctx)=>{
        if(value){
            const usernameregex=/^[a-z]+[a-z 0-9\_\.]/gi;
            if(usernameregex.test(value)){
                const user=await usermodel.findOne({user_name:value})
                if(user) throw "username duplicate!"   
                return true
        }
        throw "username is not true"

        }
        throw "username dont empty!"
        }),
        body("email").isEmail().withMessage("The email entered is not valid").custom(async email =>{
         const user=await usermodel.findOne({email});
         if(user) throw "email duplicate!"
         return true;   
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage(" the mobile entered is not valid").custom(async mobile =>{
        const user=await usermodel.findOne({mobile});
        if(user) throw "mobile duplicate"
        return true;    
        }),
        body("password").isLength({min:6,max:16}).withMessage("the password lenght max 6 char and 16")
        .custom((value,ctx)=>{
         if(!value) throw " the password is not empty!"
         if(value!==ctx?.req?.body?.confirm_password) throw" the password is not equal confirm_password"
         return true;   
        })
    ]
}
function loginvalidation(){
return[
body("user_name").notEmpty().withMessage("username is not empty")
.custom(username =>{
const usernameregex=/^[a-z]+[a-z 0-9\_\.]/gi;
if(usernameregex.test(username)){
    return true;
}
throw "username or password is not true"
}),
body("password").isLength({min:6,max:16}).withMessage("password is length between is 6 and 8")



]
}
module.exports={registervalidator,loginvalidation}