const fs = require('fs');

const path = require('path');
const uploadCsv = require('./helpers/uploadCsv');
const { getProducts } = require('./product');
const { createResponse } = require('../utils');
const {
  helper1: filterByItem,
  helper3: addPrice,
  helper2: findTopPrice,
  httpCodes,
  validationAndParse,
} = require('./helpers/index');

function home() {
  return createResponse(httpCodes.ok, { message: 'home' });
}

function notFound() {
  return createResponse(httpCodes.notFound, { error: 'page not found' });
}

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
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    return createResponse(httpCodes.badReq, { error: err.message || err });
  }
}

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
      message: 'products with this params not found',
    });
  }
  return createResponse(httpCodes.ok, result);
}

async function topPrice() {
  try {
    const data = await getProducts();
    if (!data) {
      return createResponse(httpCodes.badReq, {
        message: 'data not found',
      });
    }
    const result = findTopPrice(data);
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    return createResponse(httpCodes.badReq, { error: err.message || err });
  }
}

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

async function commonPriceGET() {
  try {
    const data = await getProducts();
    if (!data) {
      return createResponse(httpCodes.badReq, {
        message: 'data not found',
      });
    }
    const result = addPrice(data);
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    return createResponse(httpCodes.badReq, { error: err.message || err });
  }
}

function commonPricePost(body) {
  const { err, validArray } = validationAndParse(body);
  if (err != null) {
    return createResponse(httpCodes.badReq, { error: err.error });
  }
  const result = addPrice(validArray);
  return createResponse(httpCodes.ok, result);
}

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
  uploadDataCsv,
};
