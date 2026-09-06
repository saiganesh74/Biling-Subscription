const express = require("express");

const tenantController = require("../controllers/tenant.controller");

const router = express.Router();

router.post("/",tenantController.createTenant);

module.exports = router ;