const express = require("express");
const { allTicket, addTicket } = require("../../../controllers");

const validate = require("../../../middleware/validate");

const router = express.Router();

router.get("/all", validate, allTicket);
router.post("/add", validate, addTicket);

module.exports = router;
