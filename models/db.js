const { Sequelize } = require('sequelize');
const { Messages } = require('../utils/messages');
const logger = require('../logger/logger');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER_NAME,
  '',
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
);

sequelize
  .authenticate()
  .then(() => {
    logger.info(Messages.DATABASE_CONNECTION);
  })
  .catch((err) => {
    logger.error(Messages.NO_DATABASE_CONNECTION);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.categoryModel = require('../models/category')(sequelize, Sequelize);
db.countryModel = require('../models/country')(sequelize, Sequelize);
db.stateModel = require('../models/state')(sequelize, Sequelize);
db.cityModel = require('../models/city')(sequelize, Sequelize);
db.authModel = require('../models/auth')(sequelize, Sequelize);
db.otpModel = require('../models/otp')(sequelize, Sequelize);
db.productModel = require('../models/product')(sequelize, Sequelize);
db.productImageModel = require('../models/product_image')(sequelize, Sequelize);

db.authModel.hasMany(db.categoryModel, { foreignKey: 'user_id' });
db.authModel.hasMany(db.productModel, { foreignKey: 'user_id' });

db.categoryModel.belongsTo(db.authModel, { foreignKey: 'user_id' });
db.categoryModel.hasMany(db.productModel, { foreignKey: 'category_id' });

db.productModel.belongsTo(db.authModel, { foreignKey: 'user_id' });
db.productModel.belongsTo(db.categoryModel, { foreignKey: 'category_id' });
db.productModel.hasMany(db.productImageModel, { foreignKey: 'product_id' });

db.productImageModel.belongsTo(db.productModel, { foreignKey: 'product_id' });

db.categoryModel = require('../models/category')(sequelize, Sequelize);

db.sequelize.sync().then(() => {
  logger.info('Re-sync');
});

module.exports = db;