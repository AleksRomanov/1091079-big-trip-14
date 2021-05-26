const getRandomNumber = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

const shuffle = () => Math.random() - 0.5;

const sortByPrice = (eventA, eventB) => eventB.price - eventA.price;

const isOffersEqual = (arrayA, arrayB) => {
  return arrayA.filter((item) => !arrayB.includes(item))
    .concat(arrayB.filter((item) => !arrayA.includes(item)));

};

const isPriceEqual = (eventPrice, updatePrice) => eventPrice === updatePrice;

export {getRandomNumber, getRandomArrayItem, shuffle, sortByPrice, isOffersEqual, isPriceEqual};
