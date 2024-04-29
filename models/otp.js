module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'otp',
    {
      email: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      otp: {
        type: Sequelize.INTEGER(6),
        allowNull: false,
      },
      expireTime: {
        type: Sequelize.DATE,
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
    },
    { freezeTableName: true, timestamps: false },
  );
};