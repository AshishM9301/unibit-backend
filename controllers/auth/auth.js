const createError = require("http-errors");
const generateToken = require("../../services/token");

const auth = async (req, res, next) => {
  try {
    if (!req?.user) {
      createError.NotFound("No User was found");
    }

    const { accessToken, refreshToken } = generateToken(req.user);

    return res.status(200).json({
      message: "success",
      data: req.user,
      token: accessToken,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = auth;