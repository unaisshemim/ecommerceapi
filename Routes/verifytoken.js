const jwt=require("jsonwebtoken")
const user=require("../Models/User")

const verifyToken=(req,res,next)=>{

    const authHeader=req.headers.token

    if(authHeader){
        const token=authHeader.split(" ")[1]
      
        jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
            if(err) res.status(404).json("token expired")
            req.user= user;
           
            next();
        })
    }else{
       
        return res.status(404).json("you are not authencticated")
       
    }
}

const verifyTokenAndAuth=async(req,res,next)=>{
verifyToken(req,res,()=>{

    if(req.user.id === req.params.id || req.user.isAdmin){
        next()
    }else{
        res.status(404).json("you are not allowed to do that")
        
    }
})

}
const verifyTokenAndAdmin=async(req,res,next)=>{
 
verifyToken(req,res,()=>{
  
    if(req.user.isAdmin){
        next()
    }else{
        res.status(404).json("you are not allowed to do that")
        
    }
})

}

module.exports={verifyToken,verifyTokenAndAuth,verifyTokenAndAdmin}