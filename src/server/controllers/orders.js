const services = require('../../services');

const { resFinish, httpCodes } = require('../../services/helpers');

async function getAllOrders(req, res) {
  try {
    const result = await services.getAllOrders();
    resFinish(res, httpCodes.ok, result);
  } catch (err) {
    resFinish(res, httpCodes.badReq, { error: err.message || err });
  }
}

async function getOrderById(req, res) {
  try {
    const result = await services.getOrderById(req.params.id);
    resFinish(res, httpCodes.ok, result);
  } catch (err) {
    resFinish(res, httpCodes.badReq, { error: err.message || err });
  }
}

async function createOrder(req, res) {
  try {
    const result = await services.createOrder(req.body);
    resFinish(res, httpCodes.ok, result);
  } catch (err) {
    resFinish(res, httpCodes.badReq, { error: err.message || err });
  }
}

async function updateOrder(req, res) {
  try {
    const result = await services.updateOrder({
      orderId: req.params.id,
      ...req.body,
    });
    resFinish(res, httpCodes.ok, result);
  } catch (err) {
    resFinish(res, httpCodes.badReq, { error: err.message || err });
  }
}

async function deleteOrderIfExists(req, res) {
  try {
    const result = await services.deleteOrder(req.params.id);
    resFinish(res, httpCodes.ok, result);
  } catch (err) {
    resFinish(res, httpCodes.badReq, { error: err.message || err });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrderIfExists,
};
