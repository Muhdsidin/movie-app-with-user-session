const jwt = require("jsonwebtoken")
const SECRET_KEY = "access-key"
const generateToken = (UserId)=>{
    return jwt.sign({_id:UserId},SECRET_KEY)
}

module.exports = {generateToken}