const http = require('http');
const requestHandler = require('./requestHandler');

const server = http.createServer(requestHandler);

function start() {
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`);
  });
}

function stop(callback) {
  server.close((err) => {
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
