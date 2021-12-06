const { Transform } = require('stream');
const isEqual = require('lodash.isequal');

function regExp(str) {
  return str
    .replace(/((?<=\$\d)|(?<=\$\d\d)|(?<=\$\d\d\d)|(?<=\$\d\d\d\d)),/g, '.')
    .replace('"', '')
    .replace('"', '')
    .split(',');
}

function chunkToJson(strChunk, arrayChunk, headers) {
  // const lastLineLength = regExp(arrayChunk[arrayChunk.length-1]).length;
  let arrayChunkLength;

  if (strChunk[strChunk.length - 1] === '\n') {
    arrayChunkLength = arrayChunk.length;
  } else {
    arrayChunkLength = arrayChunk.length - 1;
  }

  const result = [];

  for (let i = 1; i < arrayChunkLength; i++) {
    const obj = {};
    const currentline = regExp(arrayChunk[i]);
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    if (obj[headers[0]].length > 0) result.push(obj);
  }
  return result;
}

function deleteDoubles(array) {

  function objWithoutMeasureValue(obj) {
    // eslint-disable-next-line prefer-object-spread
    const resultObj = Object.assign({}, obj);
    delete resultObj.measureValue;
    return resultObj;
  }

  // reduce

}

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

      // result = deleteDoubles(result);

      callback(null, JSON.stringify(result));

      return;
    }

    const strChunk = chunk.toString();
    const chunkWithLastLine = lastLine.concat(strChunk);
    const arrayChunk = chunkWithLastLine.split('\n');
    lastLine = arrayChunk[arrayChunk.length - 1];

    const result = chunkToJson(strChunk, arrayChunk, headers);

    callback(null, JSON.stringify(result));
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
