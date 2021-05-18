import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import {getRandomNumber} from './common';

const generateDate = (firstDate = '', isFirstDate = false) => {

  if (isFirstDate) {
    return dayjs().utc().subtract(getRandomNumber(1, 3), 'day').format();
  } else {
    return dayjs(firstDate).utc().add(getRandomNumber(1, 24), 'hour').format();
  }
};

const getFormattedDate = (date, format) => {
  return dayjs(date).utc().format(format);
};

const filterPastEvents = (event) => !dayjs().isBefore(dayjs(event.startDate));
const filterFutureEvents = (event) => !dayjs().isAfter(dayjs(event.startDate));

const getDuration = (startTime, endTime, format) => {
  const diffInMinutes = dayjs(endTime).diff(startTime, format);
  const hoursCount = Math.floor(diffInMinutes / 60);
  const minutesCount = (diffInMinutes % 60) * 60;

  if(diffInMinutes <= 59) {
    return diffInMinutes;
  }
  if(diffInMinutes <= 1439) {
    return `${hoursCount}H ${minutesCount}M`;
  } else {
    const daysCount = Math.floor(hoursCount / 24);
    return `0${daysCount}D ${hoursCount}H ${minutesCount}M`;
  }
};

const getEventDuration = (startTime, endTime) => {
  return dayjs(endTime).diff(startTime);
};

const sortByTime = (eventA, eventB) => {
  const eventADuration = getEventDuration(eventA.startDate, eventA.endDate);
  const eventBDuration = getEventDuration(eventB.startDate, eventB.endDate);
  return eventBDuration - eventADuration;
};


export {generateDate, getFormattedDate, filterPastEvents, filterFutureEvents, sortByTime, getDuration};

