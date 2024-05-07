const { orderReport, productOrder } = require('../service/reportService');

module.exports = {
  orderReportController: (req, res, next) => {
    return orderReport(req, res, next);
  },

  productReportController: (req, res, next) => {
    return productOrder(req, res, next);
  },
};
