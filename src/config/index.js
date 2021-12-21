require('dotenv').config();

const config = {
  portEnv: process.env.PORT || 3000,
  loginEnv: process.env.LOGIN,
  passEnv: process.env.PASSWORD,
};

module.exports = config;
