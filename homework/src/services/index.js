const data = require('../data.json');

const {
  helper1: filterByItem,
  helper3: addPrice,
  helper2: findTopPrice,
} = require('./helpers/index');

function home() {
  return {
    code: 200,
    message: 'hello world',
  };
}

function notFound() {
  return {
    code: 404,
    message: 'page not found',
  };
}

// ---------------------------- filterGET --------------------------------- //

function filter(params) {
  if (params.toString() === '') {
    return {
      code: 200,
      message: data,
    };
  }
    let result = data;
    // eslint-disable-next-line no-restricted-syntax
    for (const key of params.keys()) {
        const element = params.get(key);
        result = filterByItem(result, key, element);
    }
    if (result.length > 0) {
      return {
        code: 200,
        message: JSON.stringify(result),
      };
    }
      return {
        code: 204,
        message: 'items not found',
      };
}

// --------------------------- validation ---------------------------------- //

function validateBodyReq (obj) {

  function isWeightBased(isWeightObj) {
    return isWeightObj.weight !== 'undefined'
    && typeof isWeightObj.pricePerKilo !== 'undefined';
  }

    if (typeof obj.item !== 'undefined' && typeof obj.item !== 'string') {
      throw new Error('"item" field isn\'t string type');
    }
    if (typeof obj.type !== 'undefined' && typeof obj.type !== 'string') {
      throw new Error('"type" field isn\'t string type');
    }
    if (typeof obj.quantity !== 'undefined'
    && !isWeightBased(obj) && typeof obj.quantity !== 'number') {
      throw new Error('"quantity" field isn\'t number type');
    }
    if (typeof obj.weight !== 'undefined' && isWeightBased(obj) && typeof obj.weight !== 'number') {
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
}

function validationAndParse(bodyData) {
  let validObj;
  try {
    validObj = JSON.parse(bodyData);
    validateBodyReq(validObj);
  } catch (e) {
    return {
      err: {
        code: 400,
        message: `The Obj of items had not pass the validation\n${e.message}`,
      },
      validObj: null,
    };
  }
  return { err: null, validObj };
}

// ------------------------ filterPost ------------------------------- //

function postFilter(body) {
  if (body.length > 0) {
    const { err, validObj } = validationAndParse(body);
    if (err === null) {
      let result = data;
       // eslint-disable-next-line no-restricted-syntax
       for (const key in validObj) {
         if (Object.hasOwnProperty.call(validObj, key)) {
           const element = validObj[key];
           result = filterByItem(result, key, element);
         }
       }
       return {
        code: 200,
        message: JSON.stringify(result),
      };
    }
      return {
        code: err.code,
        message: err.message,
      };
  }
    return {
      code: 200,
      message: data,
    };
}

module.exports = {
  home,
  notFound,
  filter,
  postFilter,
};
