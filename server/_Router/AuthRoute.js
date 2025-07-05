const express = require("express");
const { google } = require("googleapis");

const router = express.Router();
require("dotenv").config();

const authModel = require("../_Model/AuthModel");
const warrantyModel = require("../_Model/Warranty_data");

const auth = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)

router.post("/saveAuth", async(req,res) =>{
    try{
        const token =  req.headers.authorization;
        const {email} = req.body
        const tokenData = JSON.parse(token)
        const authSave = await authModel.findOneAndUpdate(
            { email: email },
            { arrayofemail: tokenData },
            { upsert: true, new: true }
        )
        console.log(authSave)

        res.status(200).json({message:"SuccessFull Login Save"})
    }catch(error){
        res.status(500).json("Internal fail")
    }
})

router.post("/calender", async (req, res) => {
  try {
    
    const { email, data } = req.body;

    const User_token = await authModel.findOne({ email });

    if (!User_token || !User_token.arrayofemail) {
      return res.status(400).json({ message: "❌ Invalid or missing user token." });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials(User_token.arrayofemail);

    const calendar = google.calendar({ version: "v3", auth });

    const insertedEvents = [];

    for (const product of data.products) {
      for (const warranty of product.warranties) {
        const event = {
          summary: `Warranty ends in 7 day: ${product.product_name}`,
          description: `Warranty type: ${warranty.type}, Ends on: ${warranty.warranty_end}`,
          start: {
            date: warranty.warning_date, // reminder date
            timeZone: "Asia/Kolkata"
          },
          end: {
            date: warranty.warning_date,
            timeZone: "Asia/Kolkata"
          }
        };


        const response = await calendar.events.insert({
          calendarId: "primary",
          resource: event
        });

        insertedEvents.push(response.data.id);
      }
    }

    await warrantyModel.create({
      email: email,
      arrayofwarranty: data
    });
    

    res.status(200).json({
      message: "✅ Events added to calendar.",
    //   insertedEventIds: insertedEvents
    });

  } catch (error) {
    console.error("❌ Error inserting calendar events:", error.message);
    res.status(500).json({ message: "Internal failure", error: error.message });
  }
});

router.get("/alldata", async(req,res) => {
  try{
    const data = await warrantyModel.find({email:req.query.email})
    res.status(200).json(data)
  }catch(error){
    res.status(500).json("Internal fail")
  }
})

module.exports = router;