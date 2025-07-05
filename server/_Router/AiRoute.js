const express = require("express");

const router = express.Router();

router.post("/aitest", async(req,res) => {
    try{
        console.log("hello")
        // const {textContent} = req.body;
        // res.json("rrttrgtrgtrg rtgtgt4 tr4rgt rtgrtg4 rrr")
    }catch(error){
        console.log(error)
    }
})

module.exports = router;