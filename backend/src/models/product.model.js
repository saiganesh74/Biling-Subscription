const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required:true
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema);
module.exports = Product;