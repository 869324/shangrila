const express = require("express");
const router = express.Router();
const priceController = require("../Controllers/priceController");

router.post("/getPrices", priceController.getPrices);

module.exports = router;
