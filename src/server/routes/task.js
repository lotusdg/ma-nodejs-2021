const express = require('express');
const controllers = require('../controllers');

const task = express.Router();

task.get('/test', controllers.test);
task.post('/create', controllers.productCreatePost);
task.get('/get', controllers.productGet);
task.put('/update', controllers.productUpdatePut);
task.get('/delete', controllers.productDeleteMethodGet);

module.exports = task;
