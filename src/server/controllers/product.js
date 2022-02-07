const { resFinish, httpCodes } = require('../../services/helpers');

const product = require('../../services/product');

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
    resFinish(res, httpCodes.badReq, { error: e.message || e });
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
