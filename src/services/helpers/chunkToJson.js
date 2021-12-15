function chunkToJson(strChunk, arrayChunk, headers) {
  // const lastLineLength = regExp(arrayChunk[arrayChunk.length-1]).length;
  let arrayChunkLength;

  function regExp(str) {
    return str
      .replace(/((?<=\$\d)|(?<=\$\d\d)|(?<=\$\d\d\d)|(?<=\$\d\d\d\d)),/g, '.')
      .replace('"', '')
      .replace('"', '')
      .split(',');
  }

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

module.exports = { chunkToJson };
