const { resFinish, httpCodes } = require('../../services/helpers');

const services = require('../../services');

async function createProduct(req, res) {
  try {
    const { code, message } = await services.findOrCreate(req.body);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message || e });
  }
}

async function getProductByUuid(req, res) {
  try {
    const { code, message } = await services.getProductByUuid(req.params.uuid);
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message || e });
  }
}

async function updateProduct(req, res) {
  try {
    const { code, message } = await services.updateProduct(
      req.body,
      req.params.uuid,
    );
    resFinish(res, code, message);
  } catch (e) {
    resFinish(res, httpCodes.badReq, { error: e.message || e });
  }
}

async function deleteProduct(req, res) {
  try {
    const { code } = await services.deleteProduct(req.params.uuid);
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
