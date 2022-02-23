const jwt = require('jsonwebtoken');

function createResponse(code, message) {
  return { code, message };
}

function fatal(message) {
  console.error(message);
  process.exit(1);
}

function generateAccessToken(username, secretKey) {
  return jwt.sign({ username }, secretKey, { expiresIn: '60s' });
}

module.exports = {
  fatal,
  createResponse,
  generateAccessToken,
};
