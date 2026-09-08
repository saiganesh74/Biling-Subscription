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

module.exports = {expireCanceledSubscriptions};