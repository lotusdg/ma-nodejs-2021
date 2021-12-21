const errorHandler = (err, req, res, next) => {
  if (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { errorHandler };
