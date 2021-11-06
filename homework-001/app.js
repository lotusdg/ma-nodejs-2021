const {
  helper1: filterByItem,
  helper3: addPrice,
  helper2: findTopPrice,
} = require('./helpers/index');

const testArray = require('./data.json');

function boot(array) {
  console.log('============= Add price key for fruits =============');
  console.log(addPrice(array));
  console.log('============= filterByOrange =============');
  const filterByOrange = filterByItem(array, 'item', 'orange');
  const filterByWeight = filterByItem(array, 'weight', 4);
  console.log(filterByOrange);
  console.log('============= filterByWeight =============');
  console.log(filterByWeight);
  console.log('============= FindTopPriceFirst =============');
  const findTopPriceFirst = findTopPrice(filterByOrange.concat(filterByWeight));
  console.log(findTopPriceFirst);
  console.log('============= Add price key for fruits again =============');
  const addPriceAgain = addPrice(filterByOrange.concat(filterByWeight));
  console.log(addPriceAgain);
  console.log('============= FindTopPriceWithoutArguments =============');
  console.log(findTopPrice());
}

boot(testArray);