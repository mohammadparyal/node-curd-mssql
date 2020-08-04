const logger = require('../common/logger');
const typesService = require('../service/type-service');
const accountService = require('../service/account-service');

const add = async (req, res) => {
  const output = {
    statusCode: 200,
    errors: [],
    response: {}
  };

  try {
    if (req.body && req.body.Account_ID) {
      const isAccountIdExists = await accountService.get(req.body.Account_ID);
      if (isAccountIdExists && isAccountIdExists.Account_ID) {
        output.response = await typesService.add(req, { ...req.body });
      } else {
        output.errors.push({ code: '', message: 'Invalid account id '});
        return res.status(400).send(output);
      }

    } else {
      return res.status(400).send(output);
    }
  } catch (error) {
    output.statusCode = 500;
    logger.log('error', 'Error occurred while creating record', {
      meta: { body: req.body, error: error.stack }
    });
    output.errors.push({
      code: '',
      message: 'Error occurred while creating record'
    });
  }
  return res.send(output);
};

const edit = async (req, res) => {
  const output = {
    statusCode: 200,
    errors: [],
    response: {}
  };

  try {
    if (req.body && req.body.CorporateAnnouncementTypeID) {
      const oldRecord = await typesService.get(req.body.CorporateAnnouncementTypeID);
      if (oldRecord && oldRecord.CorporateAnnouncementTypeID) {
        const isUpdated = await typesService.update(req.body);
        output.response = {
          updated: isUpdated
        };
      } else {
        output.errors.push({ code: 400, message: 'Invalid record id' });
        return res.status(400).send(output);
      }
    } else {
      return res.status(400).send(output);
    }
  } catch (error) {
    output.statusCode = 500;
    logger.log('error', 'Error occurred while updating record', {
      meta: { body: req.body, error: error.stack }
    });
    output.errors.push({
      code: '',
      message: 'Error occurred while updating record'
    });
  }

  return res.send(output);
};

const get = async (req, res) => {
  const output = {
    statusCode: 200,
    errors: [],
    response: {}
  };

  try {
    if (req.params.id) {
      output.response = await typesService.get(req.params.id);
    } else {
      return res.status(400).send(output);
    }
  } catch (error) {
    output.statusCode = 500;
    logger.log('error', 'Error occurred while getting info', {
      meta: { body: req.body, error: error.stack }
    });
    output.errors.push({
      code: '',
      message: 'Error occurred while getting info'
    });
  }

  return res.send(output);
};

const getAll = async (req, res) => {
  const output = {
    statusCode: 200,
    errors: [],
    response: {}
  };

  try {
    output.response = await typesService.getAll(
      parseInt(req.params.limit),
      parseInt(req.params.page)
    );
  } catch (error) {
    output.statusCode = 500;
    logger.log('error', 'Error occurred while getting records', {
      meta: { error: error.stack }
    });
    output.errors.push({
      code: '',
      message: 'Error occurred while getting records'
    });
  }

  return res.send(output);
};

const deleteIt = async (req, res) => {
  const output = {
    statusCode: 200,
    errors: [],
    response: {}
  };

  try {
    if (req.params.id) {
      output.response = await typesService.deleteIt(req.params.id);
    } else {
      return res.status(400).send(output);
    }
  } catch (error) {
    output.statusCode = 500;
    logger.log('error', 'Error occurred while deleting record', {
      meta: { body: req.body, error: error.stack }
    });
    output.errors.push({
      code: '',
      message: 'Error occurred while deleting records'
    });
  }

  return res.send(output);
};

module.exports = {
  add,
  edit,
  get,
  getAll,
  deleteIt
};
