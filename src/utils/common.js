const sortByPrice = (eventA, eventB) => eventB.price - eventA.price;

const isOffersEqual = (arrayA, arrayB) => {
  return arrayA.filter((item) => !arrayB.includes(item))
    .concat(arrayB.filter((item) => !arrayA.includes(item))).length;
};

const isPriceEqual = (eventPrice, updatePrice) => eventPrice === updatePrice;

export {sortByPrice, isOffersEqual, isPriceEqual};
