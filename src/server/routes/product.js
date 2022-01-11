const express = require('express');
const controllers = require('../controllers');

const product = express.Router();

product.get('/test', controllers.testDBConnection);
product.post('/create', controllers.createProduct);
product.get('/get', controllers.getProductById);
product.put('/update', controllers.updateProduct);
product.get('/delete', controllers.deleteProduct);

module.exports = product;
