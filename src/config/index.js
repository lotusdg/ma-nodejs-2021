require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  login: process.env.login,
  password: process.env.PASSWORD,
};

module.exports = config;
