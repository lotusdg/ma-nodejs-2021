const isEqual = require('lodash.isequal');
const omit = require('lodash.omit');

function deleteDoubles(array) {
  const arrayWithoutDoubles = [];

  array.forEach((arrayElem) => {
    const even = (elem) =>
      isEqual(omit(elem, 'measureValue'), omit(arrayElem, 'measureValue'));

    if (arrayWithoutDoubles.some(even)) {
      const indexOfExisting = arrayWithoutDoubles.findIndex((resultElem) =>
        isEqual(
          omit(resultElem, 'measureValue'),
          omit(arrayElem, 'measureValue'),
        ),
      );
      arrayWithoutDoubles[indexOfExisting].measureValue =
        +arrayWithoutDoubles[indexOfExisting].measureValue +
        +arrayElem.measureValue;
    } else {
      arrayWithoutDoubles.push(arrayElem);
    }
  });

  arrayWithoutDoubles.forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.measureValue = +element.measureValue;
  });
  return arrayWithoutDoubles;
}

module.exports = { deleteDoubles };
