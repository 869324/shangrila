const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/createUser", userController.createUser);
router.post("/login", userController.login);
router.post("/verifyToken", userController.verifyToken);

module.exports = router;
