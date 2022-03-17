const jwt = require('jsonwebtoken');
const { createHmac } = require('crypto');

function createResponse(code, message) {
  return { code, message };
}

function fatal(message) {
  console.error(`FATAL: ${message}`);
  process.exit(1);
}

function generateAccessToken(username, secretKey) {
  return jwt.sign({ username }, secretKey, { expiresIn: '24h' });
}

function generateRefreshToken(username, secretKey) {
  return jwt.sign({ username }, secretKey);
}

function hashPassword(password, secretKey) {
  const hash = createHmac('sha256', secretKey).update(password).digest('hex');
  return hash;
}

module.exports = {
  fatal,
  createResponse,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
};
