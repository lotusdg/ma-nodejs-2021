const { pipeline } = require('stream');
const { promisify } = require('util');

const promisifiedPipeline = promisify(pipeline);

const createCsvToJson = require('./csvToJson');

async function uploadCsv(inputStream) {
  const csvToJson = createCsvToJson();
  try {
    await promisifiedPipeline(inputStream, csvToJson);
    return { code: 200, message: 'data was uploaded in db' };
  } catch (err) {
    console.error('Csv pipeline failed', err);
    return { code: 400, message: err };
  }
}

module.exports = uploadCsv;
