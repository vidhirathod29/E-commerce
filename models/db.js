const { Sequelize } = require('sequelize');
const { Messages } = require('../utils/messages');
const logger = require('../logger/logger');

const sequelize = new Sequelize('e-commerce', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    logger.info(Messages.DATABASE_CONNECTION);
  })
  .catch((err) => {
    logger.error(Messages.NO_DATABASE_CONNECTION);
  });