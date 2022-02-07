const services = require('../../services');

const { resFinish } = require('../../services/helpers');

function home(req, res) {
  const { message, code } = services.home();
  resFinish(res, code, message);
}

function notFound(req, res) {
  const { message, code } = services.notFound();
  resFinish(res, code, message);
}

async function getFilter(req, res) {
  const { message, code } = await services.getFilter(req.query);
  resFinish(res, code, message);
}

async function postFilter(req, res) {
  const { message, code } = await services.postFilter(req.body, req.query);
  resFinish(res, code, message);
}

async function getTopPrice(req, res) {
  const { message, code } = await services.topPrice();
  resFinish(res, code, message);
}

function postTopPrice(req, res) {
  const { message, code } = services.findTopPricePost(req.body);
  resFinish(res, code, message);
}

async function commonPriceGET(req, res) {
  const { message, code } = await services.commonPriceGET();
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

async function dataPUT(req, res, next) {
  if (req.headers['content-type'] === 'text/csv') {
    try {
      const { code, message } = await services.uploadDataCsv(req);
      resFinish(res, code, message);
    } catch (e) {
      console.error('Failed to upload CSV', e);
      resFinish(res, 500, { error: e.message });
    }
  } else next(new Error('wrong header'));
}

module.exports = {
  home,
  notFound,
  getFilter,
  postFilter,
  getTopPrice,
  postTopPrice,
  commonPriceGET,
  commonPricePost,
  dataPost,
  dataPUT,
};
