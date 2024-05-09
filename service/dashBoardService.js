const db = require('../models/db');
const user = db.authModel;
const order = db.orderModel;
const product = db.productModel;
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { Messages } = require('../utils/messages');
const { GeneralError } = require('../utils/error');
const logger = require('../logger/logger');
const { ROLES, STATUS } = require('../utils/enum');

const countOfUser = async (req, res, next) => {
  const adminCount = await user.count({
    where: {
      role: ROLES.ADMIN,
      is_deleted: false,
    },
  });

  const customerCount = await user.count({
    where: {
      role: ROLES.CUSTOMER,
      is_deleted: false,
    },
  });

  const count = {
    admin: adminCount,
    customer: customerCount,
  };

  logger.info(`User ${Messages.GET_SUCCESS}`);
  next(
    new GeneralError(
      undefined,
      StatusCodes.OK,
      count,
      RESPONSE_STATUS.SUCCESS,
    ),
  );
};

const countOfOrderStatus = async (req, res, next) => {
  const pendingCount = await order.count({
    where: {
      status: STATUS.PENDING,
    },
  });

  const deliverCount = await order.count({
    where: {
      status: STATUS.DELIVER,
    },
  });

  const confirmCount = await order.count({
    where: {
      status: STATUS.CONFIRMED,
    },
  });

  const rejectCount = await order.count({
    where: {
      status: STATUS.REJECT,
    },
  });

  const approveCount = await order.count({
    where: {
      status: STATUS.APPROVED,
    },
  });

  const count = {
    totalPendingOrder: pendingCount,
    totalDeliverOrder: deliverCount,
    totalConfirmOrder: confirmCount,
    totalRejectOrder: rejectCount,
    totalApproveOrder: approveCount,
  };

  logger.info(`Order ${Messages.GET_SUCCESS}`);
  next(
    new GeneralError(
      undefined,
      StatusCodes.OK,
      count,
      RESPONSE_STATUS.SUCCESS,
    ),
  );
};

const countOfTOtalOrder = async (req, res, next) => {
  const productCount = await order.count({
    where: {
      is_deleted: false,
    },
  });

  logger.info(`Order ${Messages.GET_SUCCESS}`);
  next(
    new GeneralError(
      undefined,
      StatusCodes.OK,
      productCount,
      RESPONSE_STATUS.SUCCESS,
    ),
  );
};

const countOfTOtalProducts = async (req, res, next) => {
  const productCount = await product.count({
    where: {
      is_deleted: false,
    },
  });

  logger.info(`Products ${Messages.GET_SUCCESS}`);
  next(
    new GeneralError(
      undefined,
      StatusCodes.OK,
      productCount,
      RESPONSE_STATUS.SUCCESS,
    ),
  );
};

module.exports = {
  countOfUser,
  countOfOrderStatus,
  countOfTOtalProducts,
  countOfTOtalOrder,
};
