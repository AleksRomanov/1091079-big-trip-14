import {RenderPosition} from './mocks/data';

// const render = (container, template, place = 'beforeend') => {
//   container.insertAdjacentHTML(place, template);
// };

const render = (container, element, position = 'beforeend') => {

  // container.insertAdjacentHTML(position, element);

  if (position === RenderPosition.AFTERBEGIN) {
    container.prepend(element);
  } else {
    container.append(element);
  }
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length)];

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

export {getRandomDate, getRandomNumber, render, createElement, getRandomArrayItem, shuffle};

