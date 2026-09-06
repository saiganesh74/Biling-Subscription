const express = require("express");

const planController = require("../controllers/plan.controller");

const router = express.Router({mergeParams:true});

router.post("/", planController.createPlan);

module.exports = router
