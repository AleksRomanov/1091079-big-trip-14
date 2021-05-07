import dayjs from 'dayjs';
import {getRandomNumber} from './common';

const generateDate = (firstDate = '', isFirstDate = false) => {

  if (isFirstDate) {
    return dayjs().subtract(getRandomNumber(1, 3), 'day').format();
  } else {
    return dayjs(firstDate).add(getRandomNumber(1, 24), 'hour').format();
  }
};

const getFormattedDate = (date, format) => {
  return dayjs(date).format(format);
};

export {generateDate, getFormattedDate};

