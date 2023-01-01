const express = require("express");
const router = express.Router();
const utilsController = require("../Controllers/utilsController");

router.get("/getPropertyTypes", utilsController.getPropertyTypes);

module.exports = router;
