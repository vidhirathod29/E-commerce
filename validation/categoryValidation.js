const Joi = require('joi');

module.exports = {
  addCategoryValidation: Joi.object({
    category_name: Joi.string().empty().max(50).required().messages({
      'string.base': 'Category name should be type of string',
      'string.empty': 'Category name should not be empty',
      'string.max': 'Category name should have maximum length of 50',
      'any.required': 'Category name is a required field',
    }),
    category_description: Joi.string().optional().messages({
      'string.base': 'Category description should be type of string',
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
};
