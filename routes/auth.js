const router=require('express').Router();

const User=require("../models/User")
//register


router.post("/register",async(req,res)=>{
const newUser=new User({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    isAdmin:req.body.isAdmin
})
try{
    const savedUser= await newUser.save();
    res.status(201).json(savedUser)
}catch(err){
    console.log(err)
}
})


module.exports=router