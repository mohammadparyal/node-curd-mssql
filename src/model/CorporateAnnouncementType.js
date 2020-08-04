/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('CorporateAnnouncementType', {
    CorporateAnnouncementTypeID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CorporateAnnouncementTypeName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Account_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CorporateAnnouncementTypeCreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CorporateAnnouncementTypeCreationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CorporateAnnouncementTypeLastModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CorporateAnnouncementTypeLastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CorporateAnnouncementType',
    schema: 'dbo',
    updatedAt: 'CorporateAnnouncementTypeLastModifiedDate',
    createdAt: 'CorporateAnnouncementTypeCreationDate',
  });
};
