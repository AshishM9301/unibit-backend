const Ticket = require("../../models/Ticket");

const allTicket = async (req, res, next) => {
  try {
    const data = await Ticket.aggregate([{ $match: {} }]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = allTicket;
