const express = require("express");
const router = express.Router();
const priceController = require("../Controllers/priceController");

router.get("/getPrices", priceController.getPrices);
router.post("/updatePrices", priceController.updatePrices);

module.exports = router;
