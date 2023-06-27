const jwt = require("jsonwebtoken");
const SECRET_KEY = "access-key";

const checkAuth = (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        console.log(token)

        if(!token){
            return res.status(402).json({
                message:"Access was denaid"
            })
        }

        const TokenVerify = jwt.verify(token, SECRET_KEY)
      //  console.log(TokenVerify._id)
        req.userId = TokenVerify._id
        
    } catch (error) {
       return res.status(401).json({
            message:"your not Authriz"
        })
        
    }

    next()
}

module.exports = {checkAuth}