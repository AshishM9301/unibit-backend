const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");

const ContactMech = require("../../models/ContactMech");
const User = require("../../models/User");

const generateToken = require("../../services/token");


const register = async (req, res, next) => {
  const { firstName, lastName, email, password, userPic } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const checkEmail = await ContactMech.findOne({ email });

    if (checkEmail) {
      throw createHttpError.Unauthorized("Already Registered");
    }

    const newMech = new ContactMech({
      email,
    });

    await newMech.save();

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const response = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    };

    const { accessToken, refreshToken } = generateToken(response);

    // sendEmail(
    //   [email],
    //   "Registration Verification",
    //   verifyMail({ firstName, lastName, accessToken })
    // );

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

module.exports = register;