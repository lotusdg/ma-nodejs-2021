const { Transform } = require('stream');
const { chunkToJson } = require('./chunkToJson');
const { createCorrectObj } = require('./createCorrectObj');
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

      const chunkInJson = chunkToJson(strChunk, arrayChunk, headers);

      const chunkWithoutDoubles = deleteDoubles(chunkInJson);

      const chunkInHelpersFormat = createCorrectObj(chunkWithoutDoubles);

      isFirst = false;

      try {
        callback(null, JSON.stringify(chunkInHelpersFormat));
      } catch (e) {
        console.error(e);
      }

      return;
    }

    const strChunk = chunk.toString();
    const chunkWithLastLine = lastLine.concat(strChunk);
    const arrayChunk = chunkWithLastLine.split('\n');
    lastLine = arrayChunk[arrayChunk.length - 1];

    const chunkInJson = chunkToJson(strChunk, arrayChunk, headers);

    const chunkWithoutDoubles = deleteDoubles(chunkInJson);

    const chunkInHelpersFormat = createCorrectObj(chunkWithoutDoubles);

    try {
      callback(null, JSON.stringify(chunkInHelpersFormat));
    } catch (e) {
      console.error(e);
    }

  };

  return new Transform({ transform });
}

module.exports = createCsvToJson;
