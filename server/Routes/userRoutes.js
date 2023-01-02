const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/getUserData", userController.getUserByToken);
router.post("/topup", userController.topup);
router.get("/getUsers", userController.getUsers);

module.exports = router;
