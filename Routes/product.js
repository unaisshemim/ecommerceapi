


const {verifyToken,verifyTokenAndAuth,verifyTokenAndAdmin}=require("./verifytoken")
const router=require('express').Router();
const Product=require("../Models/Product")

//Create

router.post("/",verifyToken,async(req,res)=>{
    
    const newProduct =  new Product(req.body)
try{
    
    const Product=await newProduct.save();
    console.log(Product)
    res.status(200).send(Product)
    console.log("success")
}catch(err){
    res.status(404).send(err)
    console.log(err)
}
   
})



//update
router.put("/:id",verifyTokenAndAuth,async(req,res)=>{

  try{
        
        const UpdatedProduct=await User.findByIdAndUpdate(req.params.id
            ,{$set:req.body}
            ,{new:true})
        res.status(200).json(UpdatedProduct)
        
      
    } catch(err){
        res.status(404).json("not authorized")
        console.log("stopped")
        
    }  

})
//Delete

router.delete("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        await Product.findbyIdAndDelete(req.params.id)
        res.send(200).json("deleted succedfully")
    }   
    catch(err){
        res.status(404).json(err)
    }
})
//get single product
router.get("/find/:id",async(req,res)=>{
    
    try{
      
        const product= await Product.findById(req.params.id)
       
       
        res.status(200).json(product)

    }   
    catch(err){
        res.status(404).json("error")
        
    }
})
//get all products
router.get("/",async(req,res)=>{
 
    const qNew=req.query.new;
    const qCategory=req.query.category;
    try{
      let products;
      if(qNew){
          products=await Product.find().sort({createdAt:-1}).limit(1)
      }else if(qCategory){
          products=await Product.find({category:{$in:[qCategory]}})
      }else{
          products=await Product.find()
      }
       
        res.status(200).json(products)

    }   
    catch(err){
       
        res.status(404).json(err)
        
    }
})



 
module.exports=router

