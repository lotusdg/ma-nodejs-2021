function findTopPrice(array) {
  const compare = (a, b) => {
    const firstPrice = a.priceValue.replace(',', '.').slice(1) * a.measureValue;
    const secondPrice =
      b.priceValue.replace(',', '.').slice(1) * b.measureValue;
    return firstPrice - secondPrice;
  };

  return array.sort(compare)[array.length - 1];
}

module.exports = { findTopPrice };
