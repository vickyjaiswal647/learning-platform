const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "boostmindgame",
    pass: "Boostmind@041826",
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

module.exports = {
  transporter: transporter,
};
