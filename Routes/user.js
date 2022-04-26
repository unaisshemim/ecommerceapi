
const {verifyToken,verifyTokenAndAuth,verifyTokenAndAdmin}=require("./verifytoken")
const router=require('express').Router();
const User=require("../Models/User")



//update
router.put("/:id",verifyTokenAndAuth,async(req,res)=>{
console.log("superman")

if(req.body.password){
    
    req.body.password = CryptoJS.AES.encrypt(req.body.password, "Secret Passphrase").toString()
}
    try{
        
        const UpdatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json("changed success")
        
      
    } catch(err){
        res.status(404).json("not authorized")
        console.log("stopped")
        
    }  

})
//Delete

router.delete("/:id",verifyTokenAndAuth,async (req,res)=>{
    try{
        await User.findbyIdAndDelete(req.params.id)
        res.send(200).json("delterd succedfully")
    }   
    catch(err){
        res.status(404).json(err)
    }
})
//get
router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    
    try{
      
        const users= await User.findById(req.params.id)
       
        const {password,...others}=users._doc
        res.status(200).json(others)

    }   
    catch(err){
        res.status(404).json("error")
        
    }
})
//get all users
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    const query=req.query.new
    try{
      
        const users=query ?  await User
        .find()
        .sort({_id:-1})
        .limit(1)
        
        :await User.find()
        res.status(200).json(users)

    }   
    catch(err){
        res.status(404).json("error")
        
    }
})
router.get("/stats",verifyTokenAndAdmin,async(req,res)=>{

    const date=  new Date()
  
    const lastYear=  new Date(date.setFullYear(date.getFullYear() - 1))
 
    try{
        const data= await User.aggregate([
            {$match: {createdAt:{$gte :lastYear}}},

            {$project:{
                month:{$month:"$createdAt"},
            },
            },{
                $group:{
                    _id:"$month",
                    total:{$sum:1}
                }
            }
           
        ])
        console.log(data)
        res.status(200).json(data)
    }catch(err){
  
        res.status(404).send(err)
    }


})
 
module.exports=router