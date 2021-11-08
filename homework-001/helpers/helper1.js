function filterByItem(array, param, value) {
  const result = array.filter((element) => element[param] === value);
  return result;
}

module.exports = { filterByItem };
