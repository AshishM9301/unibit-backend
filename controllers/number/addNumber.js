const createHttpError = require("http-errors");
const TicketNumber = require("../../models/Number");
const Ticket = require("../../models/Ticket");

const addNumber = async (req, res, next) => {
  try {
    for (let i = 1; i < 91; i++) {
      const checkNumber = await TicketNumber.findOne({ number: i });

      if (checkNumber) {
        throw createHttpError.Unauthorized("Alreday Registered Number");
      }

      const newNumber = new TicketNumber({
        number: i,
      });

      await newNumber.save();
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = addNumber;
