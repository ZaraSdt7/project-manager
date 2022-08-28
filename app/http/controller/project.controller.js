const { projectmodel } = require("../../models/project");

class ProjectController{
async createprojet(req,res,next){
try {
 const {title,text}=req.body;
 const owner=req.user._id;
 const prj_result=await projectmodel.create({title,text,owner})
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
getAllproject(){

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