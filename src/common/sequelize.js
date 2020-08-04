const Sequelize = require("sequelize");
const config = require("./config");
const logger = require("./logger");

// connect to sql
const sequelizeOptions = {
  dialect: "mssql",
  port: config.sql.port,
  host: config.sql.host,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  ...(config.sql.ssl && {
    ssl: config.sql.ssl
  })
};

// Override timezone formatting for MSSQL
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};


const sequelize = new Sequelize(
  config.sql.db,
  config.sql.user,
  config.sql.password,
  sequelizeOptions
);

sequelize
  .authenticate()
  .then(() => {
    logger.info("Successfully established connection to database");
  })
  .catch(err => {
    logger.error("Unable to connect to database", err);
  });

module.exports = sequelize;
