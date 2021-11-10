const data = require('../data.json');

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

function filter(params) {
  //let textStr = '';
  let resultArray = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    resultArray.push(key);
  }

  return {
    code: 200,
    message: JSON.stringify(resultArray || data),
  };
}

function store(params) {
  let text = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    console.log(key);
    text += `key is ${key} and value ${params.get(key)}\n`;
  }
  return {
    code: 200,
    message: text,
  };
  }

function poststore(params, body) {
  let text = '';
  // eslint-disletable-next-line no-restricted-syntax
  for (const key of params.keys()) {
    console.log(key);
    text += `key is ${key} and value ${params.get(key)}\n`;
  }

  text += JSON.stringify(body);

  return {
    code: 200,
    message: text,
  };
}

module.exports = {
  home,
  notFound,
  store,
  poststore,
  filter,
};
