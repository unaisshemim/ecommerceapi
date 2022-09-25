

const router=require('express').Router();
const Cart=require('../models/Cart')
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}=require("./verifyToken")

//Create
router.post('/create',verifyToken,async(req,res)=>{

    const newCart= await new Cart(req.body)
        

    try {
        const savedCart= await newCart.save()
        console.log(savedCart)
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(404).json(error)
    }

})

//Update
router.post('/update',verifyTokenAndAuthorization,async(req,res)=>{
    
    try {
        const updateCart=await Product.findByIdAndUpdate(req.params.id,
            {
                $set:req.body
            },{
                new:true
            })
            res.status(200).json(updateCart)
        
    } catch (error) {
    res.status(400).json(error)        
    }    
})

//delete
router.delete("/delete",verifyTokenAndAuthorization,async(req,res)=>{
try{
await Cart.findByIdAndDelete(req.params.id)
res.status(200).json("product has been deleted")

}catch(err){
    res.status(404).json(err)
}

})



//get  products

router.get("/:userid",async(req,res)=>{

try {
    const cart=await Cart.find({userId:req.params.user})
    res.status(200).json(cart)

} catch (error) {
    res.status(404).json(error)
}

})
//get all carts
router.get('/',verifyTokenAndAdmin,async(req,res)=>{
try {
    const carts=await Cart.find()
    res.status(200).json(carts)

} catch (error) {
    res.status(404).json(error)
}
})





module.exports=router