const { Sequelize } = require('sequelize');
const db = require('../models/db');
const user = db.authModel;
const cart = db.cartModel;
const product = db.productModel;
const productImage = db.productImageModel;
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { GeneralResponse } = require('../utils/response');
const { Messages } = require('../utils/messages');
const { GeneralError } = require('../utils/error');
const logger = require('../logger/logger');
const { listData } = require('../helper/dbService');

const addCart = async (req, res, next) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  const cartData = {
    user_id: userId,
    product_id,
    quantity,
  };

  const findProduct = await product.findOne({
    where: { id: product_id, is_deleted: false },
    attributes: ['id', 'product_quantity'],
  });

  if (
    !findProduct ||
    findProduct.product_quantity === 0 ||
    findProduct.product_quantity < cartData.quantity
  ) {
    logger.error(`Product ${Messages.OUT_OF_STOCK}`);
    next(
      new GeneralError(
        `Product ${Messages.OUT_OF_STOCK}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }

  const existingCart = await cart.findOne({
    where: {
      user_id: userId,
      product_id,
      is_deleted: false,
    },
  });

  if (existingCart) {
    const updatedQuantity = existingCart.quantity + cartData.quantity;
    await cart.update(
      { quantity: updatedQuantity },
      {
        where: { id: existingCart.id },
      },
    );
    logger.info(`Cart ${Messages.ADD_SUCCESS}`);
    next(
      new GeneralResponse(
        `Cart ${Messages.ADD_SUCCESS}`,
        StatusCodes.OK,
        undefined,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  } else {
    const addCart = await cart.create(cartData);

    if (addCart) {
      logger.info(`Cart ${Messages.ADD_SUCCESS}`);
      next(
        new GeneralResponse(
          `Cart ${Messages.ADD_SUCCESS}`,
          StatusCodes.OK,
          undefined,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    }
  }
};

const updateCart = async (req, res, next) => {
  const id = req.params.id;

  const findCart = await cart.findOne({ where: { id, is_deleted: false } });

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

  if (Object.keys(req.body).length === 0) {
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

  let { quantity } = req.body;

  const product_id = findCart.product_id;
  const updateCart = { product_id, quantity };

  const quantityCheck = await product.findOne({
    where: { id: updateCart.product_id, is_deleted: false },
    attributes: ['product_quantity'],
  });

  if (
    !quantityCheck ||
    quantityCheck.product_quantity === 0 ||
    quantityCheck.product_quantity < updateCart.quantity
  ) {
    logger.error(`Product ${Messages.OUT_OF_STOCK}`);
    next(
      new GeneralError(
        `Product ${Messages.OUT_OF_STOCK}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }

  const updatedCart = await cart.update(updateCart, { where: { id } });

  if (updatedCart) {
    logger.info(`Cart data ${Messages.UPDATE_SUCCESS}`);
    next(
      new GeneralResponse(
        `Cart data ${Messages.UPDATE_SUCCESS}`,
        StatusCodes.ACCEPTED,
        undefined,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const deleteCart = async (req, res, next) => {
  const id = req.params.id;
  const findCart = await cart.findOne({ where: { id, is_deleted: false } });

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

  const deleteCart = await cart.update({ is_deleted: true }, { where: { id } });

  if (deleteCart) {
    logger.info(`Cart  ${Messages.DELETE_SUCCESS}`);
    next(
      new GeneralResponse(
        `Cart  ${Messages.DELETE_SUCCESS}`,
        StatusCodes.OK,
        undefined,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const viewCart = async (req, res, next) => {
  const { pageSize, page } = req.body;

  const viewCart = await listData(
    cart,
    [
      'user_id',
      'product_id',
      'quantity',
      [Sequelize.literal('quantity * price'), 'Total'],
    ],
    { is_deleted: false },
    [
      {
        model: user,
        attributes: ['name'],
        where: {
          is_deleted: 0,
        },
      },
      {
        model: product,
        attributes: ['id', 'product_name', 'price'],
        where: {
          is_deleted: 0,
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
    page,
    pageSize,
  );

  const cartData = viewCart.data.map((cartItem) => {
    const { product, quantity } = cartItem;
    const total = quantity * product.price;
    return total;
  });

  const grandTotal = cartData.reduce((acc, item) => acc + item, 0);

  const finalCart = {
    data: viewCart,
    grandTotal,
  };

  if (finalCart) {
    logger.info(`Cart ${Messages.GET_SUCCESS}`);
    next(
      new GeneralError(
        undefined,
        StatusCodes.OK,
        finalCart,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

module.exports = { addCart, updateCart, deleteCart, viewCart };
