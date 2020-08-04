/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('CorporateAnnouncement', {
    CorporateAnnouncementID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CorporateAnnouncementTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Account_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CorporateAnnouncementTitle: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CorporateAnnouncementNote: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CorporateAnnouncementAttachment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CorporateAnnouncementActiveDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    CorporateAnnouncementHoldNote: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    CorporateAnnouncementEmbedVideo: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    CorporateAnnouncementCreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CorporateAnnouncementCreationDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    CorporateAnnouncementLastModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CorporateAnnouncementLastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'CorporateAnnouncement',
    schema: 'dbo',
    updatedAt: 'CorporateAnnouncementLastModifiedDate',
    createdAt: 'CorporateAnnouncementCreationDate'
  });
};
