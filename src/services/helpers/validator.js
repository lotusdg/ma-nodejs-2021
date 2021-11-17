function validateBodyReq(array) {
  function isWeightBased(data) {
    return (
      data.weight !== 'undefined' && typeof data.pricePerKilo !== 'undefined'
    );
  }

  array.forEach((obj) => {
    if (typeof obj.item !== 'undefined' && typeof obj.item !== 'string') {
      throw new Error('"item" field isn\'t string type');
    }
    if (typeof obj.type !== 'undefined' && typeof obj.type !== 'string') {
      throw new Error('"type" field isn\'t string type');
    }
    if (
      typeof obj.quantity !== 'undefined' &&
      !isWeightBased(obj) &&
      typeof obj.quantity !== 'number'
    ) {
      throw new Error('"quantity" field isn\'t number type');
    }
    if (
      typeof obj.weight !== 'undefined' &&
      isWeightBased(obj) &&
      typeof obj.weight !== 'number'
    ) {
      throw new Error('"weight" field isn\'t number type');
    }
    if (
      typeof obj.pricePerItem !== 'undefined' &&
      !isWeightBased(obj) &&
      typeof obj.pricePerItem !== 'string' &&
      Number.isNaN(+obj.pricePerItem.replace('$', ''))
    ) {
      throw new Error('"pricePerItem" field has incorrect type');
    }
    if (
      typeof obj.pricePerKilo !== 'undefined' &&
      isWeightBased(obj) &&
      typeof obj.pricePerKilo !== 'string' &&
      Number.isNaN(+obj.pricePerKilo.replace('$', ''))
    ) {
      throw new Error('"pricePerKilo" field has incorrect type');
    }
  });
}

module.exports = { validateBodyReq };
