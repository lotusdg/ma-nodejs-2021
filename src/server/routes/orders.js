const express = require('express');
const controllers = require('../controllers');

const orders = express.Router();

orders.get('/getAll', controllers.getAllOrders);
orders.get('/get', controllers.getOrderById);
orders.post('/create', controllers.createOrder);
orders.put('/update', controllers.updateOrder);
orders.delete('/delete', controllers.deleteOrderIfExists);

module.exports = orders;
