const { Sequelize } = require('sequelize');
const category = require('./category');

module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define(
    'users',
    {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
        enum: ['MALE', 'FEMALE'],
      },
      profile_image: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
        enum: ['ADMIN', 'CUSTOMER'],
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    { freezeTableName: true, timestamps: false },
  );

  return users;
};