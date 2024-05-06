const db = require('../models/db');
<<<<<<< HEAD
const product_image = db.productImageModel;
=======
>>>>>>> 4af5d0c8151eda2029a53de1e56b4e4618313c11

const listData = async (
  model,
  attributes = [],
  where,
  include = [],
  page = 1,
  pageSize = 3,
) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const data = await model.findAndCountAll({
    attributes: attributes.length > 0 ? attributes : undefined,
    where: Object.keys(where).length > 0 ? where : undefined,
    include: include.length > 0 ? include : undefined,
    offset,
    limit,
    order: [['id', 'ASC']],
  });

  const totalCount = data.count;
  const totalPages = Math.ceil(totalCount / pageSize);
  const nextPage = page < totalPages ? page + 1 : null;

  return {
    totalCount,
    totalPages,
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

module.exports = { listData, bulkCreate, filter };
