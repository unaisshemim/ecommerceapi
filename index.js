const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userAuth=require('./routes/auth')
const UpdateUser=require("./routes/user")
const Product=require("./routes/product")
const Order=require("./routes/order")
const RazorPay=require("./routes/razorpay")

const cors=require('cors')

app.use(cors())
dotenv.config();
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
  app.use('/auth',userAuth)
  app.use("/user",UpdateUser)
  app.use("/product",Product)
  app.use("/order",Order) 




const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("server is running"+PORT )
});
