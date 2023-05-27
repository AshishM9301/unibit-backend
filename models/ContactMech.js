const mongoose = require("mongoose");

const contactMechSchema = mongoose.Schema({
  email: {
    type: String,
  },
});

const ContactMech = mongoose.model("ContactMech", contactMechSchema);

module.exports = ContactMech;