const express = require('express');
const controllers = require('../controllers');

const product = express.Router();

product.get('/', controllers.getAllProducts);
product.get('/:uuid', controllers.getProductByUuid);
product.post('/', controllers.createProduct);
product.put('/:uuid', controllers.updateProduct);
product.delete('/:uuid', controllers.deleteProduct);

module.exports = product;
