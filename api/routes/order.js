
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")
const router = require('express').Router()
const orderController = require('../Controller/orderController')

router.post("/", verifyToken,  orderController.createOrder)

router.put("/:id",  verifyTokenAndAdmin, orderController.updateOrder)

router.delete("/:id",  verifyTokenAndAdmin,  orderController.deleteOrder)

router.get("/find/:userId",   verifyTokenAndAuthorization, orderController.getOrderById)

router.get("/", verifyTokenAndAdmin, orderController.getAllOrders)

router.get("/income", verifyTokenAndAdmin, orderController.getOrdersIncome)

module.exports = router