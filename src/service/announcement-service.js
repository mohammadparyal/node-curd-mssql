const Dal = require("../dal/corporate-announcement");

const add = (req, payload) => {
  return Dal.add(payload);
};

const update = editPayload => {
  return Dal.update(editPayload);
};


const getAll = async (limit, pageNo) => {
  const { count, rows } = await Dal.getAll({}, limit, pageNo);
  return {
    perPage: limit,
    totalPages: Math.ceil(count / limit),
    total: count,
    data: rows
  };
};

const get = async (id) => {
  return Dal.get(id);
};

const deleteIt = async (id) => {
  return Dal.deleteIt(id);
}

module.exports = {
  getAll,
  add,
  update,
  get,
  deleteIt
};
