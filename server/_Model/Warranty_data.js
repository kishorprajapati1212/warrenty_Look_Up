const mongoose = require("mongoose");

const warrantySchema = new mongoose.Schema({
    
    email: { type: String, required: true, index: true  },
    arrayofwarranty: { type: Object,  required: true, }

}, { timestamps: true }); // adds createdAt and updatedAt fields


const warrantymodel = mongoose.model("warranty", warrantySchema)

module.exports = warrantymodel;