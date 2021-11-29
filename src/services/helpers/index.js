const { filterByItem } = require('./helper1');
const { findTopPrice } = require('./helper2');
const { addPrice } = require('./helper3');
const { validateBodyReq } = require('./validator');
const { httpCodes } = require('./httpCodes');
const { addDiscountPrice } = require('./addDiscountPrice');

module.exports = {
  helper1: filterByItem,
  helper2: findTopPrice,
  helper3: addPrice,
  validator: validateBodyReq,
  httpCodes,
  addDiscountPrice,
};
