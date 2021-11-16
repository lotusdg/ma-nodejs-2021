function addPrice(array) {
  return array.map((element) => {
    const pricePerQuantity = element.pricePerKilo || element.pricePerItem;
    const quantity = element.quantity || element.weight;
    const price = pricePerQuantity.substring(1).replace(/,/, '.') * quantity;
    return { ...element, price };
  });
}

module.exports = { addPrice };
