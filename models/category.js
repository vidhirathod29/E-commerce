const { Sequelize } = require('sequelize');
const { users } = require('./auth');

module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define(
    'category',
    {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_description: {
        type: Sequelize.TEXT,
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

  return category;
};