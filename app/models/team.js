const mongoose=require("mongoose");
const teamschema=new mongoose.Schema({
name:{type:String,require:true},
description:{type:String},
user_name:{type:String,require:true,unique:true},
users:{type:[mongoose.Types.ObjectId],default:[]},
owner:{type:mongoose.Types.ObjectId,require:true}
},{
    timestamps:true
})
const teammodel=mongoose.model("team",teamschema);
module.exports={teammodel}