const addTotalPriceOfFruit = (obj) => {
  const price =
    obj.priceValue.substring(1).replace(/,/, '.') * obj.measureValue;
  const returnedObj = obj.dataValues || obj;
  return { ...returnedObj, price };
};

const addPrice = (array) => array.map(addTotalPriceOfFruit);

module.exports = { addPrice };
