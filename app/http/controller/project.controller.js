const autoBind  = require("auto-bind");
const { projectmodel } = require("../../models/project");
const { createlinkforfile } = require("../../modules/function");

class ProjectController{
    constructor(){
        autoBind(this)
    }
async createprojet(req,res,next){
try {
 const {title,text,image,tags}=req.body;
 const owner=req.user._id;
 const prj_result=await projectmodel.create({title,text,owner,image,tags})
 if(!prj_result) throw {status:400,message:"There was a problem with adding the project "}
 return res.status(201).json({
    status:201,
    success:true,
    message:"Success adding Project"
 })   

} catch (error) {
next(error) 
}
}
async getAllproject(req,res,next){
try{
const owner=req.user._id;
const projects=await projectmodel.find({owner});
for (const project of projects) {
project.image=createlinkforfile(project.image,req)    
}
return res.status(200).json({
 status:200,
 success:true,
 projects   
})
}catch(error){
    next(error)
}

}
async findproject(projetID,owner){
 const projet=await projectmodel.findOne({owner,projetID});
 if(!projet) throw{status:404,message:"Project Not Found.."}
 return projet;   
}
async getProjectById(req,res,next){
try {
 const owner=req.user._id;
 const projetID=req.params.id;
 const project=await this.findproject(projetID,owner);
 project.image=createlinkforfile(project.image,req)
 return res.status(200).json({
  status:200,
  success:true,
  project  
 }) 
} catch (error) {
    console.log(error);
    next(error)  
}
}
async RemoveProject(req,res,next){
try {
const owner=req.user._id;
const projectID=req.params.id;
await this.findproject(projectID,owner);
const deleteprojectresult=await projectmodel.deleteOne({_id:projectID});
if(deleteprojectresult.deletedCount == 0) throw{status:400,message:"Project Not Delete.."}
return res.status(200).json({
 status:200,
 success:true,
 message:"Project Success Deleted..."   
})   
} catch (error) {
  next(error)  
}    

}
 async UpdateProject(req,res,next){
try {
 const owner=req.user._id;
 const projectID=req.params.id;
 const project=await this.findproject(projectID,owner);
 const data={...req.data};
 Object.entries(data).forEach(([key,value])=>{
if(!["title","text","tags"].includes(key)) delete data[key]
if([""," ",NaN,null,undefined,0].includes(value)) delete data[key]
if(key == "tags" && (data['tags'].constructor === Array)){
data["tags"]=data["tags"].filter(val =>{
 if(![""," ",null,NaN,undefined,0].includes(val)) return val;

})
if(data['tags'].length == 0) delete data['tags'];
}
 })
 const updateresult=await projectmodel.updateOne({_id:projectID},{$set:data});
 if(updateresult.modifiedCount==0) throw{status:400,message:"update failed"}
 return res.status(200).json({
    status:200,
    success:true,
    message:"update done!"
 })
} catch (error) {
  next(error)  
}
}
async UpdateProjectImage(req,res,next){
try {
const {image}=req.body;
const owner=req.user._id;
const projectID=req.params.id;
await this.findproject(projectID,owner);
const resultupload=await projectmodel.updateOne({_id:projectID},{$set:image});
if(resultupload.modifiedCount == 0) throw {status:400, message:"update failed"}
return res.status(200).json({
    status:200,
    success:true,
    message:"update done"
})    
} catch (error) {
    next(error)
}    
}
getAllProjectByTeam(){

}
getProjectByUser(){

} 


}
module.exports={
    ProjectController:new ProjectController()
}