// const { loginEnv, passEnv } = require('../../config');
const jwt = require('jsonwebtoken');
const { httpCodes } = require('../../services/helpers/httpCodes');
const { accessTokenSecret } = require('../../config');

// eslint-disable-next-line consistent-return
const authorizationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(httpCodes.unauthorized).send({ error: 'Non authorized' });
  }
  // eslint-disable-next-line consistent-return
  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      console.error('Error:', err.message || err);
      return res
        .status(httpCodes.unauthorized)
        .send({ error: `Non authorized. ${err.message || err}` });
    }
    req.user = user;
    next();
  });
};

module.exports = { authorizationMiddleware };
