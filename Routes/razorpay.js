const router=require("express").Router()
const Razorpay=require('razorpay')
const crypto=require('crypto')

//order
router.post('/order',async(req,res)=>{
  
  try {
   var instance = new Razorpay({
      key_id:process.env.RAZOR_KEY,
      key_secret:process.env.RAZOR_SEC_KEY
      });
      var options = {
       amount: req.body.amount,  // amount in the smallest currency unit
       currency: "INR",
       receipt: crypto.randomBytes(10).toString('hex')
     };
     instance.orders.create(options, (err, order)=>{
      if(err){
         console.log(err)
         return res.status(404).json("something went wrong")
      }res.status(200).json({data:order})
     });
  } catch (error) {
     console.log(error)
     res.status(404).json("internal error occured  ")
  }
})

//payment verify

router.post('/verify',async(req,res)=>{
   try {
      const {razrazorpay_signature,razorpay_order_id,razorpay_payment_id
      }=req.body
      const sing=razorpay_order_id + "|" + razorpay_payment_id;
      var expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_SEC_KEY)
      .update(body.toString())
      .digest('hex');
      if(expectedSignature === razorpay_signature){
         res.send(200).json("payment verified succefully")
      }else{
         res.send(404).json('payment verified failed')
      }
   } catch (error) {
      console.log(error)
   }
})

module.exports=router