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
});

module.exports = { listOfDataValidation };
