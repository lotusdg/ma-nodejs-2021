const services = require('../services');

function home(req, res) {
  const { message, code } = services.home();
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({ message, code }));
  res.statusCode = code;
  res.end();
}

function notFound(req, res) {
  const { message, code } = services.notFound();
  res.statusCode = code;
  res.write(message);
  res.end();
}

function store(req, res) {
  const { message, code } = services.store(req.params);
  res.statusCode = code;
  res.write(message);
  res.end();
}
function poststore(req, res) {
  const { message, code } = services.poststore(
    req.params,
    JSON.parse(req.body),
  );
  res.statusCode = code;
  res.write(message);
  res.end();
}

module.exports = {
  home,
  notFound,
  store,
  poststore,
};
