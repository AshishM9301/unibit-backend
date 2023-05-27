const login = require("./auth/login");
const register = require("./auth/register");
const auth = require("./auth/auth");

const allTicket = require("./ticket/allTicket");
const addNumber = require("./number/addNumber");
const addTicket = require("./ticket/addTicket");

module.exports = {
  allTicket,
  login,
  register,
  auth,
  addNumber,
  addTicket,
};
