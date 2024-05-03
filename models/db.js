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
db.countryModel = require('../models/country')(sequelize, Sequelize);
db.stateModel = require('../models/state')(sequelize, Sequelize);
db.cityModel = require('../models/city')(sequelize, Sequelize);
db.authModel = require('../models/auth')(sequelize, Sequelize);
db.otpModel = require('../models/otp')(sequelize, Sequelize);
db.categoryModel = require('../models/category')(sequelize, Sequelize);
db.addressModel = require('../models/address')(sequelize, Sequelize);

db.authModel.hasMany(db.addressModel, { foreignKey: 'user_id' });
db.addressModel.belongsTo(db.authModel, { foreignKey: 'user_id' });

db.addressModel.belongsTo(db.countryModel, { foreignKey: 'country_id' });
db.countryModel.hasMany(db.addressModel, { foreignKey: 'country_id' });

db.addressModel.belongsTo(db.stateModel, { foreignKey: 'state_id' });
db.stateModel.hasMany(db.addressModel, { foreignKey: 'state_id' });

db.addressModel.belongsTo(db.cityModel, { foreignKey: 'city_id' });
db.cityModel.hasMany(db.addressModel, { foreignKey: 'city_id' });

db.stateModel.hasMany(db.cityModel, { foreignKey: 'state_id' });
db.cityModel.belongsTo(db.stateModel, { foreignKey: 'state_id' });

db.sequelize.sync().then(() => {
  logger.info('Re-sync');
});

module.exports = db;