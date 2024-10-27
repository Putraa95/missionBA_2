const nodemailer = require("nodemailer");

exports.sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verifikasi Email",
    text: `Klik link berikut untuk verifikasi email: ${process.env.BASE_URL}/verify-email?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
};
