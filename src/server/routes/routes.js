const express = require('express');

const server = express();

const bodyParser = require('body-parser');

const controllers = require('../controllers');

const discount = require('./discount');

const myAuthorization = (req, res, next) => {
  const myArray = req.headers.authorization.split(' ');
  if (myArray[0] === 'Basic') {
    const authStr = Buffer.from(myArray[1], 'base64').toString();
  }
  return res.send({ message: 'incorrect login/pass' });
};

server.use(myAuthorization);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  controllers.home(req, res);
});

server.get('/filter', (req, res) => controllers.filter(req, res));
server.post('/filter', (req, res) => controllers.postFilter(req, res));

server.get('/topprice', (req, res) => controllers.topPrice(req, res));
server.post('/topprice', (req, res) => controllers.findTopPricePost(req, res));

server.get('/commonprice', (req, res) => controllers.commonPriceGET(req, res));
server.post('/commonprice', (req, res) =>
  controllers.commonPricePost(req, res),
);

server.post('/data', (req, res) => {
  controllers.dataPost(req, res);
});

server.put('/data', (req, res, next) => {
  if (req.headers['content-type'] === 'text/csv') {
    controllers.dataPUT(req, res);
  } else {
    next(new Error('wrong header'));
  }
});

server.use('/discount', discount);

module.exports = server;
