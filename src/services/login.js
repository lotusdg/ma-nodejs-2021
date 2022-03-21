const { user } = require('../db');
const {
  accessTokenSecret,
  passwordSecret,
  refreshTokenSecret,
} = require('../config');
const {
  generateAccessToken,
  hashPassword,
  generateRefreshToken,
  createResponse,
} = require('../utils');
const { httpCodes } = require('./helpers');

async function login(body) {
  try {
    const { username, password } = body;
    const resFindUser = await user.findOne({
      where: {
        login: username,
      },
    });
    if (
      !resFindUser ||
      resFindUser.password !== hashPassword(password, passwordSecret)
    ) {
      throw new Error('bad username or password');
    }
    const accessToken = generateAccessToken(username, accessTokenSecret);
    const refreshToken = generateRefreshToken(username, refreshTokenSecret);
    const resUpdToken = await user.update(
      { refreshToken },
      { where: { login: username } },
    );
    if (!resUpdToken) {
      throw new Error('fail to update refresh JWT');
    }
    return createResponse(httpCodes.ok, { accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.unauthorized, {
      error: err.message || err,
    });
  }
}

module.exports = { login };
