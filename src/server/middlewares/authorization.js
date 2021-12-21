const { loginEnv, passEnv } = require('../../config');
const { httpCodes } = require('../../services/helpers/httpCodes');

const authorizationMiddleware = (req, res, next) => {
  const typeAuth = 'Basic';
  if (!req.headers.authorization) {
    return res
      .status(httpCodes.unauthorized)
      .send({ error: 'Authorization header is absent' });
  }

  const [type, token] = req.headers.authorization.split(' ');
  const [login, pass] = Buffer.from(token, 'base64').toString().split(':');

  if (type !== typeAuth || login !== loginEnv || pass !== passEnv) {
    return res.status(httpCodes.unauthorized).send({ error: 'Non authorized' });
  }
  next();
};

module.exports = { authorizationMiddleware };
