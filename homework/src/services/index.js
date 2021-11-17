const fs = require('fs');
const path = require('path');
const data = require('../data.json');

const {
  helper1: filterByItem,
  helper3: addPrice,
  helper2: findTopPrice,
  validator: validation,
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
      message: JSON.stringify(data),
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

function validationAndParse(bodyData) {
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

// ------------------------ filterPost ------------------------------- //

function postFilter(body) {
  if (body.length > 0) {
    const { err, validArray } = validationAndParse(body);
    if (err === null) {
      let result = data;
      validArray.forEach((elementObj) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in elementObj) {
          if (Object.hasOwnProperty.call(elementObj, key)) {
            const element = elementObj[key];
            result = filterByItem(result, key, element);
          }
        }
      });
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

// ---------------------------- findTopPriceGET ----------------------------- //

function topPrice() {
  const result = findTopPrice(data);
  return {
    code: 200,
    message: JSON.stringify(result),
  };
}

// ------------------------- findTopPricePost ------------------------------- //

function findTopPricePost(body) {
  if (body.length > 0) {
    const { err, validArray } = validationAndParse(body);
    if (err === null) {
      const result = findTopPrice(validArray);
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
    code: 400,
    message: 'The Obj of items had not pass the validation',
  };
}

// ---------------------------- commonPriceGET ----------------------------- //

function commonPriceGET() {
  const result = addPrice(data);
  return {
    code: 200,
    message: JSON.stringify(result),
  };
}

// ------------------------- commonPricePOST ------------------------------- //

function commonPricePost(body) {
  if (body.length > 0) {
    const { err, validArray } = validationAndParse(body);
    if (err === null) {
      const result = addPrice(validArray);
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
    code: 400,
    message: 'The Obj of items had not pass the validation',
  };
}

// ---------------------------- dataPost ----------------------------- //

function dataPost(body) {
  if (body.length > 0) {
    const { err } = validationAndParse(body);
    if (err === null) {
      fs.renameSync(
        path.join(__dirname, '../data.json'),
        path.join(__dirname, '../data.json.bak'),
      );
      fs.appendFileSync(path.join(__dirname, '../data.json'), body);
      return {
        code: 201,
        message: 'The json file was rewritten',
      };
    }
    return {
      code: err.code,
      message: err.message,
    };
  }
  return {
    code: 400,
    message: 'The Obj of items had not pass the validation',
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
