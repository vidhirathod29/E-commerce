const db = require('../models/db');
const auth = db.authModel;
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { GeneralResponse } = require('../utils/response');
const { Messages } = require('../utils/messages');
const { GeneralError } = require('../utils/error');
const bcrypt = require('bcrypt');
const logger = require('../logger/logger');
const { generateToken } = require('../middleware/authentication');
const { sendOtp } = require('../middleware/mail');
const moment = require('moment');
const registration = async (req, res, next) => {
  const { name, email, phone_number, password, gender, role } = req.body;

  const existUser = await auth.findOne({ where: { email } });
  if (!existUser) {
    const encryptPassword = await bcrypt.hash(password, 10);
    const userData = {
      name,
      email,
      password: encryptPassword,
      phone_number,
      gender,
      profile_image: req.file.filename,
      role,
    };
    const registerUser = await auth.create(userData);

    if (registerUser) {
      logger.info(Messages.REGISTER_SUCCESS);
      next(
        new GeneralResponse(
          Messages.REGISTER_SUCCESS,
          StatusCodes.CREATED,
          undefined,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    }
  } else {
    logger.error(`User ${Messages.ALREADY_EXIST}`);
    next(
      new GeneralError(
        `User ${Messages.ALREADY_EXIST}`,
        StatusCodes.CONFLICT,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

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
  const comparePassword = await bcrypt.compare(password, findUser.password);

  if (!comparePassword) {
    logger.error(Messages.INCORRECT_CREDENTIAL);
    next(
      new GeneralError(
        Messages.INCORRECT_CREDENTIAL,
        StatusCodes.UNAUTHORIZED,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  } else {
    let token = generateToken({
      email,
      role: findUser.role,
      id: findUser.id,
    });
    logger.info(Messages.LOGIN_SUCCESS);
    next(
      new GeneralError(
        Messages.LOGIN_SUCCESS,
        StatusCodes.OK,
        token,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const updateProfile = async (req, res, next) => {
  const userEmail = req.user.email;
  const findUser = await auth.findOne({ where: { email: userEmail } });

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
  const { name, email, phone_number, gender } = req.body;
  const image = req.file.filename;
  const updateData = {
    name,
    email,
    phone_number,
    gender,
    profile_image: image,
  };

  if (Object.keys(updateData).length === 0) {
    logger.error(Messages.NO_VALID_FIELDS);
    next(
      new GeneralError(
        Messages.NO_VALID_FIELDS,
        StatusCodes.BAD_REQUEST,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
  const userUpdate = await auth.update(updateData, {
    where: { email: userEmail },
  });

  if (userUpdate) {
    logger.info(`User data ${Messages.UPDATE_SUCCESS}`);
    next(
      new GeneralResponse(
        `User data ${Messages.UPDATE_SUCCESS}`,
        StatusCodes.ACCEPTED,
        undefined,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const viewProfile = async (req, res, next) => {
  const email = req.user.email;
  const findUser = await auth.findOne({
    where: { email },
    attributes: {
      exclude: ['password', 'role', 'created_at', 'updated_at', 'is_deleted'],
    },
  });
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
  logger.info(`User ${Messages.GET_SUCCESS}`);
  next(
    new GeneralError(
      undefined,
      StatusCodes.OK,
      findUser,
      RESPONSE_STATUS.SUCCESS,
    ),
  );
};

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
  registration,
  login,
  updateProfile,
  viewProfile,
  resetPassword,
  verifyEmail,
  updatePassword,
};