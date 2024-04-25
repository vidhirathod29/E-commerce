const {
  addUpdateCategory,
  deleteCategory,
  listOfCategory,
} = require('../service/categoryService');

module.exports = {
  addUpdateCategory: async (req, res, next) => {
    await addUpdateCategory(req, res, next);
  },
  deleteCategory: async (req, res, next) => {
    await deleteCategory(req, res, next);
  },
  listOfCategory: async (req, res, next) => {
    await listOfCategory(req, res, next);
  },
};