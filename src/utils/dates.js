import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
dayjs.extend(utc);
dayjs.extend(duration);
// dayjs.extend(advancedFormat);
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

const getDuration = (startTime, endTime) => {
  const diff = dayjs.duration(dayjs(endTime).diff(startTime));

  if (!diff.$d.hours && !diff.$d.days) {
    return diff.$d.minutes;
  }
  if (diff.$d.hours && !diff.$d.days) {
    return `${diff.$d.hours}H ${diff.$d.minutes}M`;
  } else {
    return `0${diff.$d.days}D ${diff.$d.hours}H ${diff.$d.minutes}M`;
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

const sortByDay = (eventA, eventB) => {
  return dayjs(eventB.startDate).isBefore(dayjs(eventA.startDate)) ? 1 : -1;
};

const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');
};


const isDateAfter = (dateA, dateB) => {
  return dayjs(dateB).isAfter(dayjs(dateA));
};


export {generateDate, getFormattedDate, filterPastEvents, filterFutureEvents, sortByTime, getDuration, isDatesEqual, sortByDay, isDateAfter};

