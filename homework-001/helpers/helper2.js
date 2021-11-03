function findTopPrice(array) {
  if (!Array.isArray(array)) array = require('../data.json');

  array.forEach((element) => {
    if (element.pricePerItem === undefined)
      element.totalPrice =
        +element.pricePerKilo.substring(1).replace(/,/, '.') * element.weight;
    else
      element.totalPrice =
        +element.pricePerItem.substring(1).replace(/,/, '.') * element.quantity;
  });

  array.sort(function (a, b) {
    if (a.totalPrice > b.totalPrice) {
      return 1;
    }
    if (a.totalPrice < b.totalPrice) {
      return -1;
    }
    return 0;
  });

  array.forEach((element) => {
    delete element.totalPrice;
  });

  return array[array.length - 1];
}

module.exports = { findTopPrice };
