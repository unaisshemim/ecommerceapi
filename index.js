const express=require('express')
const app=express()
const mongoose= require('mongoose')
const dotenv=require('dotenv')

const userRouter=require('./Routes/user')
const authRouter=require('./Routes/auth')
const productRouter=require('./Routes/product')
const cartRouter=require("./Routes/cart")
const orderRouter=require("./Routes/order")
const checkoutRouter=require('./Routes/razorpay')
const cors=require('cors')

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("connected to database")}).catch(err=>console.log(err))


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)    
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/checkout',checkoutRouter)

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('shoping/build'));
   
}
const PORT=process.env.PORT || 3001

app.listen(PORT,()=>console.log(`server running in ${PORT}`))