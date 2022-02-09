const { resFinish, httpCodes } = require('../../services/helpers');

const services = require('../../services');

async function createProduct(req, res) {
  try {
    const { code, message } = await services.createProduct(req.body);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message || e });
  }
}

async function getProductByUuid(req, res) {
  try {
    const { code, message } = await services.getProductByUuid(req.query);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message || e });
  }
}

async function updateProduct(req, res) {
  try {
    const { code, message } = await services.updateProduct(req.body);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message || e });
  }
}

async function deleteProduct(req, res) {
  try {
    const { code } = await services.deleteProduct(req.query);
    resFinish(res, code);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message });
  }
}

async function getAllProducts(req, res) {
  try {
    const result = await services.getProducts();
    resFinish(res, httpCodes.ok, result);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message || e });
  }
}

module.exports = {
  createProduct,
  getProductByUuid,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
