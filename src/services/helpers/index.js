const { filterByItem } = require('./helper1');
const { findTopPrice } = require('./helper2');
const { addPrice } = require('./helper3');
const { validateBodyReq } = require('./validator');
const { httpCodes } = require('./httpCodes');
const { addDiscountPrice } = require('./addDiscountPrice');
const { validationAndParse } = require('./validationAndParse');
const { addDiscountPromise } = require('./addDiscountPromise');
const { data } = require('./getData');
const { resFinish } = require('./resFinish');

module.exports = {
  helper1: filterByItem,
  helper2: findTopPrice,
  helper3: addPrice,
  validator: validateBodyReq,
  httpCodes,
  addDiscountPrice,
  validationAndParse,
  addDiscountPromise,
  data,
  resFinish,
};
