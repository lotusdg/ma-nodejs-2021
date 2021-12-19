const { myAuthorization } = require('./authorization');
const { errorHandler } = require('./errorHandler');

module.exports = { authorization: myAuthorization, errorHandler };
