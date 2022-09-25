

const router=require('express').Router();
const Product=require('../models/Products')
const {verifyTokenAndAdmin}=require("./verifyToken")

//Create
router.post('/create',verifyTokenAndAdmin,async(req,res)=>{

    const newProduct= await new Product(req.body)
        

    try {
        const savedProduct= await newProduct.save()
        console.log(savedProduct)
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(404).json(error)
    }

})

//Update
router.post('/update',verifyTokenAndAdmin,async(req,res)=>{
    
    try {
        const updateProduct=await Product.findByIdAndUpdate(req.params.id,
            {
                $set:req.body
            },{
                new:true
            })
            res.status(200).json(updateProduct)
        
    } catch (error) {
    res.status(400).json(error)        
    }    
})

//delete
router.delete("/delete",verifyTokenAndAdmin,async(req,res)=>{
try{
await Product.findByIdAndDelete(req.params.id)
res.status(200).json("product has been deleted")

}catch(err){
    res.status(404).json(err)
}

})



//get  products

router.get("/:id",async(req,res)=>{

try {
    const product=await Product.findById(req.params.id)
    res.status(200).json(product)

} catch (error) {
    res.status(404).json(error)
}

})
//get all products



router.get('/',async(req,res)=>{
 
    const qNew=req.query.new
    const qCategory=req.query.category
    try {
     
        if(qNew){
            products=await Product.find().sort({createdAt:-1}).limit(1)
        }else if( qCategory){
            
            products=await Product.find({
                category:{
                    $in:[qCategory]
                }
                
            })
            
        }else{
            products=await Product.find()
        }
        res.status(200).json(products)
    } catch (error) {
        console.log
        res.status(404).json(error)
    }
})








module.exports=router