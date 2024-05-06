const Joi = require('joi');

const listOfDataValidation = Joi.object({
  page: Joi.number().optional().messages({
    'number.base': 'page should be type of a number',
  }),
  pageSize: Joi.number().optional().messages({
    'number.base': 'pageSize should be type of a number',
  }),
});

module.exports = { listOfDataValidation };
