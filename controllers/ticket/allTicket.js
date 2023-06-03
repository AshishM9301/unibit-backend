const Ticket = require("../../models/Ticket");

const allTicket = async (req, res, next) => {
  try {
    const data = await Ticket.aggregate([
      {
        $match: {},
      },
      {
        $project: {
          _id: "$_id",
          ticket: {
            $function: {
              body: function (first_row, second_row, third_row) {
                return [
                  JSON.stringify(first_row),
                  JSON.stringify(second_row),
                  JSON.stringify(third_row),
                ];
              },
              args: ["$first_row", "$second_row", "$third_row"],
              lang: "js",
            },
          },
        },
      },
    ]);

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
