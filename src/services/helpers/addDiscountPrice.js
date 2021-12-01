const { addPrice } = require('./helper3');

const addDiscountPrice = (value, data) => {
  const result = addPrice(data).map(e => {
    let priceWithDiscount;
    const pineapple = 'pineapple';
    const redSpanish = 'Red Spanish';
    const orange = 'orange';
    const tangerine = 'Tangerine';
    if(e.item === pineapple && e.type === redSpanish) {
      priceWithDiscount = e.price - (e.price * (value * 2)) / 100;
    }
    else if(e.item === orange && e.type === tangerine) {
      priceWithDiscount = e.price - (e.price * (value * 3)) / 100;
    }
    else {
      priceWithDiscount = e.price - (e.price * value) / 100;
    }
    return { ...e, priceWithDiscount: +priceWithDiscount.toFixed(2) };
  });
  return result;
};

module.exports = { addDiscountPrice };
