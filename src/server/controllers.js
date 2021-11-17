const services = require('../services');

function home(req, res) {
  const { message, code } = services.home();
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({ message, code }));
  res.statusCode = code;
  res.end();
}

function notFound(req, res) {
  const { message, code } = services.notFound();
  res.statusCode = code;
  res.write(message);
  res.end();
}

function filter(req, res) {
  const { message, code } = services.filter(req.params);
  res.statusCode = code;
  res.write(message);
  res.end();
}
function postFilter(req, res) {
  const { message, code } = services.postFilter(req.body);
  res.statusCode = code;
  res.write(message);
  res.end();
}

function topPrice(req, res) {
  const { message, code } = services.topPrice();
  res.statusCode = code;
  res.write(message);
  res.end();
}
function findTopPricePost(req, res) {
  const { message, code } = services.findTopPricePost(req.body);
  res.statusCode = code;
  res.write(message);
  res.end();
}

function commonPriceGET(req, res) {
  const { message, code } = services.commonPriceGET();
  res.statusCode = code;
  res.write(message);
  res.end();
}
function commonPricePost(req, res) {
  const { message, code } = services.commonPricePost(req.body);
  res.statusCode = code;
  res.write(message);
  res.end();
}

function dataPost(req, res) {
  const { message, code } = services.dataPost(req.body);
  res.statusCode = code;
  res.write(message);
  res.end();
}

module.exports = {
  home,
  notFound,
  filter,
  postFilter,
  topPrice,
  findTopPricePost,
  commonPriceGET,
  commonPricePost,
  dataPost,
};
