const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/getUserData", userController.getUserByToken);

module.exports = router;
