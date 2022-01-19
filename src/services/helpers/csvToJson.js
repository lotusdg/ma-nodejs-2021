const { Transform } = require('stream');
const { chunkToJson } = require('./chunkToJson');
const { deleteDoubles } = require('./deleteDoubles');
const product = require('../product');

function createCsvToJsonOld() {
  let isFirstChunk = true;
  let headers;
  let lastLine;
  const result = [];

  const transform = (chunk, encoding, callback) => {
    if (isFirstChunk) {
      isFirstChunk = false;
      const strChunk = chunk.toString();
      const arrayChunk = strChunk.split('\n');
      headers = arrayChunk[0].split(',');
      lastLine = arrayChunk[arrayChunk.length - 1];

      const chunkInJson = chunkToJson(strChunk, arrayChunk, headers);

      result.push(chunkInJson);

      callback(null);
      return;
    }

    const strChunk = chunk.toString();
    const chunkWithLastLine = lastLine.concat(strChunk);
    const arrayChunk = chunkWithLastLine.split('\n');
    lastLine = arrayChunk[arrayChunk.length - 1];

    const chunkInJson = chunkToJson(strChunk, arrayChunk, headers);

    result.push(chunkInJson);

    callback(null);
  };

  const flush = async (callback) => {
    console.log('No more data to read! Inserting data...');
    const newArray = result.flat();
    const chunkWithoutDoubles = deleteDoubles(newArray);

    // eslint-disable-next-line no-restricted-syntax
    for (const obj of chunkWithoutDoubles) {
      const Obj = obj;
      try {
        // eslint-disable-next-line no-await-in-loop
        const { message } = await product.getAllProducts(Obj);
        if (message.message === 'There is no items') {
          // eslint-disable-next-line no-await-in-loop
          await product.createProduct(Obj);
        } else {
          Obj.uuid = message.message[0].uuid;
          Obj.measureValue += message.message[0].measureValue;
          // eslint-disable-next-line no-await-in-loop
          await product.updateProduct(Obj);
        }
      } catch (err) {
        console.error(err.message || err);
        throw new Error(err);
      }
    }
    callback(null);
  };

  return new Transform({ transform, flush });
}

module.exports = createCsvToJsonOld;
