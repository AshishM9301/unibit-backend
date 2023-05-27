const nodemailer = require("nodemailer");
const config = require("../config");

const sendEmail = async (email, subject, template, ccRecipients) => {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.gmail.user,
      pass: config.gmail.pass,
    },
  });

  let mailDetails = {
    from: "ghostasbhoot@gmail.com",
    to: email,
    subject: subject,
    html: template,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent successfully", info);
    }
  });
};

module.exports = sendEmail;