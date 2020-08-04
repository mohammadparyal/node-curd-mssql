/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Accounts', {
    Account_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Account_BusinessName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Account_IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'Accounts',
    schema: 'dbo',
    timestamps: false
  });
};
