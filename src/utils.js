import dayjs from 'dayjs';

const render = (container, element, position = 'beforeend') => {

  // console.log(container);
  // console.log(position);
  // console.log(element, container, position);

  container.insertAdjacentHTML(position, element);
};

const getRandomNumber = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  // console.log(`lower: ${lower} a: ${a} b: ${b}`);
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// const getRandomNumber = (min, max) => {
//   return Math.floor(Math.random() * (max - min)) + min;
// };

const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

const generateDate = () => {
  const isDate = Boolean(getRandomNumber(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomNumber(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};
//
// const getRandomDate = () => {
//   const day = 24 * 3600 * 1000;
//
//   return getRandomInteger(Date.now(), Date.now() + day);
// };



const createElement = (template) => {
  // console.log(template);
  const element = document.createElement('div');

  element.innerHTML = template;

  return element.firstElementChild;
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    const temp = array[random];

    array[random] = array[i];
    array[i] = temp;
  }

  return array;
};

export {generateDate, getRandomNumber, render, createElement, getRandomArrayItem, shuffle};

