const db = require('../models/db');

const listData = async (
  model,
  attributes = [],
  where,
  include = [],
  order,
  page = 1,
  pageSize = 3,
) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const data = await model.findAndCountAll({
    attributes: attributes.length > 0 ? attributes : undefined,
    where: Object.keys(where).length > 0 ? where : undefined,
    include: include.length > 0 ? include : undefined,
    order: order.length > 0 ? order : [['id', 'DESC']],
    offset,
    limit,
  });

  const totalCount = data.count;
  const totalPages = Math.ceil(totalCount / pageSize);
  const nextPage = page < totalPages ? page + 1 : null;

  return {
    totalCount,
    totalPages,
    currentPage: page,
    nextPage,
    data: data.rows,
  };
};

const bulkCreate = async (model, attributes = []) => {
  const records = await model.bulkCreate(attributes);
  return records;
};

const filter = async (condition, payload) => {
  if (!payload) {
    return condition;
  }

  const where = { ...condition };

  Object.keys(payload).forEach((key) => {
    if (payload[key]) {
      where[key] = payload[key];
    }
  });

  return where;
};

const orderArrayFunction = (order) => {
  const orderArray = [];
  
  if (order && order.length === 2) {
    const fields = order[0].split('.');

    if (fields.length > 1) {
      const modelName = fields[0];
      const keyName = fields[1];

      const model = modelMap[modelName];

      if (model) {
        orderArray.push([{ model, as: modelName }, keyName, order[1]]);
      } else {
        orderArray.push([order[0], order[1]]);
      }
    } else {
      orderArray.push([order[0], order[1]]);
    }
  }

  return orderArray;
};


const searchData = (search, searchFields) => {
  const queryList = [];

  if (search && search.length > 0) {
    searchFields.forEach((searchField) => {
      const qry = {};
      if (searchField.includes('.')) {
        const [model, field] = searchField.split('.');
        qry[`$${model}.${field}$`] = { [db.Op.like]: `%${search}%` };
      } else {
        qry[searchField] = { [db.Op.like]: `%${search}%` };
      }
      queryList.push(qry);
    });
  }

  return queryList;
};

module.exports = {
  listData,
  bulkCreate,
  filter,
  orderArrayFunction,
  searchData,
};
