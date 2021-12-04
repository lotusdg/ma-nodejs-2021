const { Transform } = require('stream');

function createCsvToJson() {
  const transform = (chunk, encoding, callback) => {
    callback(null, 'JSON str\n');
  };

  const flush = callback => {
    console.log('No more data to read.');
    callback(null, 'Finish\n');
  };

  return new Transform({transform, flush});
}

module.exports = {
  createCsvToJson
};
