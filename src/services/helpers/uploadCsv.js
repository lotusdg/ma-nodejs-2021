const { pipeline } = require('stream');
const fs = require('fs');
const { promisify } = require('util');

const promisifiedPipeline = promisify(pipeline);

const createCsvToJsonOld = require('./csvToJson');

async function uploadCsv(inputStream) {
  const filepath = 'src/data.json';
  const outputStream = fs.createWriteStream(filepath);
  const csvToJson = createCsvToJsonOld(filepath);

  try {
    await promisifiedPipeline(inputStream, csvToJson, outputStream);
  } catch (err) {
    console.error('Csv pipeline failed', err);
  }
}

module.exports = uploadCsv;
