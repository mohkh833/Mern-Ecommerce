const Cart = require("../models/Cart");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")
const router = require('express').Router()
const cartController = require('../Controller/cartController')

//Create 

router.post("/", verifyToken, cartController.createCart)

router.put("/:id",  verifyTokenAndAuthorization, cartController.updateCart)

router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart)

router.get("/find/:userId",   verifyTokenAndAuthorization, cartController.getCart)

router.get("/", verifyTokenAndAdmin, cartController.getAllCarts)




module.exports = router