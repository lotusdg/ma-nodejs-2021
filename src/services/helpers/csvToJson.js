const { Transform } = require('stream');
// const { createProductDb, Product, updateProductDb } = require('../../db/models');
const { chunkToJson } = require('./chunkToJson');
const { deleteDoubles } = require('./deleteDoubles');

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
      // eslint-disable-next-line no-await-in-loop
      const res = await Product.findAll({
        where: {
          item: obj.item,
          type: obj.type,
          priceValue: obj.priceValue,
          deleteDate: null,
        },
        raw: true,
        nest: true,
      });
      if (res.length === 0) {
        createProductDb({
          item: obj.item,
          type: obj.type,
          measure: obj.measure,
          measureValue: obj.measureValue,
          priceType: obj.priceType,
          priceValue: obj.priceValue,
        });
      } else {
        const existedProduct = res[0];
        existedProduct.measureValue += obj.measureValue;
        updateProductDb(existedProduct);
      }
    }
    callback(null);
  };

  return new Transform({ transform, flush });
}

module.exports = createCsvToJsonOld;
