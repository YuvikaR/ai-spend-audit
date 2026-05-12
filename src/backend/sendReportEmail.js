require('dotenv').config();

const nodemailer = require('nodemailer');

async function sendReportEmail({
  to,
  subject,
  htmlContent,
}) {
  try {
    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Mail settings
    const mailOptions = {
      from: process.env.EMAIL_USER,

      to,

      subject,

      html: htmlContent,
    };

    // Send email
    const info = await transporter.sendMail(
      mailOptions
    );

    console.log(
      'Email sent:',
      info.messageId
    );

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.log(
      'Email Error:',
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = sendReportEmail;