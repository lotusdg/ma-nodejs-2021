function filterByItem(array, param, value) {
  let result = [];
  result = array.filter(
    (element) =>
      element.item === param &&
      (element.weight === value || element.quantity === value),
  );
  return result;
}

module.exports = { filterByItem };
