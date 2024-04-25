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
        StatusCodes.FORBIDDEN,
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
      password,
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

module.exports = {
  registration,
  login,
  updateProfile,
  viewProfile,
};
