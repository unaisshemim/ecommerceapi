const mongoose=require('mongoose')


const productSchema=new mongoose.Schema({
    title:{type:String,required:true},
    img:{type:String,required:true},
    size:{type:Array,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    category:{type:Array,required:true},
    quantity:{type:Number,required:true},
    color:{type:Array,required:true}
},{timestamps:true})
module.exports=mongoose.model("Product",productSchema)