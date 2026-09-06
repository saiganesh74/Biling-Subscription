const express = require("express");

const customerRoutes = require("./routes/customer.routes");
const tenantRoutes = require("./routes/tenant.routes");
const productRoutes = require("./routes/product.routes")
const planRoutes = require("./routes/plan.routes")
const subscriptionRoutes= require("./routes/subscription.routes");
const app = express();

app.use(express.json());

app.use("/api/v1/customers", customerRoutes);

app.use("/api/v1/tenants", tenantRoutes);

app.use("/api/v1/tenants/:tenantId/customers", customerRoutes);

app.use("/api/v1/tenants/:tenantId/products", productRoutes)

app.use("/api/v1/tenants/:tenantId/products/:productId/plans", planRoutes);

app.use("/api/v1/tenants/:tenantId/customers/:customerId,subscription", subscriptionRoutes)


app.use((err, req, res, next) => {
    console.error(err);

    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Plan already exists for this product"
        })
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    })
});
module.exports = app;