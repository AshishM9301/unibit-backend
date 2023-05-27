const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  first_row: {
    type: Array,
    maxlength: 9,
  },
  second_row: {
    type: Array,
    maxlength: 9,
  },
  third_row: {
    type: Array,
    maxlength: 9,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
