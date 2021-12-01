const { addDiscountPrice } = require('./addDiscountPrice');
const discount = require('./discount');

function addDiscountPromise(data) {
  return new Promise((resolve) => {
    function discountCallback(err, value) {
      if(err){
          discount(discountCallback);
      }else{
        const fruitsWithDiscount = addDiscountPrice(value, data);
        resolve(fruitsWithDiscount);
      }
    }
    discount(discountCallback);
  });
}

module.exports = { addDiscountPromise };
