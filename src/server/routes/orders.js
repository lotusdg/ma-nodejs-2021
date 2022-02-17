const express = require('express');
const controllers = require('../controllers');

const orders = express.Router();

orders.get('/', controllers.getAllOrders);
orders.get('/:id', controllers.getOrderById);
orders.post('/', controllers.createOrder);
orders.put('/:id', controllers.updateOrder);
orders.delete('/:id', controllers.deleteOrderIfExists);

module.exports = orders;
