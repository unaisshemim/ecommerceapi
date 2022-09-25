const router=require('express').Router();
const RazorPay=require('razorpay')


var instance=new RazorPay({
    key_id:"rzp_test_UILHyON3XlyCoA",
    key_secret:process.env.RAZORPAY_SECRET_KEY_ID
})

    
module.exports=router
