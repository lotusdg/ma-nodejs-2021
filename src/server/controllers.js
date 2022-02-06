const services = require('../services');
const product = require('../services/product');

const { httpCodes } = require('../services/helpers');

function resFinish(res, code, message) {
  res.status(code).json(message);
}

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

async function createProduct(req, res) {
  try {
    const { code, message } = await product.createProduct(req.body);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message || e });
  }
}

async function getProductByUuid(req, res) {
  try {
    const { code, message } = await product.getProductByUuid(req.query);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message || e });
  }
}

async function updateProduct(req, res) {
  try {
    const { code, message } = await product.updateProduct(req.body);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const { code } = await product.deleteProduct(req.query);
    resFinish(res, code);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message });
  }
}

async function getAllProducts(req, res) {
  try {
    const result = await product.getProducts();
    resFinish(res, httpCodes.ok, { message: result });
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message || e });
  }
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
  promiseGET,
  promisePOST,
  promisifyGET,
  promisifyPOST,
  discountAsyncGET,
  discountAsyncPOST,
  dataPUT,
  createProduct,
  getProductByUuid,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
