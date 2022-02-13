function createResponse(code, message) {
  return { code, message };
}

function fatal(message) {
  console.error(message);
  process.exit(1);
}

module.exports = {
  fatal,
  createResponse,
};
