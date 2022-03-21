const common = require('./common');
const discount = require('./discount');
const product = require('./product');
const orders = require('./orders');
const login = require('./login');
const refreshJwt = require('./refresh-jwt');

module.exports = {
  ...common,
  ...discount,
  ...product,
  ...orders,
  ...login,
  ...refreshJwt,
};
