const express = require('express');

const login = express.Router();
const { user } = require('../../db');
const { generateAccessToken } = require('../../utils');

login.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await user.findOne({
      where: {
        login: username,
      },
    });

    if (!result || result.password !== password) {
      throw new Error('bad username or password');
    }

    const token = generateAccessToken(username);

    res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = login;
