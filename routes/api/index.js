const createError = require("http-errors");
const router = require("express").Router();

const ticket = require("./ticket");
const auth = require("./auth");
const number = require("./number");

router.use("/number", number);
router.use("/ticket", ticket);
router.use("/auth", auth);

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
