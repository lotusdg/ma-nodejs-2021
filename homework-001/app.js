const { helper1: filterByItem } = require('./helpers/index');
const { helper3: addPrice } = require('./helpers/index');
const { helper2: findTopPrice } = require('./helpers/index');

const testArray = require('./data.json');

function boot(array) {
  console.log(addPrice(array));
  console.log(filterByItem(array, 'orange', 4));
  console.log(
    addPrice(
      filterByItem(array, 'orange', 4).concat(filterByItem(array, 'orange', 6)),
    ),
  );
  console.log(findTopPrice());
}

boot(testArray);
