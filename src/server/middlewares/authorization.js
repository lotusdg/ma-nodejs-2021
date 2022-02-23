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
  // eslint-disable-next-line consistent-return
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(httpCodes.badReq);
    }
    req.user = user;
    next();
  });
};

module.exports = { authorizationMiddleware };
