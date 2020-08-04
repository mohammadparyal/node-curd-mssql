const AccountDal = require("../dal/account");

const add = (req, payload) => {
  return AccountDal.add(payload);
};

const update = editPayload => {
  return AccountDal.update(editPayload);
};


const getAll = async (limit, pageNo) => {
  const { count, rows } = await AccountDal.getAll({}, limit, pageNo);
  return {
    perPage: limit,
    totalPages: Math.ceil(count / limit),
    total: count,
    data: rows
  };
};

const get = async (id) => {
  return AccountDal.get(id);
};

const deleteIt = async (id) => {
  return AccountDal.deleteIt(id);
}

module.exports = {
  getAll,
  add,
  update,
  get,
  deleteIt
};
