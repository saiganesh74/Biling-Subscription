const Subscription = require("../models/subscription.model");
const Customer = require("../models/customer.model");
const Plan = require("../models/plan.model");

const createSubscription = async (req, res) => {
    try {
        // Get IDs from the URL
        const { tenantId, customerId } = req.params;

        // Get data from the request body
        const { planId, startDate } = req.body;

        // -----------------------------
        // 1. Validate startDate
        // -----------------------------

        if (!startDate) {
            return res.status(400).json({
                success: false,
                message: "startDate is required"
            });
        }

        const parsedStartDate = new Date(startDate); // the parsed date makes sure to conver the string to a Date obj using the Date() 

        if (isNaN(parsedStartDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid startDate"
            });
        }

        // 2. Check customer

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

        // -----------------------------
        // 3. Check plan
        // -----------------------------

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

        // -----------------------------
        // 4. Calculate billing period
        // -----------------------------

        const currentPeriodStart = new Date(parsedStartDate);
        const currentPeriodEnd = new Date(parsedStartDate);

        if (plan.interval === "month") {

            const originalDay = currentPeriodStart.getDate();// get date gives the day of the month 

            // Move to the first day of the next month
            currentPeriodEnd.setDate(1);
            currentPeriodEnd.setMonth(
                currentPeriodEnd.getMonth() + 1
            );

            // Find the last day of the next month
            const lastDayOfNextMonth = new Date(
                currentPeriodEnd.getFullYear(),
                currentPeriodEnd.getMonth() + 1,
                0
            ).getDate();

            // Use original day if it exists,a
            // otherwise use the last day of the month
            currentPeriodEnd.setDate(
                Math.min(originalDay, lastDayOfNextMonth)
            );
        }

        if (plan.interval === "year") {

            currentPeriodEnd.setFullYear(
                currentPeriodEnd.getFullYear() + 1
            );
        }

        // -----------------------------
        // 5. Final billing-period check
        // -----------------------------

        if (currentPeriodEnd <= currentPeriodStart) {
            return res.status(400).json({
                success: false,
                message: "Invalid billing period"
            });
        }

        // -----------------------------
        // 6. Create subscription
        // -----------------------------

        const subscription = await Subscription.create({
            tenantId,
            customerId,
            planId,
            status: "ACTIVE",

            // Original subscription start
            startDate: parsedStartDate,

            // Current billing period
            currentPeriodStart,
            currentPeriodEnd
        });

        res.status(201).json({
            success: true,
            subscription
        });

    } catch (error) {
        throw error;
    }
};

module.exports = {
    createSubscription
};