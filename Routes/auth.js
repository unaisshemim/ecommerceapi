const router=require('express').Router()
const User=require('../Models/User')
const CryptoJS=require('crypto-js') 
const jwt=require("jsonwebtoken")
//Register
router.post("/register",async(req,res)=>{
    const newUser=new User({
        username:req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, "Secret Passphrase").toString(),
        email:req.body.email,
        admin:req.body.admin
    })
    try{
        const savedUser= await newUser.save()
     
        console.log(savedUser)
        res.status(201).json(savedUser)
    }catch(err){
        res.status(404).json(err)
        console.log(err)

    }
})
//Login

router.post("/login",async(req,res)=>{
     

    try{
     
        const user= await User.findOne({username: req.body.username})

        !user && res.status(404).json("wrong credentials")
    
        const hashedPassword=CryptoJS.AES.decrypt(
            user.password,
            "Secret Passphrase"
            )
            
            const orginalPassword=hashedPassword.toString(CryptoJS.enc.Utf8)
            orginalPassword !==req.body.password && res.status(404).json('wrong credientials')
          
            const token=jwt.sign({
                id:user._id,
                isAdmin:user.admin
            },process.env.JWT_KEY,
            {expiresIn:"3d"})
           
            const {password,...others}=user._doc

            res.status(200).json({...others,token})
            
    }catch(err){
        console.log(err)
        res.status(404).json(err)
       
    }
    
    })


module.exports=router