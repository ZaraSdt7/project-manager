const mongoose=require("mongoose");
const inviteRequest=new mongoose.Schema({
teamID:{type:mongoose.Types.ObjectId,require:true},
caller:{type:String,require:true,lowercase:true},
requestDate:{type:Date,default:new Date()},
Status:{type:String,default:"pending"} //rejected,accepts...    
})
const userschema=new mongoose.Schema({
frist_name:{type:String},
last_name:{type:String},
user_name:{type:String,require:true,unique:true},
mobile:{type:String,require:true,unique:true},
role:{type:[String],default:["USER"]},
email:{type:String,require:true,unique:true},
password:{type:String,require:true},
profile_image:{type:String,require:false},
skills:{type:[String],default:[]},
team:{type:[mongoose.Types.ObjectId],default:[]},
token:{type:String,default:[]},
inviteRequests:{type:[inviteRequest]}
},{

timestamps:true

})
const usermodel=mongoose.model("user",userschema)
module.exports={usermodel}