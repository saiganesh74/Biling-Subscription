const Customer = require("../models/customer.model");

const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.customerid);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            customer
        });
    } catch (error) {
        throw error;
    }
};

const createCustomer = async (req, res) => {
    try {
        const { name, email } = req.body;
        const { tenantId } = req.params;

        const existingCustomer = await Customer.findOne({
            tenantId,
            email
        });

        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                message: "Customer already exists for this tenant!"
            });
        }

        const customer = await Customer.create({
            tenantId,
            name,
            email
        });

        res.status(201).json({
            success: true,
            customer
        });

    } catch (error) {
        throw error;
    }
};

module.exports = {
    getCustomer,
    createCustomer
};