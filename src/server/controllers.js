const services = require('../services');

function resFinish(res, code, message) {
  res.statusCode = code;
  res.write(message);
  res.end();
}

function home(req, res) {
  const { message, code } = services.home();
  res.setHeader('Content-Type', 'application/json');
  resFinish(res, code, message);
}

function notFound(req, res) {
  const { message, code } = services.notFound();
  resFinish(res, code, message);
}

function filter(req, res) {
  const { message, code } = services.filter(req.params);
  resFinish(res, code, message);
}
function postFilter(req, res) {
  const { message, code } = services.postFilter(req.body, req.params);
  resFinish(res, code, message);
}

function topPrice(req, res) {
  const { message, code } = services.topPrice();
  resFinish(res, code, message);
}
function findTopPricePost(req, res) {
  const { message, code } = services.findTopPricePost(req.body);
  resFinish(res, code, message);
}

function commonPriceGET(req, res) {
  const { message, code } = services.commonPriceGET();
  resFinish(res, code, message);
}
function commonPricePost(req, res) {
  const { message, code } = services.commonPricePost(req.body);
  resFinish(res, code, message);
}

function dataPost(req, res) {
  const { message, code } = services.dataPost(req.body);
  resFinish(res, code, message);
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