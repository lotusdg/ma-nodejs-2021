const fs = require('fs');

const path = require('path');

const util = require('util');

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
const { getProducts } = require('./product');

function createResponse(code, message) {
  return { code, message };
}

function home() {
  return createResponse(httpCodes.ok, { message: 'home' });
}

function notFound() {
  return createResponse(httpCodes.notFound, { error: 'page not found' });
}

// ------------------------ filterGET ------------------------------- //

async function getFilter(params) {
  try {
    let result = await getProducts();
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(params)) {
      const element = params[key];
      result = filterByItem(result, key, element);
    }
    if (result.length === 0) {
      return createResponse(httpCodes.badReq, {
        message: 'products with this params not found',
      });
    }
    return createResponse(httpCodes.ok, { message: result });
  } catch (err) {
    return createResponse(httpCodes.badReq, { error: err.message || err });
  }
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
  if (result.length === 0) {
    return createResponse(httpCodes.badReq, {
      message: 'products not found',
    });
  }
  return createResponse(httpCodes.ok, { message: result });
}

// ---------------------------- findTopPriceGET ----------------------------- //

async function topPrice() {
  try {
    const dataFromDB = await getProducts();
    const result = findTopPrice(dataFromDB);
    return createResponse(httpCodes.ok, { message: result });
  } catch (err) {
    return createResponse(httpCodes.badReq, { error: err.message || err });
  }
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

async function commonPriceGET() {
  try {
    const dataFromDB = await getProducts();
    const result = addPrice(dataFromDB);
    return createResponse(httpCodes.ok, { message: result });
  } catch (err) {
    return createResponse(httpCodes.badReq, { error: err.message || err });
  }
}

// ------------------------- commonPricePOST ------------------------------- //

function commonPricePost(body) {
  const { err, validArray } = validationAndParse(body);
  if (err != null) {
    return createResponse(httpCodes.badReq, { error: err.error });
  }
  const result = addPrice(validArray);
  return createResponse(httpCodes.ok, { message: result });
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

async function promiseGET() {
  const dataFromDB = await getProducts();
  return new Promise((resolve) => {
    addDiscountPromise(dataFromDB).then((fruitsWithDiscount) => {
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

async function promisifyGET() {
  const dataFromDB = await getProducts();
  const discountPromisify = util.promisify(discount);
  return new Promise((resolve) => {
    discountPromisify()
      .then((value) => {
        const fruitsWithDiscount = addDiscountPrice(value, dataFromDB);
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
    return createResponse(httpCodes.badReq, {
      error: 'Can not convert csv to JSON',
    });
  }
}

module.exports = {
  home,
  notFound,
  getFilter,
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
};
