


const {verifyToken,verifyTokenAndAuth,verifyTokenAndAdmin}=require("./verifytoken")
const router=require('express').Router();
const Order= require("../Models/Order")

//Create

router.post("/",verifyToken,async(req,res)=>{
    const newOrder = new Order(req.body)
try{
    const savedOrder=await newOrder.save();
    res.status(200).send(savedOrder)
}catch(err){
    res.status(404).send(err)
    console.log("error")
}
   
})



//update
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{

  try{
        
        const UpdatedOrder=await User.findByIdAndUpdate(req.params.id
            ,{$set:req.body}
            ,{new:true})
        res.status(200).json(UpdatedOrder)
        
      
    } catch(err){
        res.status(404).json("not authorized")
        console.log("stopped")
        
    }  

})
//Delete

router.delete("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        await Order.findbyIdAndDelete(req.params.id)
        resa(200).json("deleted succedfully")
    }   
    catch(err){
        res.status(404).json(err)
    }
})
//get User Cart
router.get("/find/:userId",verifyTokenAndAuth,async(req,res)=>{
    
    try{
      
        const orders= await Order.find({userId:req.params.userId})
       
       
        res.status(200).json(orders)

    }   
    catch(err){
        res.status(404).json("error")
        
    }
})
//get all 
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const orders=await Order.find()
        res.status(200).json(orders)
    }catch(err){
        res.status(404).json(err)
    }
})

//Get montly income

router.get("/income",verifyTokenAndAdmin,async(req,res)=>{
    const date=new Date();
    const lastMonth=new Date(date.setMonth(date.getMonth()-1))
    const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth()-1))



        try{
            const income = await Order.aggregate([
                {$match:{createdAt:{$gte:previousMonth}}},
                {$project:
                    {
                    month:{$month:"$createdAt"},
                    sales:"$amount"
                   },
                   
                },
                {$group:{
                    _id:"$month",
                    total:{$sum:"$sales"}
                }}
            ])
            res.status(200).json(income)
        }catch(err){
            res.status(404).json(err)
        }
})


 
module.exports=router

