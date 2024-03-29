const router=require('express').Router();
const Crypto=require('crypto-js')
const jwt = require('jsonwebtoken');
const User=require("../models/User")


//register


router.post("/register",async(req,res)=>{

var encrypted=Crypto.AES.encrypt(req.body.password,process.env.CRYPTO_KEY).toString()

const newUser=new User({
    username:req.body.username,
    password:encrypted,
    email:req.body.email,
    isAdmin:req.body.isAdmin
})
try{
    const savedUser= await newUser.save();
    res.status(201).json(savedUser)
}catch(err){
    console.log(err)
}
})

//login

router.post("/login",async(req,res)=>{
    try {

        const user=await User.findOne({email:req.body.email})
       
        if(!user){
            res.status(404).send("user not found")
            
        }else{
            
            const decrypted=Crypto.AES.decrypt(user.password,process.env.CRYPTO_KEY)
            const password =decrypted.toString(Crypto.enc.Utf8)
            console.log(password)
           
            if(password===req.body.password){
                const accessToken=jwt.sign({
                    id:user._id,
                    isAdmin:user.isAdmin
                },process.env.JWT_KEY,{expiresIn:"3d"})

                const {password,... others}=user._doc
                
                res.status(201).send({others,accessToken})

                
            }else{
                res.status(404).json("wrong password")
            }
        
    }

        
    }catch(error) {
        res.status(404).json("full error")
        console.log(error)
        
    }
})


module.exports=router