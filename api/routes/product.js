
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")
const router = require('express').Router()
const productController = require('../Controller/productController')

router.post("/", verifyTokenAndAdmin, productController.createProduct)

router.put("/:id",  verifyTokenAndAdmin , productController.updateProduct)

router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct)

router.get("/find/:id",  productController.getProductById)

router.get("/", productController.getAllProducts)


module.exports = router