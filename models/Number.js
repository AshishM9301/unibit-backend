const mongoose = require("mongoose");

const numberSchema = mongoose.Schema({
  number: {
    type: Number,
    unique: true,
  },
});

const TicketNumber = mongoose.model("TicketNumber", numberSchema);

module.exports = TicketNumber;
