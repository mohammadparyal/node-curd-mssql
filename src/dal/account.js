const { Accounts } = require("../model");

const checkIfLookupExists = async lookupId => {
  const lookupRow = await Accounts.findOne({
    raw: true,
    selectedFields: ["id"],
    where: { id: lookupId }
  });

  if (lookupRow && lookupRow.id) {
    return true;
  }
  return false;
};

const get = (accountId) => {
  return Accounts.findOne({
    raw: true,
    where: { Account_ID: accountId }
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
    limit
  };

  if (selectedFields.length > 0) {
    query.attributes = selectedFields;
  }


  if (filters.isActive === 1 || filters.isActive === 0) {
    query.where.isActive = filters.isActive;
  }

  return Accounts.findAndCountAll(query);
};

const add = bodyInfo => {
  return Accounts.create({
    ...bodyInfo,
    isActive: true
  });
};

const update = (accountInfo) => {
  const update = {};

  if (accountInfo.Account_BusinessName) {
    update.Account_BusinessName = accountInfo.Account_BusinessName;
  }

  if (accountInfo.Account_IsActive === 0 || accountInfo.Account_IsActive === 1) {
    update.Account_IsActive = accountInfo.Account_IsActive;
  }

  return Accounts.update(
    {
      ...update
    },
    { where: { Account_ID: accountInfo.Account_ID } }
  );
};

const deleteIt = async (Account_ID) => {
  const record = await Accounts.findOne({
    where: { Account_ID: Account_ID }
  });

  if (!record) {
    return false;
  }

  await record.destroy();

  return true;
}

module.exports = {
  checkIfLookupExists,
  add,
  update,
  get,
  getAll,
  deleteIt
};
