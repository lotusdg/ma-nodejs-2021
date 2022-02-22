// const { loginEnv, passEnv } = require('../../config');
const jwt = require('jsonwebtoken');
const { httpCodes } = require('../../services/helpers/httpCodes');
const { secretKey } = require('../../config');

// eslint-disable-next-line consistent-return
const authorizationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(httpCodes.unauthorized).send({ error: 'Non authorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    console.log(err);
    if (err) return res.status(httpCodes.badReq);
    req.user = user;
    next();
  });

  // const typeAuth = 'Basic';
  // if (!req.headers.authorization) {
  //   return res
  //     .status(httpCodes.unauthorized)
  //     .send({ error: 'Authorization header is absent' });
  // }

  // const [type, token] = req.headers.authorization.split(' ');
  // const [login, pass] = Buffer.from(token, 'base64').toString().split(':');

  // if (type !== typeAuth || login !== loginEnv || pass !== passEnv) {
  //   return res.status(httpCodes.unauthorized).send({ error: 'Non authorized' });
  // }
  // next();
};

module.exports = { authorizationMiddleware };
