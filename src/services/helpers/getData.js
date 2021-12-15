const fs = require('fs');

const path = require('path');

function getData() {
  function getLastFile(folder) {
    const myPath = path.join(folder);
    if (!fs.existsSync(myPath)) {
      try {
        fs.mkdirSync(myPath);
      } catch (err) {
        console.error(err);
      }
    }
    const array = fs.readdirSync(myPath);
    return array[array.length - 1];
  }

  const uploadFolder = 'upload';

  const lastFile = getLastFile(uploadFolder);

  let data;

  if (lastFile === undefined) {
    // eslint-disable-next-line global-require
    data = require('../../data.json');
  } else {
    // eslint-disable-next-line global-require
    data = require(`../../../${uploadFolder}/${lastFile}`);
  }
  return data;
}

const data = getData();

module.exports = { data };
