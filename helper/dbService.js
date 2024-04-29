const db = require('../models/db');
const product_image = db.productImageModel;

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
    where: Object.keys(where).length > 0 ? where : {},
    include: include.length > 0 ? include : undefined,
    offset,
    limit,
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

async function addImages(product_id, images) {
  const image = images.map((image) => ({
    product_id,
    product_image: image,
    status: 'false',
  }));
  const createdImages = await product_image.bulkCreate(image);
  return createdImages;
}

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

module.exports = { listData, addImages, filter };