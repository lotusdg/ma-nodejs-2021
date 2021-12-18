const express = require('express');
const controllers = require('../controllers');

const discount = express.Router();

discount.get('/promise', (req, res) => controllers.promiseGET(req, res));
discount.post('/promise', (req, res) => controllers.promisePOST(req, res));

discount.get('/promisify', (req, res) => {
  controllers.promisifyGET(req, res);
});
discount.post('/promisify', (req, res) => {
  controllers.promisifyPOST(req, res);
});

discount.get('/async', (req, res) => {
  controllers.discountAsyncGET(req, res);
});
discount.post('/async', (req, res) => {
  controllers.discountAsyncPOST(req, res);
});

module.exports = discount;
