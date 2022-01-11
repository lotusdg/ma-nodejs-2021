const services = require('../services');
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

function filter(req, res) {
  const { message, code } = services.filter(req.query);
  resFinish(res, code, message);
}
function postFilter(req, res) {
  const { message, code } = services.postFilter(req.body, req.query);
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

async function testDBConnection(req, res) {
  try {
    const { code, message } = await services.testDBConnection();
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message });
  }
}

async function createProduct(req, res) {
  try {
    const { code, message } = await services.createProduct(req);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message });
  }
}

async function getProductById(req, res) {
  try {
    const { code, message } = await services.getProductById(req.query);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message });
  }
}

async function updateProduct(req, res) {
  try {
    const { code, message } = await services.updateProductPut(req);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const { code, message } = await services.deleteProduct(req.query);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message });
  }
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
  discountAsyncGET,
  discountAsyncPOST,
  dataPUT,
  testDBConnection,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
