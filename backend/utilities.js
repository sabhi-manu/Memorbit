
const jwt = require("jsonwebtoken")


async function authenticateToken (req,res,next){
    console.log("authentication function running==>",req.headers)
   
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.sendStatus(401)
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
       if(err){
            console.error("Token verification failed:", err.message)
            return res.status(401).json({error:true,message:"Invalid or expired token"})
        }

        req.user = user
        console.log("check the user befor next ==>",req.user)
        next()
    })
}

module.exports = authenticateToken