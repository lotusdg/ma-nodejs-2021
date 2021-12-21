const { portEnv } = require('../config');
const server = require('./routes/routes');

let listener;

function start() {
  listener = server.listen(portEnv, () => {
    console.log(`Server successfully started on port ${portEnv}`);
  });
}

function stop(callback) {
  if (!server) {
    callback();
    return;
  }
  listener.close((err) => {
    if (err) {
      console.error(err, 'Failed to close server!');
      callback();
      return;
    }
    console.log('Server has been stopped.');
    callback();
  });
}

module.exports = {
  start,
  stop,
};
