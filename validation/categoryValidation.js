const Joi = require('joi');

module.exports = {
  addCategoryValidation: Joi.object({
    category_name: Joi.string().empty().max(50).required().messages({
      'string.base': 'Category name should be type of string',
      'string.empty': 'Category name should not be empty',
      'string.max': 'Category name should have maximum length of 50',
      'any.required': 'Category name is a required field',
    }),
    category_description: Joi.string().empty().required().messages({
      'string.base': 'Category description should be type of string',
      'string.empty': 'Category description should not be empty',
      'any.required': 'Category description is a required field',
    }),
  }),

  updateCategoryValidation: Joi.object({
    category_name: Joi.string().max(50).optional().messages({
      'string.base': 'Category name should be type of string',
      'string.max': 'Category name should have maximum length of 50',
    }),
    category_description: Joi.string().optional().messages({
      'string.base': 'Category description should be type of string',
    }),
  }),

  listOfCategoryValidation: Joi.object({
    condition: Joi.object().optional().messages({
      'object.base': 'Condition should be type of an object',
    }),
    page: Joi.number().optional().messages({
      'number.base': 'page should be type of a number',
    }),
    pageSize: Joi.number().optional().messages({
      'number.base': 'pageSize should be type of a number',
    }),
  }),
};