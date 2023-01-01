const express = require("express");
const router = express.Router();
const billController = require("../Controllers/billController");

router.post("/getBills", billController.getBills);
router.post("/pay", billController.pay);

module.exports = router;
