const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema({
    tenantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    planId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true
    }, 

    status:{
        type: String,
        required: true ,
        enum:["TRAILING","ACTIVE","PAST_DUE","CANCELLED"]
    },
    startDate:{
        type: Date,
        required: true,
    }, 
    currentPeriodStart:{
        type: Date,
        required: true
    },
    currentPeriodEnd:{
        type: Date,
        required: true
    }
},{timestamps:true}
)

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;