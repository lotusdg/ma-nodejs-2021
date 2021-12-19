const server = require('./routes/routes');

require('dotenv').config();

let listener;

function start() {
  listener = server.listen(process.env.PORT, () => {
    console.log(`Server successfully started on port ${process.env.PORT}`);
  });
}

function stop(callback) {
  if (!server) return;
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
