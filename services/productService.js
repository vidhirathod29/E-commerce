const db = require('../models/db');
const product = db.productModel;
const productImage = db.productImageModel;
const user = db.authModel;
const category = db.categoryModel;
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { GeneralResponse } = require('../utils/response');
const { Messages } = require('../utils/messages');
const { GeneralError } = require('../utils/error');
const logger = require('../logger/logger');
const { listData, addImages, filter } = require('../helper/dbService');

const addProduct = async (req, res, next) => {
  const userId = req.user.id;

  const {
    category_id,
    product_name,
    price,
    product_description,
    product_quantity,
    images,
  } = req.body;

  const productData = {
    user_id: userId,
    category_id,
    product_name,
    price,
    product_description,
    product_quantity,
  };

  const addProduct = await product.create(productData);

  if (images && images.length > 0) {
    await addImages(addProduct.id, images);
  }

  if (addProduct) {
    logger.info(`Product ${Messages.ADD_SUCCESS}`);
    next(
      new GeneralResponse(
        `Product ${Messages.ADD_SUCCESS}`,
        StatusCodes.OK,
        undefined,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const findId = await product.findOne({ where: { id } });

  const { product_name, price, product_description, product_quantity, images } =
    req.body;

  const updateProductData = {
    product_name,
    price,
    product_description,
    product_quantity,
    images,
  };

  if (findId) {
    const updateProduct = await product.update(updateProductData, {
      where: { id },
    });

    if (images && images.length > 0) {
      await productImage.destroy({ where: { product_id: id } });
      await addImages(id, images);
    }

    if (updateProduct) {
      logger.info(`Product ${Messages.UPDATE_SUCCESS}`);
      next(
        new GeneralResponse(
          `Product ${Messages.UPDATE_SUCCESS}`,
          StatusCodes.ACCEPTED,
          undefined,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    }
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

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const findId = product.findOne({ where: { id } });

  if (findId) {
    const deleteProduct = await product.update(
      { is_deleted: true },
      { where: { id } },
    );

    if (deleteProduct) {
      logger.info(`Product ${Messages.DELETE_SUCCESS}`);
      next(
        new GeneralResponse(
          `Product ${Messages.DELETE_SUCCESS}`,
          StatusCodes.OK,
          undefined,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    }
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

const deleteProductImage = async (req, res, next) => {
  const id = req.params.id;
  const findId = productImage.findOne({ where: { id } });

  if (findId) {
    const deleteProduct = await productImage.update(
      { status: true },
      { where: { id } },
    );

    if (deleteProduct) {
      logger.info(`Product image ${Messages.DELETE_SUCCESS}`);
      next(
        new GeneralResponse(
          `Product image ${Messages.DELETE_SUCCESS}`,
          StatusCodes.OK,
          undefined,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    }
  } else {
    logger.error(`Product image ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `Product image ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }
};

const productList = async (req, res, next) => {
  const { condition, pageSize, page } = req.body;
  let whereCondition = await filter({ is_deleted: 0 }, condition);

  const listOfProducts = await listData(
    product,
    ['id', 'user_id', 'category_id', 'product_name', 'price'],
    whereCondition,
    [
      {
        model: user,
        attributes: ['name'],
        where: {
          is_deleted: 0,
        },
      },
      {
        model: category,
        attributes: ['id', 'category_name'],
        where: {
          is_deleted: 0,
        },
      },
      {
        model: productImage,
        attributes: ['id', 'product_image'],
        where: {
          status: 0,
        },
        required: false,
      },
    ],
    page,
    pageSize,
  );

  if (listOfProducts) {
    logger.info(`Product ${Messages.GET_SUCCESS}`);
    next(
      new GeneralError(
        undefined,
        StatusCodes.OK,
        listOfProducts,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  productList,
};