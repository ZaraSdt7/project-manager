const path=require("path");
module.exports= class Application{
    #express=require("express");
    #app=this.#express();
    constructor(PORT,DB_URL){
     this.configDatabase(DB_URL)
     this.configApllication()
     this.createServer(PORT)
     this.createRouters()
     this.errorHandler()
    }
    configApllication(){
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({extended:true}))
    this.#app.use(this.#express.static(path.join(__dirname,"..","public")))    
     
    }
    configDatabase(DB_URL){
    const mongoose=require("mongoose");
    mongoose.connect(DB_URL,(error)=>{
    if(error) throw error
    return console.log("connect to DataBase... ");    
    })
    }
    createServer(PORT){
     const http=require("http");
     const server=http.createServer(this.#app)
     server.listen(PORT,()=>{
        console.log(`server run > on http://localhost:$(PORT)`);
     })
    }
    createRouters(){
    this.#app.get("/",(req,res,next)=>{
     return res.json({
      message:" this is new express application"  
     })   
    })    

    }
    errorHandler(){
    this.#app.use((req,res,next)=>{
    return res.status(404).json({
    status:404,
    success:false,
    message:"page not found"
             
    })
    })    
    this.#app.use((error,req,res,next)=>{
    const status=error?.status||500;
    const message=error?.message||"internal server error"
    return res.status(status).json({
     status,
     success:false,
     message

    })

    })
    }
}