const { fatal } = require('../utils');

require('dotenv').config();

const config = {
  portEnv: process.env.PORT || 3000,
  loginEnv: process.env.LOGIN,
  passEnv: process.env.PASSWORD,
  db: {
    user: process.env.DB_USER || fatal('FATAL: DB_USER is not defined'),
    host: process.env.DB_HOST || fatal('FATAL: DB_HOST is not defined'),
    port: process.env.DB_PORT || fatal('FATAL: DB_PORT is not defined'),
    database: process.env.DB_NAME || fatal('FATAL: DB_NAME is not defined'),
    password: process.env.DB_PASS || fatal('FATAL: DB_PASS is not defined'),
  },
};

module.exports = config;
