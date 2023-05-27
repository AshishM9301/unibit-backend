const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 6,
  },
  token: {
    type: String,
    default: "",
  },
  tokenexp: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;