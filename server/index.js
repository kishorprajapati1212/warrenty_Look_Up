const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors")
require('dotenv').config();

const Auth = require("./_Router/AuthRoute")
const Ai = require("./_Router/AiRoute")

const app = express()
app.use(cors());
  
  
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));



  
app.use(Auth)
app.use(Ai)

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);  // Log just the error message
  });

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
