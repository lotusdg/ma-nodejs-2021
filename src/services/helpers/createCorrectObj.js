function createCorrectObj(jsonObjects) {
  const correctJsonObjects = [];

  jsonObjects.forEach((object) => {
    const correctObject = {};
    correctObject.item = object.item;
    correctObject.type = object.type;
    if (object.measure === 'quantity') {
      correctObject.quantity = object.measureValue;
    } else if (object.measure === 'weight') {
      correctObject.weight = object.measureValue;
    } else {
      throw new Error('Incorrect csv object measure');
    }
    if (object.priceType === 'pricePerItem') {
      correctObject.pricePerItem = object.priceValue.replace(',', '.');
    } else if (object.priceType === 'pricePerKilo') {
      correctObject.pricePerKilo = object.priceValue.replace(',', '.');
    } else {
      throw new Error('Incorrect csv object priceValue');
    }
    correctJsonObjects.push(correctObject);
  });

  return correctJsonObjects;
}

module.exports = { createCorrectObj };
