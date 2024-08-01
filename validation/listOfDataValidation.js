const Joi = require('joi');

const listOfDataValidation = Joi.object({
  condition: Joi.object().optional().messages({
    'object.base': 'Condition should be type of an object',
  }),
  page: Joi.number().optional().messages({
    'number.base': 'page should be type of a number',
  }),
  pageSize: Joi.number().optional().messages({
    'number.base': 'pageSize should be type of a number',
  }),
  search: Joi.string().optional().messages({
    'string.base': 'Search should be type of a string',
  }),
  order: Joi.array().optional().messages({
    'array.base': 'Product image should be type of array',
  }),
});

module.exports = { listOfDataValidation };
