const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
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
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        }
    }, { timestamps: true }

)
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer