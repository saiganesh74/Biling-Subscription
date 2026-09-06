const express = require("express");

const productController = require("../controllers/product.controller");

const router = express.Router({mergeParams:true}); 

router.post("/",productController.createProduct);

module.exports = router; 