module.exports = (sequelize, Sequelize) => {
  const order_product = sequelize.define(
    'order_product',
    {
      product_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'product',
          key: 'id',
        },
        allowNull: false,
      },
      order_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'order',
          key: 'id',
        },
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER(11),
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

  return order_product;
};
