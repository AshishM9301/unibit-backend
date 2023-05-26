require("dotenv").config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || "development",
    HOST: process.env.HOST || "127.0.0.1",
    PORT: process.env.PORT || 5000,
    DB: {
      URL: "mongodb://127.0.0.1:27017/unibit",
    },
    accessSecret:
      "",
    refreshSecret:
      '',
    google: {
      clientId:
        "",
      clientSecret: "",
    },
  };