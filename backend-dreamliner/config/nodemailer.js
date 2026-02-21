const nodemailer = require("nodemailer");
const { logger } = require("./logger");

// Buat transporter untuk mengirim email menggunakan Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Test koneksi transporter
// transporter.verify((error, success) => {
//   if (error) {
//     logger.error("Nodemailer Connection Error", {
//       error: error.message,
//       stack: error.stack,
//     });
//   } else {
//     logger.info("Nodemailer is ready to send emails");
//   }
// });

module.exports = {
  transporter,
};
