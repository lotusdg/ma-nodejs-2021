const fs = require('fs');

const path = require('path');

const util = require('util');

const { db: dbConfig } = require('../config');
const db = require('../db')(dbConfig);

const {
  helper1: filterByItem,
  helper3: addPrice,
  helper2: findTopPrice,
  httpCodes,
  addDiscountPrice,
  validationAndParse,
  addDiscountPromise,
  data,
} = require('./helpers/index');

const discount = require('./helpers/discount');
const uploadCsv = require('./helpers/uploadCsv');

function createResponse(code, message) {
  return { code, message };
}

function home() {
  return createResponse(httpCodes.ok, { message: 'home' });
}

function notFound() {
  return createResponse(httpCodes.notFound, { error: 'page not found' });
}

// ---------------------------- filterGET --------------------------------- //

function filter(params) {
  if (!Object.keys(params).length) {
    return createResponse(httpCodes.ok, data);
  }
  let result = data;
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(params)) {
    const element = params[key];
    result = filterByItem(result, key, element);
  }
  if (result.length > 0) {
    return createResponse(httpCodes.ok, result);
  }
  return createResponse(httpCodes.badReq, { message: 'items not found' });
}

// ------------------------ filterPost ------------------------------- //

function postFilter(body, params) {
  if (!body.length)
    return createResponse(httpCodes.badReq, { message: 'data not found' });
  const { err, validArray } = validationAndParse(body);
  if (err != null) {
    return createResponse(httpCodes.badReq, { error: err.error });
  }
  let result = validArray;
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(params)) {
    const element = params[key];
    result = filterByItem(result, key, element);
  }
  return createResponse(httpCodes.ok, result);
}

// ---------------------------- findTopPriceGET ----------------------------- //

function topPrice() {
  const result = findTopPrice(data);
  return createResponse(httpCodes.ok, result);
}

// ------------------------- findTopPricePost ------------------------------- //

function findTopPricePost(body) {
  if (!body.length)
    return createResponse(httpCodes.badReq, { message: 'data not found' });
  const { err, validArray } = validationAndParse(body);
  if (err != null) {
    return createResponse(httpCodes.badReq, { error: err.error });
  }
  const result = findTopPrice(validArray);
  return createResponse(httpCodes.ok, result);
}

// ---------------------------- commonPriceGET ----------------------------- //

function commonPriceGET() {
  const result = addPrice(data);
  return createResponse(httpCodes.ok, result);
}

// ------------------------- commonPricePOST ------------------------------- //

function commonPricePost(body) {
  const { err, validArray } = validationAndParse(body);
  if (err != null) {
    return createResponse(httpCodes.badReq, { error: err.error });
  }
  const result = addPrice(validArray);
  return createResponse(httpCodes.ok, result);
}

// ---------------------------- dataPost ----------------------------- //

function dataPost(body) {
  const { err } = validationAndParse(body);
  if (err != null) {
    return createResponse(httpCodes.badReq, { error: err.error });
  }
  try {
    fs.writeFileSync(
      path.join(__dirname, '../data.json'),
      JSON.stringify(body),
    );
  } catch (e) {
    return createResponse(httpCodes.badReq, { error: e.message });
  }
  return createResponse(httpCodes.ok, {
    message: 'The json file was rewritten',
  });
}

// ---------------------------- promiseGET ----------------------------- //

function promiseGET() {
  return new Promise((resolve) => {
    addDiscountPromise(data).then((fruitsWithDiscount) => {
      resolve(createResponse(httpCodes.ok, fruitsWithDiscount));
    });
  });
}

// ---------------------------- promisePOST ----------------------------- //

function promisePOST(body) {
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

// ---------------------------- promisifyGET ----------------------------- //

function promisifyGET() {
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

// ---------------------------- promisifyPOST ----------------------------- //

function promisifyPOST(body) {
  const discountPromisify = util.promisify(discount);
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

// ---------------------------- AsyncGET ----------------------------- //

async function discountAsyncGET() {
  const { code, message } = await promiseGET();
  return createResponse(code, message);
}

// ---------------------------- AsyncPOST ----------------------------- //

async function discountAsyncPOST(body) {
  const { code, message } = await promisePOST(body);
  return createResponse(code, message);
}

// ---------------------------- uploadDataCSV ----------------------------- //

async function uploadDataCsv(req) {
  try {
    const { code, message } = await uploadCsv(req);
    return createResponse(code, { message });
  } catch (err) {
    return createResponse(httpCodes.badRequest, {
      error: 'Can not convert csv to JSON',
    });
  }
}

async function testDBConnection() {
  try {
    const message = await db.testConnection();
    return createResponse(httpCodes.ok, message);
  } catch (err) {
    return createResponse(httpCodes.badRequest, {
      error: 'Failed db connection',
    });
  }
}

async function createProduct(req) {
  try {
    const product = req.body;
    const message = await db.createProduct({
      item: product.item,
      type: product.type,
      measure: product.measure,
      measureValue: product.measureValue,
      priceType: product.priceType,
      priceValue: product.priceValue,
    });
    return createResponse(httpCodes.ok, message);
  } catch (err) {
    return createResponse(httpCodes.badRequest, {
      error: 'Incorrect data',
    });
  }
}

async function getProductById(params) {
  try {
    const message = await db.getProduct(params.id);
    return createResponse(httpCodes.ok, message);
  } catch (err) {
    return createResponse(httpCodes.badRequest, {
      error: 'Failed params',
    });
  }
}

async function updateProductPut(req) {
  try {
    const product = req.body;
    const productFields = {
      id: product.id,
      item: product.item,
      type: product.type,
      measure: product.measure,
      measurevalue: product.measureValue,
      pricetype: product.priceType,
      pricevalue: product.priceValue,
    };
    Object.keys(productFields).forEach((key) => {
      if (typeof productFields[key] === 'undefined') {
        delete productFields[key];
      }
    });
    const message = await db.updateProduct(productFields);
    return createResponse(httpCodes.ok, message);
  } catch (err) {
    return createResponse(httpCodes.badRequest, {
      error: 'Incorrect data',
    });
  }
}

async function deleteProduct(params) {
  try {
    const message = await db.deleteProduct(params.id);
    return createResponse(httpCodes.ok, message);
  } catch (err) {
    return createResponse(httpCodes.badRequest, {
      error: 'Failed params',
    });
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
  createResponse,
  promisifyPOST,
  discountAsyncGET,
  discountAsyncPOST,
  uploadDataCsv,
  testDBConnection,
  createProduct,
  getProductById,
  updateProductPut,
  deleteProduct,
};
