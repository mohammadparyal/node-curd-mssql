const { CorporateAnnouncement, Accounts, CorporateAnnouncementType } = require('../model');

CorporateAnnouncement.belongsTo(Accounts, {
  foreignKey: 'Account_ID',
  sourceKey: 'Account_ID',
  as: 'account'
});


CorporateAnnouncement.belongsTo(CorporateAnnouncementType, {
  foreignKey: 'CorporateAnnouncementTypeID',
  sourceKey: 'CorporateAnnouncementTypeID',
  as: 'account-type'
});


const get = (id) => {
  return CorporateAnnouncement.findOne({
    raw: true,
    where: { CorporateAnnouncementID: id }
  });
};

const getAll = (
  filters = {},
  limit = 10,
  pageNo = 0,
  selectedFields = []
) => {
  const query = {
    where: {},
    offset: pageNo * limit,
    limit,
    include: [
      { model: Accounts, as: 'account', attributes: ['Account_ID', 'Account_BusinessName'] },
      { model: CorporateAnnouncementType, as: 'account-type', attributes: ['CorporateAnnouncementTypeID', 'CorporateAnnouncementTypeName'] }
    ]
  };

  if (selectedFields.length > 0) {
    query.attributes = selectedFields;
  }

  return CorporateAnnouncement.findAndCountAll(query);
};

const add = bodyInfo => {
  return CorporateAnnouncement.create({
    CorporateAnnouncementCreatedBy: 1,
    CorporateAnnouncementLastModifiedBy: 1,
    ...bodyInfo
  });
};

const update = (recordInfo) => {

  const update = {
    CorporateAnnouncementCreatedBy: 1,
    CorporateAnnouncementLastModifiedBy: 1
  };

  if (recordInfo.CorporateAnnouncementTitle) {
    update.CorporateAnnouncementTitle = recordInfo.CorporateAnnouncementTitle;
  }

  if (recordInfo.Account_ID) {
    update.Account_ID = recordInfo.Account_ID;
  }

  if (recordInfo.CorporateAnnouncementTypeID) {
    update.CorporateAnnouncementTypeID = recordInfo.CorporateAnnouncementTypeID;
  }

  if (recordInfo.CorporateAnnouncementTitle) {
    update.CorporateAnnouncementTitle = recordInfo.CorporateAnnouncementTitle;
  }

  if (recordInfo.CorporateAnnouncementNote) {
    update.CorporateAnnouncementNote = recordInfo.CorporateAnnouncementNote;
  }

  if (recordInfo.CorporateAnnouncementAttachment) {
    update.CorporateAnnouncementAttachment = recordInfo.CorporateAnnouncementAttachment;
  }

  if (recordInfo.CorporateAnnouncementActiveDate) {
    update.CorporateAnnouncementActiveDate = recordInfo.CorporateAnnouncementActiveDate;
  }

  if (recordInfo.CorporateAnnouncementHoldNote) {
    update.CorporateAnnouncementHoldNote = recordInfo.CorporateAnnouncementHoldNote;
  }

  if (recordInfo.CorporateAnnouncementEmbedVideo) {
    update.CorporateAnnouncementEmbedVideo = recordInfo.CorporateAnnouncementEmbedVideo;
  }


  return CorporateAnnouncement.update(
    {
      ...update
    },
    { where: { CorporateAnnouncementID: recordInfo.CorporateAnnouncementID } }
  );
};

const deleteIt = async (id) => {
  const record = await CorporateAnnouncement.findOne({
    where: { CorporateAnnouncementID: id }
  });

  if (!record) {
    return false;
  }

  await record.destroy();

  return true;
};

module.exports = {
  add,
  update,
  get,
  getAll,
  deleteIt
};
