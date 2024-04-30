const nodemailer = require('nodemailer');
const logger = require('../logger/logger');

const transport = nodemailer.createTransport({
  service: 'Gmail',
  secure: false,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.SENDER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendOtp = (email, otp) => {
  const mailOptions = {
    from: process.env.SENDER_MAIL,
    to: email,
    subject: 'Your OTP for forgot password',
    text: `Your OTP for forgot password is ${otp}`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error('Error occurred while sending email: ', error);
      throw new Error('Error occur while sending email.');
    } else {
      logger.info('Email has been sent: ', info.response);
    }
  });
};

module.exports = {
  sendOtp,
};