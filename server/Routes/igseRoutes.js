const express = require("express");
const router = express.Router();
const igseController = require("../Controllers/igseController");

router.get("/propertyCount", igseController.getPropertyCount);
router.get("/:propertyName/:bedrooms", igseController.getAverage);

module.exports = router;
