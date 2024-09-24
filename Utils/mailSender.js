// utils/mailSender.js
import nodemailer from "nodemailer"
export const mailSender = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: false, // Use SSL
      requireTLS: true,
      auth: {
          user: process.env.SMPT_MAIL,
          pass: process.env.SMPT_APP_PASS,
      },
      authMethod: 'LOGIN', // Specify the authentication method
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.to,
        subject: options.subject,
        html: options.message,
    };

  await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};
