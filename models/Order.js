const mongoose=require('mongoose')


const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    products:[
        {
            productId:{type:String,required:true},
            quantity:{type:Number,required:true,default:1}
        },
    ],
    amount:{type:Number,required:true},
    address:{type:String,required:true},
    status:{type:String,required:true,default:'pending'}
},{timestamps:true})


module.exports=mongoose.model('Order',orderSchema)