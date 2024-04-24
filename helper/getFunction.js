const commonListFunction = async (model, attributes = [], include = []) => {
  return model.findAll({
    attributes: attributes.length > 0 ? attributes : undefined,
    include: include.length > 0 ? include : undefined,
  });
};

module.exports = { commonListFunction };