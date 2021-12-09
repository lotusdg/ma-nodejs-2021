const { Transform } = require('stream');
const { chunkToJson } = require('./chunkToJson');
const { deleteDoubles } = require('./deleteDoubles');

function createCsvToJson() {
  let isFirst = true;
  let headers;
  let lastLine;

  const transform = (chunk, encoding, callback) => {
    if (isFirst) {
      const strChunk = chunk.toString();
      const arrayChunk = strChunk.split('\n');
      headers = arrayChunk[0].split(',');
      lastLine = arrayChunk[arrayChunk.length - 1];

      const result = chunkToJson(strChunk, arrayChunk, headers);

      isFirst = false;

      const resultWithoutDoubles = deleteDoubles(result);

      callback(null, JSON.stringify(resultWithoutDoubles));

      return;
    }

    const strChunk = chunk.toString();
    const chunkWithLastLine = lastLine.concat(strChunk);
    const arrayChunk = chunkWithLastLine.split('\n');
    lastLine = arrayChunk[arrayChunk.length - 1];

    const result = chunkToJson(strChunk, arrayChunk, headers);

    const resultWithoutDoubles = deleteDoubles(result);

    callback(null, JSON.stringify(resultWithoutDoubles));
  };

  const flush = () => {
    console.log('No more data to read.');
    // callback(null, '');
  };

  return new Transform({ transform, flush });
}

module.exports = {
  createCsvToJson,
};
