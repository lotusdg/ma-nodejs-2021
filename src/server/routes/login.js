const express = require('express');
const {
  accessTokenSecret,
  passwordSecret,
  refreshTokenSecret,
} = require('../../config');

const login = express.Router();
const { user } = require('../../db');
const {
  generateAccessToken,
  hashPassword,
  generateRefreshToken,
} = require('../../utils');

// eslint-disable-next-line consistent-return
login.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
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

    const resUpdUserToken = await user.update(
      { refreshToken },
      { where: { login: username } },
    );
    if (!resUpdUserToken) {
      throw new Error('update User');
    }

    return res.send({ accessToken, refreshToken });
  } catch (err) {
    console.error('Error:', err.message || err);
    return res.send({ error: err.message || err });
  }
});

module.exports = login;
