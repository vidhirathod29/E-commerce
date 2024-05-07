const Joi = require('joi');

module.exports = {
  orderReportValidation: Joi.object({
    id: Joi.number().optional().messages({
      'number.base': 'Order id should be a number',
    }),
    user_id: Joi.number().optional().messages({
      'number.base': 'User id should be a number',
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
    id: Joi.number().optional().messages({
      'number.base': 'Product id should be a number',
    }),
    user_id: Joi.number().optional().messages({
      'number.base': 'User id should be a number',
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
};
