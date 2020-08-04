const sequelize = require("../common/sequelize");
// Doing manually to get ide intellisense
const db = {
  sequelize,
  Accounts: sequelize.import("./Accounts"),
  CorporateAnnouncement: sequelize.import("./CorporateAnnouncement"),
  CorporateAnnouncementType: sequelize.import("./CorporateAnnouncementType")
};


db.sequelize = sequelize;



module.exports = db;
