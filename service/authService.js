const db = require('../models/db');
const auth = db.authModel;
const otpModel = db.otpModel;
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { GeneralResponse } = require('../utils/response');
const { Messages } = require('../utils/messages');
const { GeneralError } = require('../utils/error');
const bcrypt = require('bcrypt');
const logger = require('../logger/logger');
const { sendOtp } = require('../middleware/mail');
const moment = require('moment');

const resetPassword = async (req, res, next) => {
  const email = req.user.email;
  const { oldPassword, newPassword } = req.body;
  const findUser = await auth.findOne({ where: { email } });
  if (!findUser) {
    logger.error(`User ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `User ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
  const comparePassword = await bcrypt.compare(oldPassword, findUser.password);
  if (!comparePassword) {
    logger.error(Messages.INVALID_OLD_PASS);
    next(
      new GeneralError(
        Messages.INVALID_OLD_PASS,
        StatusCodes.BAD_REQUEST,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
  const generatedPassword = await bcrypt.hash(newPassword, 10);
  const resetUserPassword = await auth.update(
    { password: generatedPassword },
    { where: { email } },
  );

  if (resetUserPassword) {
    logger.info(Messages.PASS_RESET_SUCCESS);
    next(
      new GeneralResponse(
        Messages.PASS_RESET_SUCCESS,
        StatusCodes.OK,
        undefined,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const verifyEmail = async (req, res, next) => {
  const email = req.body.email;
  const findUser = await auth.findOne({ where: { email } });
  if (!findUser) {
    logger.error(`User ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `User ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }

  const generateOtp = Math.floor(100000 + Math.random() * 900000);
  const expireTime = moment().add(2, 'minute').format();
  const otpData = { email, otp: generateOtp, expireTime };
  const otpGeneration = await otpModel.create(otpData);
  sendOtp(email, generateOtp);

  if (!otpGeneration) {
    next(
      new GeneralError(
        Messages.OTP_GENERATE_FAIL,
        StatusCodes.BAD_REQUEST,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  } else {
    next(
      new GeneralError(
        Messages.OTP_SENT_SUCCESS,
        StatusCodes.OK,
        generateOtp,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const updatePassword = async (req, res, next) => {
  const { email, otp, newPassword } = req.body;
  const findOtp = await otpModel.findOne({
    where: { email, otp },
  });

  if (!findOtp) {
    logger.error(Messages.INVALID_OTP);
    next(
      new GeneralError(
        Messages.INVALID_OTP,
        StatusCodes.BAD_REQUEST,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
  const currentTime = moment().format('x');
  const otpValidTime = moment(findOtp.expireTime).format('x');

  if (otpValidTime <= currentTime) {
    logger.error(Messages.OTP_EXPIRE);
    next(
      new GeneralError(
        Messages.OTP_EXPIRE,
        StatusCodes.BAD_REQUEST,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  const updatedPassword = await auth.update(
    { password: hashPassword },
    { where: { email } },
  );

  if (updatedPassword) {
    await otpModel.destroy({ where: { otp } });
    logger.info(`Password ${Messages.UPDATE_SUCCESS}`);
    next(
      new GeneralResponse(
        `Password ${Messages.UPDATE_SUCCESS}`,
        StatusCodes.OK,
        undefined,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

module.exports = {
  resetPassword,
  verifyEmail,
  updatePassword,
};