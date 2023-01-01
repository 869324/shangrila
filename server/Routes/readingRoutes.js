const express = require("express");
const router = express.Router();
const readingController = require("../Controllers/readingController");

router.post("/create", readingController.createReading);
router.post("/getReadings", readingController.getReadings);

module.exports = router;
