const mongoose=require("mongoose");
const projectschema=new mongoose.Schema({
 title:{type:String,require:true},
 text:{type:String},
 image:{type:String,default:"/default/picture.png"},
 owner:{type:mongoose.Types.ObjectId,require:true},
 team:{type:mongoose.Types.ObjectId},
 private:{type:Boolean,default:true},
 tags:{type:[String],default:[]}
},{
    timestamps:true
})
const projectmodel=mongoose.model("project",projectschema);
module.exports={projectmodel}