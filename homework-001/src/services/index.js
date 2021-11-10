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
  // eslint-disable-next-line no-restricted-syntax
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
};
