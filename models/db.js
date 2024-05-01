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
db.authModel = require('../models/auth')(sequelize, Sequelize);
db.otpModel = require('../models/otp')(sequelize, Sequelize);
db.categoryModel = require('../models/category')(sequelize, Sequelize);

db.sequelize.sync().then(() => {
  logger.info('Re-sync');
});

module.exports = db;