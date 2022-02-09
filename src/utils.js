function createResponse(code, message) {
  return { code, message };
}

module.exports = {
  fatal: (message) => {
    console.error(message);
    process.exit(1);
  },
  createResponse,
};
