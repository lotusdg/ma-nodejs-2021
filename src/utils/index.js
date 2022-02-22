const jwt = require('jsonwebtoken');
const config = require('../config');

function createResponse(code, message) {
  return { code, message };
}

function fatal(message) {
  console.error(message);
  process.exit(1);
}

function generateAccessToken(username) {
  return jwt.sign({ username }, config.secretKey, { expiresIn: '60s' });
}

module.exports = {
  fatal,
  createResponse,
  generateAccessToken,
};
