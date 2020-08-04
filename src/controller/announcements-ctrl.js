const logger = require('../common/logger');
const announcementService = require('../service/announcement-service');
const typesService = require('../service/type-service');
const accountService = require('../service/account-service');

const add = async (req, res) => {
  const output = {
    statusCode: 200,
    errors: [],
    response: {}
  };

  try {
    if (req.body && req.body.Account_ID && req.body.CorporateAnnouncementTypeID) {
      const [isAccountIdExists, isTypeExists] = await Promise.all([accountService.get(req.body.Account_ID), typesService.get(req.body.CorporateAnnouncementTypeID)]);
      if (isAccountIdExists && isAccountIdExists.Account_ID && isTypeExists && isTypeExists.CorporateAnnouncementTypeID) {
        output.response = await announcementService.add(req, { ...req.body });
      } else {
        output.errors.push({ code: '', message: 'Invalid account id or announcement type id'});
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
    if (req.body && req.body.CorporateAnnouncementID) {
      const oldRecord = await announcementService.get(req.body.CorporateAnnouncementID);
      if (oldRecord && oldRecord.CorporateAnnouncementID) {
        const isUpdated = await announcementService.update(req.body);
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
      output.response = await announcementService.get(req.params.id);
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
    output.response = await announcementService.getAll(
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
      output.response = await announcementService.deleteIt(req.params.id);
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
