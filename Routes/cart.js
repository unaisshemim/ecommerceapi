


const {verifyToken,verifyTokenAndAuth,verifyTokenAndAdmin}=require("./verifytoken")
const router=require('express').Router();
const Cart= require("../Models/Cart")

//Create

router.post("/",verifyToken,async(req,res)=>{
    const newCart = new Product(req.body)
try{
    const savedCart=await newCart.save();
    res.status(200).send(savedCart)
}catch(err){
    res.status(404).send(err)
    console.log("error")
}
   
})



//update
router.put("/:id",verifyTokenAndAuth,async(req,res)=>{

  try{
        
        const UpdatedCart=await User.findByIdAndUpdate(req.params.id
            ,{$set:req.body}
            ,{new:true})
        res.status(200).json(UpdatedCart)
        
      
    } catch(err){
        res.status(404).json("not authorized")
        console.log("stopped")
        
    }  

})
//Delete

router.delete("/:id",verifyTokenAndAuth,async (req,res)=>{
    try{
        await Cart.findbyIdAndDelete(req.params.id)
        resa(200).json("deleted succedfully")
    }   
    catch(err){
        res.status(404).json(err)
    }
})
//get User Cart
router.get("/find/:userId",verifyTokenAndAuth,async(req,res)=>{
    
    try{
      
        const cart= await Cart.findOne({userId:req.params.userId})
       
       
        res.status(200).json(cart)

    }   
    catch(err){
        res.status(404).json("error")
        
    }
})
//get all 
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const carts=await Cart.find()
        res.status(200).json(carts)
    }catch(err){
        res.status(404).json(err)
    }
})



 
module.exports=router

