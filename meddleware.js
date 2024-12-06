const jwt=require("jsonwebtoken");

module.exports=function(req,res,next){
    try {
        
        let token =req.header("x-token");
        if(!token){
            return res.status(400).send("Token Not Found");

        }
        let decoded=jwt.verify(token,"jwtSecret");
        
        req.user=decoded.user
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
        
    }
}