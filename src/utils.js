import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {addForm} from './mocks/data';

dayjs.extend(utc);

const render = (container, element, position = 'beforeend') => {
  container.insertAdjacentHTML(position, element);
};

const getRandomNumber = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  // console.log(`lower: ${lower} a: ${a} b: ${b}`);
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

const generateDate = (firstDate = '', isFirstDate = false) => {
  // const currentDate = dayjs().format();
  // let result;

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

export {generateDate, getRandomNumber, render, getRandomArrayItem, shuffle, getFormattedDate};

