const util = require('util');

const discount = require('./helpers/discount');
const { getProducts } = require('./product');
const { createResponse } = require('../utils');
const {
  httpCodes,
  addDiscountPrice,
  validationAndParse,
  addDiscountPromise,
} = require('./helpers/index');

async function promiseGET() {
  const data = await getProducts();
  return new Promise((resolve) => {
    addDiscountPromise(data).then((fruitsWithDiscount) => {
      resolve(createResponse(httpCodes.ok, fruitsWithDiscount));
    });
  });
}

function promisePOST(body) {
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    if (!body.length) return reject(new Error('data not found'));
    const { err, validArray } = validationAndParse(body);
    if (err != null) {
      return reject(new Error(`${err.error}`));
    }
    addDiscountPromise(validArray).then((fruitsWithDiscount) => {
      resolve(createResponse(httpCodes.ok, fruitsWithDiscount));
    });
  });
}

async function promisifyGET() {
  const data = await getProducts();
  const discountPromisify = util.promisify(discount);
  return new Promise((resolve) => {
    discountPromisify()
      .then((value) => {
        const fruitsWithDiscount = addDiscountPrice(value, data);
        resolve(createResponse(httpCodes.ok, fruitsWithDiscount));
      })
      .catch(() => promisifyGET());
  });
}

function promisifyPOST(body) {
  const discountPromisify = util.promisify(discount);
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    const { err, validArray } = validationAndParse(body);
    if (err != null) {
      return reject(new Error(`${err.error}`));
    }
    discountPromisify()
      .then((value) => {
        const fruitsWithDiscount = addDiscountPrice(value, validArray);
        resolve(createResponse(httpCodes.ok, fruitsWithDiscount));
      })
      .catch(() => promisifyPOST(body));
  });
}

async function discountAsyncGET() {
  const { code, message } = await promiseGET();
  return createResponse(code, message);
}

async function discountAsyncPOST(body) {
  const { code, message } = await promisePOST(body);
  return createResponse(code, message);
}

module.exports = {
  promiseGET,
  promisePOST,
  promisifyGET,
  promisifyPOST,
  discountAsyncGET,
  discountAsyncPOST,
};
