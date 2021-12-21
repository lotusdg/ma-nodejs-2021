const express = require('express');
const controllers = require('../controllers');

const discount = express.Router();

discount.get('/promise', controllers.promiseGET);
discount.post('/promise', controllers.promisePOST);

discount.get('/promisify', controllers.promisifyGET);
discount.post('/promisify', controllers.promisifyPOST);

discount.get('/async', controllers.discountAsyncGET);
discount.post('/async', controllers.discountAsyncPOST);

module.exports = discount;
