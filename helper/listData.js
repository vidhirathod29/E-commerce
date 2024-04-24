const listData = async (
  model,
  attributes = [],
  include = [],
  page = 1,
  pageSize = 3,
) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const data = await model.findAndCountAll({
    attributes: attributes.length > 0 ? attributes : undefined,
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

module.exports = { listData };