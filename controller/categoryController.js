const {
  addUpdateCategory,
  deleteCategory,
  listOfCategory,
} = require('../service/categoryService');

module.exports = {
  addUpdateCategoryController: (req, res, next) => {
    return addUpdateCategory(req, res, next);
  },

  deleteCategoryController: (req, res, next) => {
    return deleteCategory(req, res, next);
  },

  listOfCategoryController: (req, res, next) => {
    return listOfCategory(req, res, next);
  },
};