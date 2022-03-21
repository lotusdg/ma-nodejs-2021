const jwt = require('jsonwebtoken');
const { httpCodes, resFinish } = require('../../services/helpers');
const { accessTokenSecret } = require('../../config');

// eslint-disable-next-line consistent-return
const authorizationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return resFinish(res, httpCodes.unauthorized, { error: 'Non authorized' });
  }
  // eslint-disable-next-line consistent-return
  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      console.error(err);
      return resFinish(res, httpCodes.unauthorized, {
        error: `Non authorized. ${err.message}` || err,
      });
    }
    req.user = user;
    next();
  });
};

module.exports = { authorizationMiddleware };
