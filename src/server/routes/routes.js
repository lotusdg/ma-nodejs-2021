const express = require('express');

const server = express();
const bodyParser = require('body-parser');
const product = require('./product');
const orders = require('./orders');
const discount = require('./discount');
const common = require('./common');
const login = require('./login');
const refreshJwt = require('./refreshJwt');
const { authorization, errorHandler } = require('../middlewares');
const { httpCodes } = require('../../services/helpers');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/login', login);
server.use('/refresh-jwt', refreshJwt);
server.use(authorization);

server.use('/product', product);
server.use('/orders', orders);
server.use('/discount', discount);
server.use(common);

server.use((req, res) =>
  res.status(httpCodes.notFound).send({ error: `Page not found ${req.path}` }),
);

server.use(errorHandler);

module.exports = server;
