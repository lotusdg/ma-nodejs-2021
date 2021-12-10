const { Transform } = require('stream');
const { chunkToJson } = require('./chunkToJson');
const { createCorrectObj } = require('./createCorrectObj');
const { deleteDoubles } = require('./deleteDoubles');

function createCsvToJsonOld() {
  let isFirstChunk = true;
  let headers;
  let lastLine;

  const transform = (chunk, encoding, callback) => {
    if (isFirstChunk) {
      isFirstChunk = false;
      const strChunk = chunk.toString();
      const arrayChunk = strChunk.split('\n');
      headers = arrayChunk[0].split(',');
      lastLine = arrayChunk[arrayChunk.length - 1];

      const chunkInJson = chunkToJson(strChunk, arrayChunk, headers);

      const chunkWithoutDoubles = deleteDoubles(chunkInJson);

      const chunkInHelpersFormat = createCorrectObj(chunkWithoutDoubles);

      callback(null, JSON.stringify(chunkInHelpersFormat));
      return;
    }

  const strChunk = chunk.toString();
  const chunkWithLastLine = lastLine.concat(strChunk);
  const arrayChunk = chunkWithLastLine.split('\n');
  lastLine = arrayChunk[arrayChunk.length - 1];

  const chunkInJson = chunkToJson(strChunk, arrayChunk, headers);

  const chunkWithoutDoubles = deleteDoubles(chunkInJson);

  const chunkInHelpersFormat = createCorrectObj(chunkWithoutDoubles);

  callback(null, JSON.stringify(chunkInHelpersFormat));

  };
  return new Transform({ transform });
}

module.exports = createCsvToJsonOld;
