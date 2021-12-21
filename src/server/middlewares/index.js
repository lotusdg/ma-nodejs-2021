const { authorizationMiddleware } = require('./authorization');
const { errorHandler } = require('./errorHandler');

module.exports = { authorization: authorizationMiddleware, errorHandler };
