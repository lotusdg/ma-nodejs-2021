const { login, password } = require('../../config');

const authorizationMiddleware = (req, res, next) => {
  if (req.headers.authorization !== undefined) {
    try {
      const myArray = req.headers.authorization.split(' ');
      if (myArray[0] === 'Basic') {
        const authStr = Buffer.from(myArray[1], 'base64').toString();
        const authObj = JSON.parse(
          authStr
            .replace(/ /g, ' "')
            .replace(/:/g, '":')
            .replace(',', '",')
            .replace('}', '"}'),
        );
        if (authObj.username === login && authObj.password === password)
          return next();
        return res.status(401).send({ message: 'Incorrect login/password' });
      }
    } catch (e) {
      return res
        .status(401)
        .send({ message: `Error validation login/pass, ${e}` });
    }
  }
  res.json({ user: 'guest' });
};

module.exports = { authorizationMiddleware };
