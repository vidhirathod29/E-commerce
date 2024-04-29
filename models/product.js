module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    'product',
    {
      user_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'category',
          key: 'id',
        },
        allowNull: false,
      },
      product_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT(11),
        allowNull: false,
      },
      product_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      product_quantity: {
        type: Sequelize.INTEGER(),
        allowNull: false,
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

  return product;
};