const router=require('express').Router();
const User = require('../models/User');
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}=require("./verifyToken")


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
router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
       await User.findByIdAndDelete(req.params.id)
       
       res.status(201).json("user has been delted")
    }catch(err){
        res.status(404).json(err)
    }
})

router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        console.log(user);
        const {password,...others}=user._doc
        
        res.status(201).json(others)
    }catch(err){
        res.status(404).json("user no found")
    }
})


//get user stats

router.get("/stats",async(req,res)=>{

    const date=new Date();
    const lastYear=new Date(date.setFullYear(date.getFullYear()-1))
    
    
    try{
        const data=await User.aggregate([
            {$match:{createdAt:{$gte:lastYear}}},
            {
                $project:{
                    month:{$month:"$createdAt"}
                }
            },
                {
                    $group:{
                        _id:"$month",
                        total:{$sum:1}
                    }
                }
            
        ])

        console.log(data)
        res.status(201).json(data)
    }catch(err){
        res.status(404).json(err)
    }

    

})


module.exports=router