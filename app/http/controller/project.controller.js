const autoBind  = require("auto-bind");
const { projectmodel } = require("../../models/project");

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
const project=await projectmodel.find({owner});
return res.status(200).json({
 status:200,
 success:true,
 project   
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
await this.findproject(owner,projectID);
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
getAllProjectByTeam(){

}
getProjectByUser(){

} 
UpdateProject(){

}


}
module.exports={
    ProjectController:new ProjectController()
}