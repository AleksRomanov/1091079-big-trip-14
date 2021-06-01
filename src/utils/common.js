const sortByPrice = (eventA, eventB) => eventB.price - eventA.price;

const isOffersEqual = (arrayA, arrayB) => {
  return arrayA.filter((item) => !arrayB.includes(item))
    .concat(arrayB.filter((item) => !arrayA.includes(item))).length;
};

const isPriceEqual = (eventPrice, updatePrice) => eventPrice === updatePrice;

const isOnline = () => {
  return window.navigator.onLine;
};

const makeRandomString = (length) => {
  let result = '';
  while (result.length < length) result += Math.random().toString(36).substr(2, length - result.length);
  return result;
};

export {sortByPrice, isOffersEqual, isPriceEqual, isOnline, makeRandomString};
