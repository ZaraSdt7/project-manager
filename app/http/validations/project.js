const { body } = require("express-validator");

function CreateProjectValidator(){
    return[
        body("title").notEmpty().withMessage("The title of the project should not be empty"),
        body("tags").isArray({min:0,max:10}).withMessage("maximum use Hashtag in 10"),
        body("text").notEmpty().isLength({min:20}).withMessage("Project title should not be empty and at least 20 characters long")
    ]
}
module.exports={CreateProjectValidator}