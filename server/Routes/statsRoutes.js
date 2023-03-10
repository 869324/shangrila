const express = require("express");
const router = express.Router();
const statsController = require("../Controllers/statsController");

router.get("/getStats", statsController.getStats);

module.exports = router;
