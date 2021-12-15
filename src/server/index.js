const express = require('express');

// const requestHandler = require('./requestHandler');
const { port } = require('../config');

const server = express();

let listener;

function start() {
  listener = server.listen(port, () => {
    console.log(`Server successfully started on port ${port}`);
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
