const { resFinish } = require('../../services/helpers');

const services = require('../../services');

async function login(req, res) {
  const { code, message } = await services.login(req.body);
  resFinish(res, code, message);
}

module.exports = { login };
