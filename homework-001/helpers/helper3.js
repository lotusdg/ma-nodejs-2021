function addPrice(array) {
  array.forEach((element) => {
    if (element.pricePerItem === undefined)
      element.price =
        +element.pricePerKilo.substring(1).replace(/,/, '.') * element.weight;
    else
      element.price =
        +element.pricePerItem.substring(1).replace(/,/, '.') * element.quantity;
  });
  return array;
}

module.exports = { addPrice };
