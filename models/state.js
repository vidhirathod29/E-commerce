module.exports = (sequelize, Sequelize) => {
  const state = sequelize.define(
    'state',
    {
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      state_name: {
        type: Sequelize.STRING,
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