const { body } = require("express-validator");
const { teammodel } = require("../../models/team");

function createTeamValidator(){
    return[
        body("description").notEmpty().withMessage("description not empty!"),
        body("name").isLength({min:5}).withMessage("name cannot 5 characters"),
        body("user_name").custom(async(username) =>{
        const usernameeregix=/^[a-z]+[a-z 0-9\_\.]{3,}$/gim
        if(usernameeregix.test(username)){
            const team = await teammodel.findOne({user_name:username})
            if(team) throw "username is already use"
            return true
        }
        throw " choice corrent username"
        })

    ]
}
module.exports={createTeamValidator}