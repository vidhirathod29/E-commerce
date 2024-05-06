const db = require('../models/db');
const user = db.authModel;
const country = db.countryModel;
const state = db.stateModel;
const city = db.cityModel;
const product = db.productModel;
const productImage = db.productImageModel;
const order = db.orderModel;
const orderProduct = db.order_productModel;
const address = db.addressModel;
const cart = db.cartModel;
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { GeneralResponse } = require('../utils/response');
const { Messages } = require('../utils/messages');
const { GeneralError } = require('../utils/error');
const logger = require('../logger/logger');
const { listData } = require('../helper/dbService');

const placeOrder = async (req, res, next) => {
  const id = req.user.id;
  const transaction = await db.sequelize.transaction();

  const findId = await user.findOne({ where: { id, is_deleted: false } });

  if (!findId) {
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
  const { cart_id, address_id, status } = req.body;

  const findCart = await cart.findOne({
    where: { id: cart_id, is_deleted: false },
    transaction,
  });

  if (!findCart) {
    logger.error(`Cart ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `Cart ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }

  const productId = findCart.dataValues.product_id;

  const findProduct = await product.findOne({
    where: { id: productId, is_deleted: false },
    transaction,
  });

  const findAddress = await address.findOne({
    where: { id: address_id, is_deleted: false },
    transaction,
  });

  if (!findAddress) {
    logger.error(`Address ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `Address ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }

  const grandTotal = findCart.quantity * findProduct.price;
  const newOrder = {
    user_id: id,
    address_id,
    total_amount: grandTotal,
    status,
  };
  const placedOrder = await order.create(newOrder, { transaction });

  await product.decrement('product_quantity', {
    by: findCart.quantity,
    where: { id: productId },
    transaction,
  });

  const newOrder_product = {
    product_id: productId,
    order_id: placedOrder.id,
    quantity: findCart.quantity,
  };

  await orderProduct.create(newOrder_product, {
    transaction,
  });

  await transaction.commit();

  logger.info(`Order ${Messages.ADD_SUCCESS}`);
  next(
    new GeneralResponse(
      `Order ${Messages.ADD_SUCCESS}`,
      StatusCodes.OK,
      undefined,
      RESPONSE_STATUS.SUCCESS,
    ),
  );
};

const updateOrderStatus = async (req, res, next) => {
  const id = req.params.id;
  const transaction = await db.sequelize.transaction();

  const findOrder = await order.findOne({ where: { id, is_deleted: false } });

  const findOrderProduct = await orderProduct.findOne({
    where: { order_id: id },
    transaction,
  });

  if (!findOrder) {
    logger.error(`Order ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `Order ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }

  const { status } = req.body;
  const updateStatus = { status };

  const updatedStatus = await order.update(updateStatus, {
    where: { id, is_deleted: false },
    transaction,
  });

  if (status == 'Reject') {
    const rejectOrder = await order.update(
      { is_deleted: true },
      { where: { id }, transaction },
    );

    const rejectOrderProduct = await orderProduct.update(
      { is_deleted: true },
      { where: { order_id: id }, transaction },
    );

    if (rejectOrder && rejectOrderProduct) {
      logger.info(`Order ${Messages.DELETE_SUCCESS}`);
      next(
        new GeneralResponse(
          `Order ${Messages.DELETE_SUCCESS}`,
          StatusCodes.OK,
          undefined,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    }
    await product.increment('product_quantity', {
      by: findOrderProduct.quantity,
      where: { id: findOrderProduct.product_id },
      transaction,
    });
  }

  await transaction.commit();

  if (updatedStatus) {
    logger.info(`Order status ${Messages.UPDATE_SUCCESS}`);
    next(
      new GeneralResponse(
        `Order status ${Messages.UPDATE_SUCCESS}`,
        StatusCodes.ACCEPTED,
        undefined,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const cancelOrder = async (req, res, next) => {
  const id = req.params.id;
  const transaction = await db.sequelize.transaction();

  const findOrder = await order.findOne({
    where: { id, is_deleted: false },
    transaction,
  });

  if (!findOrder) {
    logger.error(`Order ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `Order ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }

  const cancelOrder = await order.update(
    { is_deleted: true, status: 'Reject' },
    { where: { id }, transaction },
  );
  const cancelOrderProduct = await orderProduct.update(
    { is_deleted: true },
    { where: { order_id: id }, transaction },
  );

  await transaction.commit();

  if (cancelOrder && cancelOrderProduct) {
    logger.info(`Order ${Messages.DELETE_SUCCESS}`);
    next(
      new GeneralResponse(
        `Order ${Messages.DELETE_SUCCESS}`,
        StatusCodes.OK,
        undefined,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const listOfOrder = async (req, res, next) => {
  const { pageSize, page } = req.body;

  const listOfOrder = await listData(
    order,
    ['id', 'total_amount'],
    { is_deleted: false },
    [
      {
        model: user,
        attributes: ['name'],
        where: {
          is_deleted: false,
        },
      },
      {
        model: address,
        attributes: ['address_line1', 'address_line2', 'zip_code'],
        where: {
          is_deleted: false,
        },
        include: [
          {
            model: country,
            attributes: ['id', 'country_name'],
          },
          {
            model: state,
            attributes: ['id', 'state_name'],
          },
          {
            model: city,
            attributes: ['id', 'city_name'],
          },
        ],
      },
    ],
    page,
    pageSize,
  );

  if (listOfOrder) {
    logger.info(`List of order ${Messages.GET_SUCCESS}`);
    next(
      new GeneralError(
        undefined,
        StatusCodes.OK,
        listOfOrder,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const viewOrder = async (req, res, next) => {
  const id = req.params.id;

  const viewOrder = await order.findOne({
    attributes: ['id', 'total_amount', 'status'],
    where: { id, is_deleted: false },
    include: [
      {
        model: user,
        attributes: ['name', 'email'],
        where: {
          is_deleted: false,
        },
      },
      {
        model: address,
        attributes: ['address_line1', 'address_line2', 'zip_code'],
        where: {
          is_deleted: false,
        },
        include: [
          {
            model: country,
            attributes: ['id', 'country_name'],
          },
          {
            model: state,
            attributes: ['id', 'state_name'],
          },
          {
            model: city,
            attributes: ['id', 'city_name'],
          },
        ],
      },
      {
        model: orderProduct,
        attributes: ['id', 'product_id', 'quantity'],
        where: {
          is_deleted: false,
        },
        include: [
          {
            model: product,
            attributes: ['id', 'product_name', 'price', 'product_description'],
            where: {
              is_deleted: false,
            },
            include: [
              {
                model: productImage,
                attributes: ['id', 'product_image'],
                where: {
                  status: true,
                },
                required: false,
              },
            ],
          },
        ],
      },
    ],
  });

  if (viewOrder) {
    logger.info(`Order ${Messages.GET_SUCCESS}`);
    next(
      new GeneralError(
        undefined,
        StatusCodes.OK,
        viewOrder,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  } else {
    logger.error(`Order ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `Order ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

module.exports = {
  placeOrder,
  updateOrderStatus,
  cancelOrder,
  listOfOrder,
  viewOrder,
};
