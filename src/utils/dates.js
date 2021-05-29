import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(duration);
import {getRandomNumber} from './common';

const generateDate = (firstDate = '', isFirstDate = false) => {
  if (isFirstDate) {
    return dayjs().utc().subtract(getRandomNumber(1, 3), 'day').format();
  } else {
    return dayjs(firstDate).utc().add(getRandomNumber(1, 24), 'hour').format();
  }
};

const getFormattedDate = (date, format) => {
  // console.log(date);
  return date !== null ? dayjs(date).utc().format(format) : '';
};

const filterPastEvents = (event) => !dayjs().isBefore(dayjs(event.startDate));
const filterFutureEvents = (event) => !dayjs().isAfter(dayjs(event.startDate));

const getDuration = (startTime, endTime) => {
  if (startTime !== null || endTime !== null) {
    const diff = dayjs.duration(dayjs(endTime).diff(startTime));
    return humanizeDuration(diff.$d);
  } else {
    return '';
  }
};

const humanizeDuration = ({hours, days, minutes}) => {
  if (!hours && !days) {
    return minutes;
  } else if (hours && !days) {
    return `${hours}H ${minutes}M`;
  } else if (days <= 9) {
    return `0${days}D ${hours}H ${minutes}M`;
  } else {
    return `${days}D ${hours}H ${minutes}M`;
  }
};

const getClearDuration = (startTime, endTime) => {
  return dayjs.duration(dayjs(endTime).diff(startTime)).asMinutes();
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
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'd');
};


export {generateDate, getFormattedDate, filterPastEvents, filterFutureEvents, sortByTime, getDuration, isDatesEqual, sortByDay, getClearDuration, humanizeDuration};

