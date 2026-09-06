const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    interval: {
        type: String,
        required: true,
        enum: ["month", "year"]
    }
}, { timestamps: true }
);

planSchema.index({
    tenantId: 1,
    productId: 1,
    name: 1
},
    { unique: true }
)


const plan = mongoose.model("Plan", planSchema);
module.exports = plan