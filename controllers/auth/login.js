const bcrypt = require("bcrypt");

const ContactMech = require("../../models/ContactMech");
const VerifiedUser = require("../../models/VerifiedUser");
const generateToken = require("../../services/token");
const createHttpError = require("http-errors");
const User = require("../../models/User");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const checkEmail = await ContactMech.findOne({ email });

    // const checkUser = await VerifiedUser.findOne({ email });

    
    const checkUser = await User.findOne({ email });
    
    
    if (!checkEmail || !checkUser) {
      throw createHttpError.Unauthorized("Not Registered");
    }
  
    const checkPass = await bcrypt.compare(password, checkUser?.password);

    if (!checkPass) {
      throw createHttpError.Unauthorized("Password is Wrong");
    }

    const response = {
      _id: checkUser._id,
      firstName: checkUser.firstName,
      lastName: checkUser.lastName,
      email: checkUser.email,
      role: checkUser.role,
    };

    const { accessToken, refreshToken } = generateToken(response);

    res.status(200).json({
      success: true,
      data: response,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = login;