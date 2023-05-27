const jwt = require("jsonwebtoken");
var config = require("../config");

const validate = async (req, res, next) => {
  let token = "";
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
        try {
          const decoded = jwt.verify(token, config.accessSecret);
          req.user = decoded.data;
          return next();
        } catch (err) {
          if (err.name === "TokenExpiredError") {
            res.status(401);
            res.json({ message: "Access token Expired." });
          } else {
            res.status(401);
            res.json({ message: "Invalid access token." });
          }
        }
      }
    } else {
      res.status(401);
      res.send({
        message:
          "Invalid authorization header format. Format is Authorization: Bearer [token]",
      });
    }
  } else {
    res.status(401);
    res.send({ message: "No authorization header was found" });
  }
};

module.exports = validate;