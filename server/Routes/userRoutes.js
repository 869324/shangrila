const express = require("express");
const router = express.Router();
const controller = require("../Controllers/userController");

//router.post("/login", controller.login);
router.get("/getUsers", controller.getUsers);
//router.get("/getUser/:id", controller.getUser);
//router.put("/getUserByToken", controller.updateUser);

module.exports = router;
