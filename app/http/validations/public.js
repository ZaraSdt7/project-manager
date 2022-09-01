const { param } = require("express-validator");

function mongoIDvalidation(){
    return[

    param("id").isMongoId().withMessage("Send ID is Not Valid..")  

    ]
}
module.exports={mongoIDvalidation}