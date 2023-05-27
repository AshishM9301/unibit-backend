const jwt = require("jsonwebtoken");
const { accessSecret, refreshSecret } = require("../config");

const generateToken = (user) => {
  const accessToken = jwt.sign(
    {
      data: user,
    },
    accessSecret,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    {
      data: user,
    },
    refreshSecret,
    { expiresIn: "1d" }
  );

  return { accessToken, refreshToken };
};

module.exports = generateToken;