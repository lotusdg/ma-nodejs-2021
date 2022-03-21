const { resFinish } = require('../../services/helpers');

const services = require('../../services');

async function refreshJwt(req, res) {
  const { code, message } = await services.refreshJwt(req.body);
  resFinish(res, code, message);
}

module.exports = { refreshJwt };
