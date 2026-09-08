const Plan = require("../models/plan.model");
const Subscription = require("../models/subscription.model");

const expireCanceledSubscriptions = async () => {
    try {
        const result = await Subscription.updateMany({
            status: "ACTIVE",
            cancelAtPeriodEnd: true,
            currentPeriodEnd: {
                $lte: new Date()
            }
        },
            {
                $set: {
                    status: "INACTIVE"
                }
            });
        console.log(`Expired Subscriptions: ${result.modifiedCount}`);
    } catch (e) {
        throw e
    }
}

const renewSubscriptions = async () => {
    try {
        const subscriptions = await Subscription.find({
            status: "ACTIVE",
            cancelAtPeriodEnd: false,
            currentPeriodEnd: {
                $lte: new Date()
            }
        });

        for (const subscription of subscriptions) {
            const plan = await Plan.findById(subscription.planId);

            if (!plan) {
                continue;
            }
            subscription.currentPeriodStart = new Date(subscription.currentPeriodEnd);
            subscription.currentPeriodEnd = new Date(subscription.currentPeriodStart);
            if (plan.interval === "month") {
                subscription.currentPeriodEnd.setMonth(
                    subscription.currentPeriodEnd.getMonth() + 1
                );
            }
            if (plan.interval === "year") {
                subscription.currentPeriodEnd.setFullYear(
                    subscription.currentPeriodEnd.getMonth() + 1
                );
            };
            await subscription.save();
        }
        console.log(`Renewed Subscriptions : ${subscriptions.length}`)
    } catch (e) {
        console.error(
            "Failed to renew subscriptions:",
            e.message
        );
    }
}

module.exports = { expireCanceledSubscriptions, renewSubscriptions };