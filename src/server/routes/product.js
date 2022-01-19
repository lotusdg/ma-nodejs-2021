const express = require('express');
const controllers = require('../controllers');

const product = express.Router();

product.post('/create', controllers.createProduct);
product.get('/get', controllers.getProductByUuid);
product.put('/update', controllers.updateProduct);
product.get('/delete', controllers.deleteProduct);
product.get('/getAll', controllers.getAllProducts);

module.exports = product;
