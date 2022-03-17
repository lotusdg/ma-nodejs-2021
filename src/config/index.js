const { fatal } = require('../utils');

require('dotenv').config();

const config = {
  portEnv: process.env.PORT || 3000,
  accessTokenSecret:
    process.env.ACCESS_TOKEN_SECRET ||
    fatal('ACCESS_TOKEN_SECRET is not defined'),
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET ||
    fatal('REFRESH_TOKEN_SECRET is not defined'),
  passwordSecret:
    process.env.PASSWORD_SECRET || fatal('PASSWORD_SECRET is not defined'),
  db: {
    username: process.env.DB_USERNAME || fatal('DB_USER is not defined'),
    host: process.env.DB_HOST || fatal('DB_HOST is not defined'),
    port: process.env.DB_PORT || fatal('DB_PORT is not defined'),
    database: process.env.DB_NAME || fatal('DB_NAME is not defined'),
    password: process.env.DB_PASS || fatal('DB_PASS is not defined'),
    dialect: process.env.DB_DIALECT || fatal('DB_DIALECT is not defined'),
    logging: console.log,
  },
};

module.exports = config;
