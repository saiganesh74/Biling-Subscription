const Plan = require("../models/plan.model");

const Product = require("../models/product.model");

const createPlan = async (req, res) => {
    try {
        const { tenantId, productId } = req.params;
        const { name, amount, currency, interval } = req.body;

        //Making sure that the product belongs to the respective tenant !!
        const product = await Product.findOne({
            _id: productId,
            tenantId
        })
        if(!product){
            return res.status(404).json({
                success:false ,
                message: "Product not found for this tenant"
            });
        };

        const plan = await Plan.create({
            tenantId, 
            productId,
            name,
            amount,
            currency,
            interval
        });
        return res.status(201).json({
            success:true, 
            plan
        })

    } catch (error) {
        throw error;
    }
}

module.exports = {createPlan}