const db = require('../models/db');
const user = db.authModel;
const wishlist = db.wishlistModel;
const product = db.productModel;
const productImage = db.productImageModel;
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { GeneralResponse } = require('../utils/response');
const { Messages } = require('../utils/messages');
const { GeneralError } = require('../utils/error');
const logger = require('../logger/logger');
const { listData } = require('../helper/dbService');

const addWishlist = async (req, res, next) => {
  const userId = req.user.id;
  const { product_id } = req.body;

  const newWishlist = {
    user_id: userId,
    product_id,
  };

  const existWishlist = await wishlist.findOne({
    where: {
      user_id: userId,
      product_id,
    },
  });

  if (existWishlist) {
    logger.error(`Wishlist ${Messages.ALREADY_EXIST}`);
    next(
      new GeneralError(
        `Wishlist ${Messages.ALREADY_EXIST}`,
        StatusCodes.CONFLICT,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  } else {
    const createdWishlist = await wishlist.create(newWishlist);

    if (createdWishlist) {
      logger.info(`Wishlist ${Messages.ADD_SUCCESS}`);
      next(
        new GeneralResponse(
          `Wishlist ${Messages.ADD_SUCCESS}`,
          StatusCodes.OK,
          undefined,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    }
  }
};

const deleteWishlist = async (req, res, next) => {
  const id = req.params.id;
  const findWishlist = await wishlist.findOne({ where: { id } });

  if (!findWishlist) {
    logger.error(`Wishlist ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `Wishlist ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  }

  const deleteWishlist = await wishlist.destroy({ where: { id } });

  if (deleteWishlist) {
    logger.info(`Wishlist ${Messages.DELETE_SUCCESS}`);
    next(
      new GeneralResponse(
        `Wishlist ${Messages.DELETE_SUCCESS}`,
        StatusCodes.OK,
        undefined,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

const listOfWishlist = async (req, res, next) => {
  const { pageSize, page } = req.body;

  const listOfWishlist = await listData(
    wishlist,
    ['id', 'user_id', 'product_id'],
    {},
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

  if (listOfWishlist) {
    logger.info(`Wishlist ${Messages.GET_SUCCESS}`);
    next(
      new GeneralError(
        undefined,
        StatusCodes.OK,
        listOfWishlist,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

module.exports = { addWishlist, deleteWishlist, listOfWishlist };
