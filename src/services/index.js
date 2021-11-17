const fs = require('fs');
const path = require('path');
const data = require('../data.json');

const {
  helper1: filterByItem,
  helper3: addPrice,
  helper2: findTopPrice,
  validator: validation,
} = require('./helpers/index');

function successMessage(message) {
  return {
    code: 200,
    message: JSON.stringify(message),
  };
}

function home() {
  return successMessage('home');
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
    successMessage(data);
  }
  let result = data;
  // eslint-disable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    const element = params.get(key);
    result = filterByItem(result, key, element);
  }
  if (result.length > 0) {
    return successMessage(result);
  }
  return {
    code: 204,
    message: 'items not found',
  };
}

// --------------------------- validation ---------------------------------- //

function validationAndParse(bodyData) {
  if (bodyData.length > 0) {
    let validArray;
    try {
      validArray = JSON.parse(bodyData);
      validation(validArray);
    } catch (e) {
      return {
        err: {
          code: 400,
          message: `The Obj of items had not pass the validation\n${e.message}`,
        },
        validArray: null,
      };
    }
    return { err: null, validArray };
  }
  return {
    code: 400,
    message: 'The Obj of items had not pass the validation',
  };
}

// ------------------------ filterPost ------------------------------- //

function postFilter(body, params) {
  const { err, validArray } = validationAndParse(body);
  if (err != null) {
    return {
      code: err.code,
      message: err.message,
    };
  }
  let result = validArray;
  // eslint-disable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    const element = params.get(key);
    result = filterByItem(result, key, element);
  }
  return successMessage(result);
}

// ---------------------------- findTopPriceGET ----------------------------- //

function topPrice() {
  const result = findTopPrice(data);
  return successMessage(result);
}

// ------------------------- findTopPricePost ------------------------------- //

function findTopPricePost(body) {
  const { err, validArray } = validationAndParse(body);
  if (err != null) {
    return {
      code: err.code,
      message: err.message,
    };
  }
  const result = findTopPrice(validArray);
  return successMessage(result);
}

// ---------------------------- commonPriceGET ----------------------------- //

function commonPriceGET() {
  const result = addPrice(data);
  return successMessage(result);
}

// ------------------------- commonPricePOST ------------------------------- //

function commonPricePost(body) {
  const { err, validArray } = validationAndParse(body);
  if (err != null) {
    return {
      code: err.code,
      message: err.message,
    };
  }
  const result = addPrice(validArray);
  return successMessage(result);
}

// ---------------------------- dataPost ----------------------------- //

function dataPost(body) {
  const { err, validArray } = validationAndParse(body);
  if (err != null) {
    return {
      code: err.code,
      message: err.message,
    };
  }
  try {
    fs.writeFileSync(path.join(__dirname, '../data.json'), body);
  } catch (e) {
    return {
      code: 400,
      message: e.message,
    };
  }
  return {
    code: 201,
    message: 'The json file was rewritten',
  };
}

module.exports = {
  home,
  notFound,
  filter,
  postFilter,
  topPrice,
  findTopPricePost,
  commonPriceGET,
  commonPricePost,
  dataPost,
};
