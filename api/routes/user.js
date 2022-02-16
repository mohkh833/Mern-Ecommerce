const User = require("../models/User");
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

const userController = require('../Controller/userController')

router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);

router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);

router.get("/find/:id", verifyTokenAndAdmin, userController.getUserById);

router.get("/", verifyTokenAndAdmin, userController.getAllUsers);

router.get("/stats", verifyTokenAndAdmin, userController.getUserStats);

module.exports = router;
