const { Transform } = require('stream');
const { chunkToJson } = require('./chunkToJson');
const { deleteDoubles } = require('./deleteDoubles');
const models = require('../../db/models');

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
      const res = await models.product.findAll({
        where: {
          item: obj.item,
          type: obj.type,
          priceValue: obj.priceValue,
          deleteDate: null,
        },
        raw: true,
        nest: true,
      });
      console.log(res);
      if (res.length === 0) {
        // eslint-disable-next-line no-await-in-loop
        await models.product.create(
          {
            item: obj.item,
            type: obj.type,
            measure: obj.measure,
            measureValue: obj.measureValue,
            priceType: obj.priceType,
            priceValue: obj.priceValue,
          },
          {
            returning: true,
          },
        );
      } else {
        const existedProduct = res[0];
        existedProduct.measureValue += obj.measureValue;
        // eslint-disable-next-line no-await-in-loop
        await models.product.update(existedProduct, {
          where: { uuid: existedProduct.uuid },
          returning: true,
        });
      }
    }
    callback(null);
  };

  return new Transform({ transform, flush });
}

module.exports = createCsvToJsonOld;
