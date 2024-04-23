const db = require('../models/db');
const category = db.categoryModel;
const sequelize = db.sequelize;
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { GeneralResponse } = require('../utils/response');
const { Messages } = require('../utils/messages');
const { GeneralError } = require('../utils/error');

const addUpdateCategory = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  const { category_name, category_description } = req.body;
  const categoryData = {
    user_id: userId,
    category_name,
    category_description,
  };
  const updateData = {
    category_name,
    category_description,
  };

  if (id) {
    const findCategory = await category.findOne({ id });
    if (findCategory) {
      const updateCategory = await category.update(updateData, {
        where: { id },
      });
      if (updateCategory.length > 0) {
        logger.info(`Category ${Messages.UPDATE_SUCCESS}`);
        next(
          new GeneralResponse(
            `Category ${Messages.UPDATE_SUCCESS}`,
            StatusCodes.ACCEPTED,
            undefined,
            RESPONSE_STATUS.SUCCESS,
          ),
        );
      }
    } else {
      logger.error(`Category ${Messages.NOT_FOUND}`);
      next(
        new GeneralError(
          `Category ${Messages.NOT_FOUND}`,
          StatusCodes.NOT_FOUND,
          undefined,
          RESPONSE_STATUS.ERROR,
        ),
      );
    }
  } else {
    const createCategory = await category.create(categoryData);
    if (createCategory) {
      logger.info(`Category ${Messages.ADD_SUCCESS}`);
      next(
        new GeneralError(
          `Category ${Messages.ADD_SUCCESS}`,
          StatusCodes.OK,
          createCategory.id,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    }
  }
};

const deleteCategory = async (req, res, next) => {
  const id = req.params.id;
  const findCategory = await category.findOne({ where: { id } });

  if (!findCategory) {
    logger.error(`Category ${Messages.NOT_FOUND}`);
    next(
      new GeneralError(
        `Category ${Messages.NOT_FOUND}`,
        StatusCodes.NOT_FOUND,
        undefined,
        RESPONSE_STATUS.ERROR,
      ),
    );
  } else {
    const deleteCategoryData = await category.update(
      { is_deleted: true },
      { where: { id } },
    );
    if (deleteCategoryData) {
      logger.info(`Category ${Messages.DELETE_SUCCESS}`);
      next(
        new GeneralResponse(
          `Category ${Messages.DELETE_SUCCESS}`,
          StatusCodes.OK,
          undefined,
          RESPONSE_STATUS.SUCCESS,
        ),
      );
    }
  }
};

const listOfCategory = async (req, res, next) => {
  const { condition, pageSize } = req.body;
  let whereClause = { is_deleted: 0 };

  if (condition) {
    if (condition.id) {
      whereClause.id = condition.id;
    }
    if (condition.user_id) {
      whereClause.user_id = condition.user_id;
    }
    if (condition.category_name) {
      whereClause.category_name = condition.category_name;
    }
    if (condition.category_description) {
      whereClause.category_description = condition.category_description;
    }
  }

  const query = {};

  if (pageSize) {
    query.limit = parseInt(pageSize, 10);
  }
  const listOfCategories = await sequelize.query(
    'SELECT category.id,category.user_id ,category.category_name, category.category_description, users.name AS user_name FROM category LEFT JOIN users ON category.user_id = users.id WHERE category.is_deleted = 0',
    { type: sequelize.QueryTypes.SELECT },
  );

  if (listOfCategories) {
    logger.info(`Category ${Messages.GET_SUCCESS}`);
    next(
      new GeneralError(
        undefined,
        StatusCodes.OK,
        listOfCategories,
        RESPONSE_STATUS.SUCCESS,
      ),
    );
  }
};

module.exports = { addUpdateCategory, deleteCategory, listOfCategory };