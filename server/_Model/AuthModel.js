const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    
    userId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), },
    email: { type: String, required: true, unique: true, index: true, },
    arrayofemail: { type: Object,  required: true, }

}, { timestamps: true }); // adds createdAt and updatedAt fields


const authmodel = mongoose.model("auth", authSchema)

module.exports = authmodel;