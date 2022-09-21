const router=require('express').Router();
const User = require('../models/User');
const {verifyToken,verifyTokenAndAuthorization}=require("./verifyToken")


router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
if(req.body.password){
    req.body.password=Crypto.AES.encrypt(req.body.password,process.env.CRYPTO_KEY).toString()
}

try {
    const updateUser=await User.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
    res.status(202).json(updateUser)
} catch (error) {
    req.status(404).json(error)
}


})

module.exports=router