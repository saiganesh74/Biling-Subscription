const express = require("express");

const customerController = require("../controllers/customer.controller");

const router = express.Router({mergeParams: true});

router.get("/:customerid", customerController.getCustomer);

router.post("/", customerController.createCustomer);

module.exports = router;