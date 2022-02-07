const orders = require('../../services/orders');

const { resFinish, httpCodes } = require('../../services/helpers');

async function getAllOrders(req, res) {
  try {
    const result = await orders.getAllOrders();
    resFinish(res, httpCodes.ok, result);
  } catch (err) {
    resFinish(res, httpCodes.badReq, { error: err.message || err });
  }
}

async function getOrderById(req, res) {
  try {
    const result = await orders.getOrderById(req.query.ID);
    resFinish(res, httpCodes.ok, result);
  } catch (err) {
    resFinish(res, httpCodes.badReq, { error: err.message || err });
  }
}

async function createOrder(req, res) {
  try {
    const result = await orders.createOrder(req.body);
    resFinish(res, httpCodes.ok, result);
  } catch (err) {
    resFinish(res, httpCodes.badReq, { error: err.message || err });
  }
}

async function updateOrder(req, res) {
  try {
    const result = await orders.updateOrder({
      ID: req.query.ID,
      ...req.body,
    });
    resFinish(res, httpCodes.ok, result);
  } catch (err) {
    resFinish(res, httpCodes.badReq, { error: err.message || err });
  }
}

async function deleteOrderIfExists(req, res) {
  try {
    const result = await orders.deleteOrder(req.query.ID);
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
