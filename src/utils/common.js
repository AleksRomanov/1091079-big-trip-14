const getRandomNumber = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

const shuffle = () => Math.random() - 0.5;

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.splice(index, 1, update),
  ];
};

const sortByPrice = (eventA, eventB) => eventB.price - eventA.price;

const isOffersEqual = (arrayA, arrayB) => {
  const res = arrayA.filter((item) => !arrayB.includes(item))
    .concat(arrayB.filter((item) => !arrayA.includes(item)));
  return res;
};

const isPriceEqual = (eventPrice, updatePrice) => eventPrice === updatePrice;

export {getRandomNumber, getRandomArrayItem, shuffle, updateItem, sortByPrice, isOffersEqual, isPriceEqual};
