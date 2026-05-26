const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemID: { type: Number},
    name: { type: String },
    description: { type: String},
    category: { type: String },
    buyPrice: { type: Number },
    sellPrice: { type: Number },
    qty: { type: Number, default: 1}
})

const model = mongoose.model("Items", itemSchema)

module.exports = model;