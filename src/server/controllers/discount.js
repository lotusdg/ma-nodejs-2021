const services = require('../../services');

const { resFinish, httpCodes } = require('../../services/helpers');

function promiseGET(req, res) {
  services
    .promiseGET()
    .then(({ code, message }) => {
      resFinish(res, code, message);
    })
    .catch((e) => {
      resFinish(res, httpCodes.badReq, { error: e.message });
    });
}

function promisePOST(req, res) {
  services
    .promisePOST(req.body)
    .then(({ code, message }) => {
      resFinish(res, code, message);
    })
    .catch((e) => {
      resFinish(res, httpCodes.badReq, { error: e.message });
    });
}

function promisifyGET(req, res) {
  services
    .promisifyGET()
    .then(({ code, message }) => {
      resFinish(res, code, message);
    })
    .catch((e) => {
      resFinish(res, httpCodes.badReq, { error: e.message });
    });
}

function promisifyPOST(req, res) {
  services
    .promisifyPOST(req.body)
    .then(({ code, message }) => {
      resFinish(res, code, message);
    })
    .catch((e) => {
      resFinish(res, httpCodes.badReq, { error: e.message });
    });
}

async function discountAsyncGET(req, res) {
  try {
    const { code, message } = await services.discountAsyncGET();
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message });
  }
}

async function discountAsyncPOST(req, res) {
  try {
    const { code, message } = await services.discountAsyncPOST(req.body);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message });
  }
}

module.exports = {
  promiseGET,
  promisePOST,
  promisifyGET,
  promisifyPOST,
  discountAsyncGET,
  discountAsyncPOST,
};
