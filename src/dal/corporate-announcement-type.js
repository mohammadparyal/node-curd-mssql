const { CorporateAnnouncementType, Accounts } = require("../model");

CorporateAnnouncementType.belongsTo(Accounts, {
  foreignKey: "Account_ID",
  sourceKey: "Account_ID",
  as: "account"
});

const get = (id) => {
  return CorporateAnnouncementType.findOne({
    raw: true,
    where: { CorporateAnnouncementTypeID: id }
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
      { model: Accounts, as: "account", attributes: ["Account_ID", "Account_BusinessName"] }
    ]
  };

  if (selectedFields.length > 0) {
    query.attributes = selectedFields;
  }


  if (filters.isActive === 1 || filters.isActive === 0) {
    query.where.isActive = filters.isActive;
  }

  return CorporateAnnouncementType.findAndCountAll(query);
};

const add = bodyInfo => {
  return CorporateAnnouncementType.create({
    ...bodyInfo,
    isActive: true
  });
};

const update = (recordInfo) => {
  const update = {
    CorporateAnnouncementTypeCreatedBy: 1,
    CorporateAnnouncementTypeLastModifiedBy: 1
  };

  if (recordInfo.CorporateAnnouncementTypeName) {
    update.CorporateAnnouncementTypeName = recordInfo.CorporateAnnouncementTypeName;
  }

  if (recordInfo.Account_ID) {
    update.Account_ID = recordInfo.Account_ID;
  }

  return CorporateAnnouncementType.update(
    {
      ...update
    },
    { where: { CorporateAnnouncementTypeID: recordInfo.CorporateAnnouncementTypeID } }
  );
};

const deleteIt = async (id) => {
  const record = await CorporateAnnouncementType.findOne({
    where: { CorporateAnnouncementTypeID: id }
  });

  if (!record) {
    return false;
  }

  await record.destroy();

  return true;
}

module.exports = {
  add,
  update,
  get,
  getAll,
  deleteIt
};
