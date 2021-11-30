const services = require('../services');
const { httpCodes } = require('../services/helpers');

function resFinish(res, code, message) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = code;
  res.write(JSON.stringify(message));
  res.end();
}

function home(req, res) {
  const { message, code } = services.home();
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

function promiseGET(req, res) {
  services.promiseGET().then(({code, message}) => {
    resFinish(res, code, message);
  }).catch(e => {
    resFinish(res, httpCodes.badReq, {error: e.message});
  });
}

function promisePOST(req, res) {
  services.promisePOST(req.body).then(({code, message}) => {
    resFinish(res, code, message);
  }).catch(e => {
    resFinish(res, httpCodes.badReq, {error: e.message});
  });
}

function promisifyGET(req, res) {
  services.promisifyGET().then(({code, message}) => {
    resFinish(res, code, message);
  }).catch(e => {
    resFinish(res, httpCodes.badReq, {error: e.message});
  });
}

function promisifyPOST(req, res) {
  services.promisifyPOST(req.body).then(({code, message}) => {
    resFinish(res, code, message);
  }).catch(e => {
    resFinish(res, httpCodes.badReq, {error: e.message});
  });
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
  promiseGET,
  promisePOST,
  promisifyGET,
  promisifyPOST,
};
