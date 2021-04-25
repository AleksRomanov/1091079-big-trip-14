import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';


// const render = (container, element, position = 'beforeend') => {
//   container.insertAdjacentHTML(position, element);
// };
export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
  console.log(container);
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  console.log(newElement);

  return newElement.firstChild; // 3
};

const getRandomNumber = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

const generateDate = (firstDate = '', isFirstDate = false) => {

  if (isFirstDate) {
    return dayjs().subtract(getRandomNumber(1, 3), 'day').format();
  } else {
    return dayjs(firstDate).add(getRandomNumber(1, 24), 'hour').format();
  }
};

const shuffle = (array) => {
  return array.sort(()=>Math.random()-0.5);
};

const getFormattedDate = (date, format) => {
  return dayjs(date).format(format);
};


const getObjectByKeyInArray = (array, searchableProp, searchableValue) => {
  let neededOffer;
  array.forEach((obj) => {
    if (obj[searchableProp] === searchableValue) {
      return neededOffer = obj;
    }
  });
  return neededOffer;
};

export {generateDate, getRandomNumber, render, getRandomArrayItem, shuffle, getFormattedDate, getObjectByKeyInArray, createElement};

