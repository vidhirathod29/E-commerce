module.exports = (sequelize, Sequelize) => {
  const country = sequelize.define(
    'country',
    {
      country_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },

    { freezeTableName: true, timestamps: false },
  );

  const state = require('./state')(sequelize, Sequelize);

  country.hasMany(state, {
    foreignKey: 'country_id',
    sourceKey: 'id',
  });

  return country;
};