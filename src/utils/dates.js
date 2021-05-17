import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
//
import {getRandomNumber} from './common';

const generateDate = (firstDate = '', isFirstDate = false) => {

  if (isFirstDate) {
    return dayjs().utc().subtract(getRandomNumber(1, 3), 'day').format();
  } else {
    return dayjs(firstDate).utc().add(getRandomNumber(1, 24), 'hour').format();
  }
};

const getFormattedDate = (date, format) => {
  return dayjs(date).format(format);
};

const filterPastEvents = (event) => !dayjs().isBefore(dayjs(event.startDate));
const filterFutureEvents = (event) => !dayjs().isAfter(dayjs(event.startDate));

const getDuration = (startTime, endTime, format) => {
  const diff = dayjs(endTime).diff(startTime);
  return dayjs(diff).format(format);
};

// const sortByTime = (eventA, eventB) => eventB.price - eventA.price;
const getEventLength = (startTime, endTime) => {
  // console.log(dayjs(startTime));
  // console.log(dayjs().format());

  const startDate = dayjs(startTime);
  const endDate = dayjs(endTime);
  const diff = endDate.diff(startDate);
  console.log(dayjs(diff).format('hh:mm'));

  // const length = dayjs(endTime).diff(startTime);
  // console.log(length);
  // console.log('no format');
  // console.log(format);
  // console.log(dayjs(length).format('H[H] MM[M]'));
  // const format = 'H[H] MM[M]';

  return length;

  // return format === 'length' ? diff : dayjs(diff).format(format);

  //
  // if (format === 'length') {
  //   // console.log(format);
  //   console.log(startTime);
  //   console.log(endTime);
  //   const diffa = dayjs(endTime).diff(startTime);
  //   console.log(diffa);
  //   // console.log(dayjs(endTime).diff(startTime));
  //   // console.log(dayjs(endTime).diff(startTime));
  //   return diff;
  // } else {
  //   return dayjs(diff).format(format);
  // }
  // return format === 'length' ? diff : dayjs(diff).format(format);
  // // return dayjs(diff).format(format);
};

const sortByTime = (eventA, eventB) => {
  console.log(eventA.startDate);
  console.log(eventA.endDate);
  // console.log(getDuration(eventA.startTime, eventA.endTime, 'length'));
  // console.log(getDuration(eventA.startTime, eventA.endTime, 'length'));
  const eventADuration = getDuration(eventA.startDate, eventA.endDate);
  // console.log(eventADuration);
  // const eventBDuration = getEventLength(eventB.startDate, eventB.endDate);
  // console.log(eventBDuration);
  // getDuration(eventA.startTime, eventA.endTime, 'length');
  // return eventBDuration - eventADuration;
};


export {generateDate, getFormattedDate, filterPastEvents, filterFutureEvents, sortByTime, getDuration};

