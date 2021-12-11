const { pipeline } = require('stream');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const promisifiedPipeline = promisify(pipeline);

const createCsvToJsonOld = require('./csvToJson');

async function uploadCsv(inputStream) {
  const fileName = Date.now();
  const outputStream = fs.createWriteStream(
    path.join(__dirname, `./upload/${fileName}.json`),
  );

  const csvToJson =
    createCsvToJsonOld( path.join(__dirname, `./upload/${fileName}.json`) );

  try {
    await promisifiedPipeline(inputStream, csvToJson, outputStream);
    return { code: 200, message: 'json file was upload'};
  } catch (err) {
    console.error('Csv pipeline failed', err);
    return { code: 400, message: err};
  }
}

module.exports = uploadCsv;
