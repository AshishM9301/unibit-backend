const express = require("express");
const {
  login,register, auth
} = require("../../../controllers");
const validate = require("../../../middleware/validate");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get('/me', validate,auth)


module.exports = router;