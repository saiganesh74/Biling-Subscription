const express = require("express");
const subscriptionController = require("../controllers/subscription.controller");

const router = express.Router({mergeParams:true});

router.post("/", subscriptionController.createSubscription);

module.exports = router;