const db = require('../models/db');
const product = db.productModel;
const productImage = db.productImageModel;
const user = db.authModel;
const order = db.orderModel;
const orderProduct = db.order_productModel;
const address = db.addressModel;
const country = db.countryModel;
const state = db.stateModel;
const city = db.cityModel;
const category = db.categoryModel;
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { Messages } = require('../utils/messages');
const { GeneralError } = require('../utils/error');
const logger = require('../logger/logger');
const { orderFilter, productFilter } = require('../helper/serviceLayer');

const orderReport = async (req, res, next) => {
  const { id, user_name, orderStatus, startDate, endDate } = req.body;

  console.log('req.body====', req.body);
  let whereCondition = await orderFilter(
    id,
    user_name,
    orderStatus,
    startDate,
    endDate,
  );

  console.log('whereCondition====', whereCondition);

  const orderReport = await order.findAll({
    attributes: ['id', 'total_amount', 'status'],
    where: {
      is_deleted: false,
      ...whereCondition,
    },
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

  console.log('orderReport==', orderReport);

  if (orderReport) {
    logger.info(`Order ${Messages.GET_SUCCESS}`);
    next(
      new GeneralError(
        undefined,
        StatusCodes.OK,
        orderReport,
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

const productOrder = async (req, res, next) => {
  const { id, user_name, product_name, price, startDate, endDate } = req.body;

  console.log('req.body==', req.body);

  let whereCondition = await productFilter(
    id,
    user_name,
    product_name,
    price,
    startDate,
    endDate,
  );

  console.log('whereCondition==', whereCondition);

  const productOrder = await product.findAll({
    attributes: [
      'id',
      'user_id',
      'category_id',
      'product_name',
      'price',
      'product_quantity',
    ],
    where: {
      is_deleted: false,
      ...whereCondition,
    },
    include: [
      {
        model: user,
        attributes: ['name', 'email'],
        where: {
          is_deleted: false,
        },
      },
      {
        model: category,
        attributes: ['id', 'category_name'],
        where: {
          is_deleted: false,
        },
      },
      {
        model: productImage,
        attributes: ['id', 'product_image'],
        required: false,
      },
    ],
  });

  console.log('productOrder==', productOrder);

  if (productOrder) {
    logger.info(`Product ${Messages.GET_SUCCESS}`);
    next(
      new GeneralError(
        undefined,
        StatusCodes.OK,
        productOrder,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  } else {
    logger.error(`Product ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `Product ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

module.exports = { orderReport, productOrder };
