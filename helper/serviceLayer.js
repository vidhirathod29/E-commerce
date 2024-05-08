const moment = require('moment');
const { Op } = require('sequelize');

const orderFilter = async (user_name, orderStatus, startDate, endDate) => {
  let filter = {};

  if (user_name) {
    filter['$user.name$'] = { [Op.like]: `%${user_name}%` };
  }

  if (orderStatus) {
    filter['status'] = orderStatus;
  }

  if (startDate && endDate) {
    const orderStartDate = moment(startDate).format('YYYY-MM-DD');
    const orderEndDate = moment(endDate).format('YYYY-MM-DD');
    filter.created_at = { [Op.between]: [orderStartDate, orderEndDate] };
  } else if (startDate) {
    filter.created_at = { [Op.gte]: moment(startDate).format('YYYY-MM-DD') };
  } else if (endDate) {
    filter.created_at = { [Op.lte]: moment(endDate).format('YYYY-MM-DD') };
  }

  return filter;
};

const productFilter = async (
  user_name,
  product_name,
  price,
  startDate,
  endDate,
) => {
  let filter = {};

  if (user_name) {
    filter['$user.name$'] = { [Op.like]: `%${user_name}%` };
  }

  if (product_name) {
    filter['product_name'] = product_name;
  }

  if (price) {
    filter.price = price;
  }

  if (startDate && endDate) {
    const productStartDate = moment(startDate).format('YYYY-MM-DD');
    const productEndDate = moment(endDate).format('YYYY-MM-DD');
    filter.created_at = { [Op.between]: [productStartDate, productEndDate] };
  } else if (startDate) {
    filter.created_at = { [Op.gte]: moment(startDate).format('YYYY-MM-DD') };
  } else if (endDate) {
    filter.created_at = { [Op.lte]: moment(endDate).format('YYYY-MM-DD') };
  }

  return filter;
};

module.exports = { orderFilter, productFilter };
