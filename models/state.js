module.exports = (sequelize, Sequelize) => {
  const state = sequelize.define(
    'state',
    {
      country_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'country',
          key: 'id',
        },
        allowNull: false,
      },
      state_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false },
  );

  state.belongsTo(sequelize.models.country, {
    foreignKey: 'country_id',
    targetKey: 'id',
  });

  return state;
};