const mongoose=require("mongoose");
const userschema=new mongoose.Schema({
frist_name:{type:String},
last_name:{type:String},
user_name:{type:String,require:true,unique:true},
mobile:{type:String,require:true,unique:true},
role:{type:[String],default:["USER"]},
email:{type:String,require:true,unique:true},
password:{type:String,require:true},
skills:{type:[String],default:[]},
team:{type:[mongoose.Types.ObjectId],default:[]},
token:{type:String,default:[]}
},{

timestamps:true

})
const usermodel=mongoose.model("user",userschema)
module.exports={usermodel}