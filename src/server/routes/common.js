const express = require('express');
const controllers = require('../controllers');

const common = express.Router();

common.get('/', controllers.home);

common.get('/filter', controllers.filter);
common.post('/filter', controllers.postFilter);

common.get('/topprice', controllers.topPrice);
common.post('/topprice', controllers.findTopPricePost);

common.get('/commonprice', controllers.commonPriceGET);
common.post('/commonprice', controllers.commonPricePost);

common.post('/data', controllers.dataPost);

common.put('/data', controllers.dataPUT);

module.exports = common;
