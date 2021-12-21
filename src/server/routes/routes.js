const express = require('express');

const server = express();
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const discount = require('./discount');
const { authorization, errorHandler } = require('../middlewares');

server.use(authorization);
server.use(errorHandler);
server.use('/discount', discount);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', controllers.home);

server.get('/filter', controllers.filter);
server.post('/filter', controllers.postFilter);

server.get('/topprice', controllers.topPrice);
server.post('/topprice', controllers.findTopPricePost);

server.get('/commonprice', controllers.commonPriceGET);
server.post('/commonprice', controllers.commonPricePost);

server.post('/data', controllers.dataPost);

server.put('/data', (req, res, next) => {
  controllers.dataPUT(req, res, next);
});

module.exports = server;
