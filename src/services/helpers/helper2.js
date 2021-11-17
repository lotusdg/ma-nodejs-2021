function findTopPrice(array) {
  if (!Array.isArray(array)) {
    array = require('../data.json');
  }

  const compare = (a, b) => {
    const firstPrice =
      (a.pricePerKilo || a.pricePerItem).replace(',', '.').slice(1) *
      (a.weight || a.quantity);
    const secondPrice =
      (b.pricePerKilo || b.pricePerItem).replace(',', '.').slice(1) *
      (b.weight || b.quantity);
    return firstPrice - secondPrice;
  };

  return array.sort(compare)[array.length - 1];
}

module.exports = { findTopPrice };
