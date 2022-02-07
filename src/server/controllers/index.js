const common = require('./common');
const discount = require('./discount');
const product = require('./product');
const orders = require('./orders');

module.exports = {
  ...common,
  ...discount,
  ...product,
  ...orders,
};
