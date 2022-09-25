

const router=require('express').Router();
const Order=require('../models/Order')
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}=require("./verifyToken")

//Create
router.post('/create',verifyToken,async(req,res)=>{

    const newOrder= await new Order(req.body)
        

    try {
        const savedOrder= await newOrder.save()
        console.log(savedOrder)
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(404).json(error)
    }

})

//Update
router.post('/update',verifyTokenAndAdmin,async(req,res)=>{
    
    try {
        const updateOrder=await Order.findByIdAndUpdate(req.params.id,
            {
                $set:req.body
            },{
                new:true
            })
            res.status(200).json(updateOrder)
        
    } catch (error) {
    res.status(400).json(error)        
    }    
})

//delete
router.delete("/delete",verifyTokenAndAdmin,async(req,res)=>{
try{
await Order.findByIdAndDelete(req.params.id)
res.status(200).json("product has been deleted")

}catch(err){
    res.status(404).json(err)
}

})



//get  products

router.get("/:userId",async(req,res)=>{

try {
    const orders=await Order.find(req.params.userId)
    res.status(200).json(orders)

} catch (error) {
    res.status(404).json(error)
}

})
//get all carts
router.get('/',async(req,res)=>{

try {
    const orders=await Order.find()
    res.status(200).json(orders)    
} catch (error) {
    res.status(404).json(error)
}
})


//get income
router.get('/income',async(req,res)=>{
    
    const date=new Date()
    const lastMonth=new Date(date.setMonth(date.getMonth()-1))
    const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth()-1))

    try {
        const income=await Order.aggregate([
            {$match:{createdAt:{$gte:previousMonth}}},
            {$project:{
                month:{$month:"$createdAt"},
                sales:"$amount"
            }}
            ,
            {$group:{_id:"$month",total:{$sum:"$price"}}}
        ])
        res.status(200).json(income)

    } catch (error) {
        console.log(error)
        res.status(404).json("error")
    }
})





module.exports=router