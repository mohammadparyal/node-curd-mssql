const crypto = require("crypto");
const config = require("./config");
const fs = require("fs");
const path = require("path");

const encyptPassword = password => {
  const iterations = 100;
  const keylen = 24;

  const derivedKey = crypto.pbkdf2Sync(
    password,
    config.passwordSalt,
    iterations,
    keylen,
    "sha512"
  );
  const pw = Buffer(derivedKey, "binary").toString("hex");

  return pw;
};

const replaceErrors = (errKey, errValue) => {
  if (errValue instanceof Error) {
    const error = {};
    let keys;

    // get own property name will help in traversing inherited properties
    keys = Object.getOwnPropertyNames(errValue);
    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        error[keys[i]] = errValue[keys[i]];
      }
    }

    // free mem-leak
    keys = null;

    return error;
  }

  return errValue;
};


module.exports = {
  encyptPassword,
  replaceErrors
};
