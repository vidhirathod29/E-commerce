const Joi = require('joi');

module.exports = {
  addCartValidation: Joi.object({
    product_id: Joi.number().empty().required().messages({
      'number.base': 'Product id should be type of number',
      'number.empty': 'Product id should not be empty',
      'any.required': 'Product id is a required field',
    }),

    quantity: Joi.number().empty().required().messages({
      'number.base': 'Quantity should be type of number',
      'number.empty': 'Quantity should not be empty',
      'any.required': 'Quantity is a required field',
    }),
  }),

  updateCartValidation: Joi.object({
    quantity: Joi.number().optional().messages({
      'number.base': 'Quantity should be type of number',
    }),
  }),

  viewCartValidation: Joi.object({
    page: Joi.number().optional().messages({
      'number.base': 'page should be type of a number',
    }),
    pageSize: Joi.number().optional().messages({
      'number.base': 'pageSize should be type of a number',
    }),
  }),
};
