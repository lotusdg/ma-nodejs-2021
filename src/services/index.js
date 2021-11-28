const { ok } = require('assert');
const fs = require('fs');
const path = require('path');
const data = require('../data.json');

const {
  helper1: filterByItem,
  helper3: addPrice,
  helper2: findTopPrice,
  validator: validation,
  httpCodes,
} = require('./helpers/index');

const discount = require('./helpers/discount');

function createResponse(code, message) {
  return {
    code,
    message: JSON.stringify(message),
  };
}

function home() {
  return createResponse(httpCodes.ok, { message: 'home' });
}

function notFound() {
  return createResponse(httpCodes.notFound, { error: 'page not found' });
}

// ---------------------------- filterGET --------------------------------- //

function filter(params) {
  if (params.toString() === '') {
    return createResponse(httpCodes.ok, data);
  }
  let result = data;
  // eslint-disable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    const element = params.get(key);
    result = filterByItem(result, key, element);
  }
  if (result.length > 0) {
    return createResponse(httpCodes.ok, result);
  }
  return createResponse(httpCodes.badReq, { message: 'items not found' });
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
  return createResponse(httpCodes.badReq, {
    message: 'items dont pass the validation',
  });
}

// ------------------------ filterPost ------------------------------- //

function postFilter(body, params) {
  const { err, validArray } = validationAndParse(body);
  if (err != null) {
    return createResponse(httpCodes.badReq, { message: err.message });
  }
  let result = validArray;
  // eslint-disable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    const element = params.get(key);
    result = filterByItem(result, key, element);
  }
  return createResponse(httpCodes.ok, result);
}

// ---------------------------- findTopPriceGET ----------------------------- //

function topPrice() {
  const result = findTopPrice(data);
  return createResponse(httpCodes.ok, result);
}

// ------------------------- findTopPricePost ------------------------------- //

function findTopPricePost(body) {
  const { err, validArray } = validationAndParse(body);
  if (err != null) {
    return createResponse(httpCodes.badReq, err.message);
  }
  const result = findTopPrice(validArray);
  return createResponse(httpCodes.ok, result);
}

// ---------------------------- commonPriceGET ----------------------------- //

function commonPriceGET() {
  const result = addPrice(data);
  return createResponse(httpCodes.ok, result);
}

// ------------------------- commonPricePOST ------------------------------- //

function commonPricePost(body) {
  const { err, validArray } = validationAndParse(body);
  if (err != null) {
    return createResponse(httpCodes.badReq, err.message);
  }
  const result = addPrice(validArray);
  return createResponse(httpCodes.ok, result);
}

// ---------------------------- dataPost ----------------------------- //

function dataPost(body) {
  const { err } = validationAndParse(body);
  if (err != null) {
    return createResponse(httpCodes.badReq, err.message);
  }
  try {
    fs.writeFileSync(path.join(__dirname, '../data.json'), body);
  } catch (e) {
    return createResponse(httpCodes.badReq, e.message);
  }
  return createResponse(httpCodes.ok, 'The json file was rewritten');
}

// ---------------------------- promiseGET ----------------------------- //

function promiseGET() {

  // const addDiscountPrice = (value, data) => {
  //   const dataWithPrice = addPrice(data);
  //   const dataWithPricePriceDiscount = dataWithPrice.map(e => {
  //     let priceWithDiscount;
  //     if(e.item === 'pineapple' && e.type === 'Red Spanish') {
  //       priceWithDiscount = e.price - (e.price*(value*2))/100;
  //     }
  //     else if(e.item === 'orange' && e.type === 'Tangerine') {
  //       priceWithDiscount = e.price -  (e.price*(value*3))/100;
  //     }
  //     else {
  //       priceWithDiscount = e.price -  (e.price*value)/100;
  //     }
  //     return { ...e, priceWithDiscount };
  //   });
  //   return dataWithPricePriceDiscount;
  // };

  const addDiscountPrice = (value, data) => {
    const result = addPrice(data).map(e => {
      let priceWithDiscount;
      const pineapple = 'pineapple';
      const redSpanish = 'Red Spanish';
      const orange = 'orange';
      const tangerine = 'Tangerine';
      if(e.item === pineapple && e.type === redSpanish) {
        priceWithDiscount = e.price - (e.price * (value * 2)) / 100;
      }
      else if(e.item === orange && e.type === tangerine) {
        priceWithDiscount = e.price - (e.price * (value * 3)) / 100;
      }
      else {
        priceWithDiscount = e.price - (e.price * value) / 100;
      }
      return { ...e, priceWithDiscount: +priceWithDiscount.toFixed(2) };
    });
    return result;
  };

  return new Promise((resolve, reject) => {
    function discountCallback(err, value) {
      if(err){
          discount(discountCallback);
      }else{
        const fruitsWithDiscount = addDiscountPrice(value, data);
        resolve(createResponse(httpCodes.ok, fruitsWithDiscount));
      }
    }
    discount(discountCallback);
  });
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
  promiseGET,
};
