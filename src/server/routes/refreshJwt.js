const express = require('express');
const controllers = require('../controllers');

const refreshJwt = express.Router();

refreshJwt.post('/', controllers.refreshJwt);

module.exports = refreshJwt;
