const express = require('express');
const router = express.Router();

const productcontroller = require("../controllers/product")


router.post("/products/new", productcontroller.addProduct)
router.get("/getallproducts", productcontroller.getAllProducts)
router.get("/getproductbyid/:id", productcontroller.getProductById)
router.post("/updateproductbyid/:id", productcontroller.updateProductById)
router.post("/deletproduct/:id", productcontroller.deleteProductById)
module.exports=router