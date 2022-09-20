const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userAuth=require('./routes/auth')

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



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running ");
});
