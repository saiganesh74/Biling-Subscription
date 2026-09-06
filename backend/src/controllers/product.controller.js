const Product = require("../models/product.model");

const createProduct = async (req, res) => {
    try {
        const { tenantId } = req.params;
        const { name, description } = req.body;

        const product = await Product.create({
            tenantId,
            name,
            description
        });

        res.status(201).json({
            success: true,
            product
        });

    } catch (error) {
        throw error;
    }
};

module.exports = {
    createProduct
};