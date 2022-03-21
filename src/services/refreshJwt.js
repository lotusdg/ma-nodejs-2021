const { user } = require('../db');
const { accessTokenSecret } = require('../config');
const { generateAccessToken, createResponse } = require('../utils');
const { httpCodes } = require('./helpers');

async function refreshJwt(body) {
  try {
    const { refreshToken, username } = body;
    const resRefreshJwt = await user.findOne({ where: { login: username } });
    if (!resRefreshJwt || resRefreshJwt.refreshToken !== refreshToken) {
      throw new Error('fail to generate JWT');
    }
    const accessToken = generateAccessToken(username, accessTokenSecret);
    return createResponse(httpCodes.ok, { accessToken });
  } catch (err) {
    console.error(err);
    return createResponse(httpCodes.unauthorized, {
      error: err.message || err,
    });
  }
}

module.exports = { refreshJwt };
