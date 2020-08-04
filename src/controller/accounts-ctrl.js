const logger = require('../common/logger');
const accountService = require('../service/account-service');

const add = async (req, res) => {
  const output = {
    statusCode: 200,
    errors: [],
    response: {}
  };

  try {
    if (req.body) {
      output.response = await accountService.add(req, { ...req.body });
    } else {
      return res.status(400).send(output);
    }
  } catch (error) {
    output.statusCode = 500;
    logger.log('error', 'Error occurred while creating account', {
      meta: { body: req.body, error: error.stack }
    });
    output.errors.push({
      code: '',
      message: 'Error occurred while creating account'
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
    if (req.body && req.body.Account_ID) {
      const oldRecord = await accountService.get(req.body.Account_ID);
      if (oldRecord && oldRecord.Account_ID) {
        const isUpdated = await accountService.update(req.body);
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
    logger.log('error', 'Error occurred while updating account', {
      meta: { body: req.body, error: error.stack }
    });
    output.errors.push({
      code: '',
      message: 'Error occurred while updating account'
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
      output.response = await accountService.get(req.params.id);
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
    output.response = await accountService.getAll(
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
      output.response = await accountService.deleteIt(req.params.id);
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
