const express = require('express');
const controllers = require('../controllers');

const common = express.Router();

common.get('/', controllers.home);

common.get('/filter', controllers.getFilter);
common.post('/filter', controllers.postFilter);

common.get('/topprice', controllers.getTopPrice);
common.post('/topprice', controllers.postTopPrice);

common.get('/commonprice', controllers.commonPriceGET);
common.post('/commonprice', controllers.commonPricePost);

common.post('/data', controllers.dataPost);

common.put('/data', controllers.dataPUT);

module.exports = common;
