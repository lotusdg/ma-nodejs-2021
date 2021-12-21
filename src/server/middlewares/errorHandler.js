const { httpCodes } = require('../../services/helpers');

const errorHandler = (err, req, res) => {
  if (err) {
    return res.status(httpCodes.serverError).json({ error: err.message });
  }
  return res.status(httpCodes.ok).json({ error: false });
};

module.exports = { errorHandler };
