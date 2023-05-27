const express = require("express");
const { addNumber } = require("../../../controllers");

const validate = require("../../../middleware/validate");

const router = express.Router();

router.get("/add", validate, addNumber);

module.exports = router;
