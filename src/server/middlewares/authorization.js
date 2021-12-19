require('dotenv').config();

const myAuthorization = (req, res, next) => {
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
      if (
        authObj.username === process.env.LOGIN &&
        authObj.password === process.env.PASSWORD
      )
        return next();
      return res.status(401).send({ message: 'Incorrect login/password' });
    }
  } catch (e) {
    return res
      .status(401)
      .send({ message: `Error validation login/pass, ${e}` });
  }
};

module.exports = { myAuthorization };
