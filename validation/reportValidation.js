const Joi = require('joi');

module.exports = {
  orderReportValidation: Joi.object({
    user_name: Joi.string().optional().messages({
      'string.base': 'User id should be a string',
    }),
    orderStatus: Joi.string().optional().messages({
      'string.base': 'Order status should be a string',
    }),
    startDate: Joi.date().optional().messages({
      'date.base': 'Start date should be a date',
    }),
    endDate: Joi.date().optional().messages({
      'date.base': 'Start date should be a date',
    }),
  }),

  productReportValidation: Joi.object({
    user_name: Joi.string().optional().messages({
      'string.base': 'User id should be a string',
    }),
    product_name: Joi.string().optional().messages({
      'string.base': 'Order status should be a string',
    }),
    price: Joi.number().optional().messages({
      'number.base': 'Order status should be a number',
    }),
    startDate: Joi.date().optional().messages({
      'date.base': 'Start date should be a date',
    }),
    endDate: Joi.date().optional().messages({
      'date.base': 'Start date should be a date',
    }),
  }),
};
