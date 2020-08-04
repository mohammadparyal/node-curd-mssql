const Joi = require("joi");

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow("dev", "production", "test", "staging")
    .default("dev"),
  PORT: Joi.number().default(4000),
  API_VERSION: Joi.string()
    .default("1.0")
    .description("API Version"),
  JWT_SECRET: Joi.string()
    .required()
    .description("JWT Secret required to sign"),
  SQL_DB: Joi.string()
    .default("curdopt")
    .description("SQL database name"),
  SQL_TEST_DB: Joi.string()
    .default("curdopt-test")
    .description("SQL database for tests"),
  SQL_PORT: Joi.number().default(1433),
  SQL_HOST: Joi.string().default("localhost"),
  SQL_USER: Joi.string()
    .required()
    .default("user")
    .description("Sql username"),
  SQL_PASSWORD: Joi.string()
    .allow("")
    .default("password")
    .description("Sql password"),
  SQL_SSL: Joi.bool()
    .default(false)
    .description("Enable SSL connection to SQL")
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// if test, use test database
const isTestEnvironment = envVars.NODE_ENV === "test";

const config = {
  env: envVars.NODE_ENV,
  isDirectoryApplicationLogsEnabled:
    envVars.IS_DIR_APPLICATION_LOGS_ENABLED || false,
  port: envVars.PORT,
  apiVersion: envVars.API_VERSION,
  jwtSecret: envVars.JWT_SECRET,
  jwtTokenExpiryInHours: envVars.JWT_TOKEN_EXPIRY_IN_HOURS || 100,
  jwtAdminTokenExpiryInHours: envVars.JWT_ADMIN_TOKEN_EXPIRY_IN_HOURS || 5,
  sql: {
    db: isTestEnvironment ? envVars.SQL_TEST_DB : envVars.SQL_DB,
    port: envVars.SQL_PORT,
    host: envVars.SQL_HOST,
    user: envVars.SQL_USER,
    password: envVars.SQL_PASSWORD
  },
  passwordSalt: envVars.PASSWORD_SALT || "saltiii"
};

module.exports = config;
