import dayjs from 'dayjs';

const render = (container, element, position = 'beforeend') => {

  container.insertAdjacentHTML(position, element);
};

const getRandomNumber = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  const result = Math.floor(lower + Math.random() * (upper - lower + 1));
  console.log('result = ' + result);
  return result;
};


// const getRandomNumber = (min, max) => {
//   const result = Math.floor(Math.random() * (max - min)) + min;
//   console.log('result = ' + result);
//   return result;
// };

const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length)];


const generateDate = () => {
  const isDate = Boolean(getRandomNumber(0, 1));
  if (!isDate) {
    return null;
  }

  const maxDate = 7;
  const daysGap = getRandomNumber(-maxDate, maxDate);

  const result = dayjs().add(daysGap, 'day').toDate();
  console.log('result = ' + result);

  return result;
};


const getRandomDate = () => {
  const day = 24 * 3600 * 1000;

  return getRandomNumber(Date.now(), Date.now() + day);
};

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

export {generateDate, getRandomDate, getRandomNumber, render, createElement, getRandomArrayItem, shuffle};

