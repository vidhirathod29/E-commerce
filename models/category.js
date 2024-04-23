const { Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define(
    'category',
    {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category_name: {
        type: Sequelize.STRING,
        unique: true,
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
  category.belongsTo(sequelize.models.users, {
    foreignKey: 'user_id',
    targetKey: 'id',
  });

  return category;
};