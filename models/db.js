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

db.sequelize.sync().then(() => {
  logger.info('Re-sync');
});

module.exports = db;