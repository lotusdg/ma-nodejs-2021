const errorHandler = (err, req, res, next) => {
  if (err) {
    return res.status(500).json({ Error: err.message });
  }
};

module.exports = { errorHandler };
