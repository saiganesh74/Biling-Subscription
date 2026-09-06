const Subscription = require("../models/subscription.model");
const Customer = require("../models/customer.model");
const Plan = require("../models/plan.model");

const createSubscription = async (req, res) => {
    try {
        const { tenantId, customerId } = req.params;
        const { planId, startDate } = req.body;

        //1 Check if customer belongs to tenant 
        const customer = await Customer.findOne({
            _id: customerId,
            tenantId
        });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found for this tenant"
            });
        }

        //2 Check Plan belongs to tenant 
        const plan = await Plan.findOne({
            _id: planId,
            tenantId
        });
        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found for this tenant"
            });
        }

        //Calculate the Billing period for the Subscription 
        const currentPeriodStart = new Date(startDate);
        const currentPeriodEnd = new Date(startDate);

        if(plan.interval === "month"){
            currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1 ) //Adding one month to the current subscription ending month by fetching the currentmonth and adding 1 to it 
        }

        if(plan.interval === "year"){
            currentPeriodEnd  = currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1) //Adding a year extra for the curent ending year 
        }

        if(currentPeriodEnd <= currentPeriodStart){
            return res.status(400).json({
                success:false,
                message: "Invalid Billing Period"
            });
        }

        //3 Create Subscription
        const subscription = Subscription.create({
            tenantId,
            customerId,
            planId,
            status: "ACTIVE",
            startDate :  
            currentPeriodStart,
            currentPeriodEnd
        })
        res.status(201).json({
            success: true,
            subscription
        });

    } catch (e) {
        throw e;
    }
}

module.exports = { createSubscription };