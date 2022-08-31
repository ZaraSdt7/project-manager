const { projectmodel } = require("../../models/project");

class ProjectController{
async createprojet(req,res,next){
try {
 const {title,text,image,tags}=req.body;
 console.log(tags);
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
try {
const owner=req.user._id;
const projects=await projectmodel.find({owner});
return res.status(200).json({
    status:200,
    success:true,
    projects
})    
} catch (error) {
  next(error)  
}
}
getProjectById(){

}
getAllProjectByTeam(){

}
getProjectByUser(){

} 
UpdateProject(){

}
RemoveProject(){

}


}
module.exports={
    ProjectController:new ProjectController()
}