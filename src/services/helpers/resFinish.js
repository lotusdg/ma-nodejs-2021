function resFinish(res, code, message) {
  res.status(code).json(message);
}

module.exports = { resFinish };
