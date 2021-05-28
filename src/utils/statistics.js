// import {getDuration} from './trip-event.js';

import {getClearDuration} from './dates';

const sortMapByValues = (mapToSort) => {
  return new Map([...mapToSort.entries()]
    .sort((firstEntry, secondEntry) => {
      return secondEntry[1] - firstEntry[1];
    }));
};

const mapEventsByType = (events) => {
  const eventsByType = new Map();
  events.forEach((event) => {
    if (eventsByType.has(event.type)) {
      let countByType = eventsByType.get(event.type);
      countByType = countByType + 1;
      eventsByType.set(event.type, countByType);
    } else {
      eventsByType.set(event.type, 1);
    }
  });
  return eventsByType;
};

const mapSpendingByType = (events) => {
  const eventsByType = new Map();
  events.forEach((event) => {
    if (eventsByType.has(event.type)) {
      let spendingByType = eventsByType.get(event.type);
      spendingByType = spendingByType + getEventSum(event);
      eventsByType.set(event.type, spendingByType);
    } else {
      eventsByType.set(event.type, getEventSum(event));
    }
  });
  return eventsByType;
};

const getEventSum = (event) => {
  let eventOfferSum = 0;
  if (event.offers.length) {
    eventOfferSum = event.offers.reduce((acc, cur) => {
      return acc + cur.price;
    }, 0);
  }
  return eventOfferSum + event.price;
};

const mapDurationByType = (events) => {
  const eventsByType = new Map();
  events.forEach((event) => {
    if (eventsByType.has(event.type)) {
      let duration = eventsByType.get(event.type);
      duration = duration + getClearDuration(event.startDate, event.endDate);
      eventsByType.set(event.type, duration);

    } else {
      eventsByType.set(event.type, getClearDuration(event.startDate, event.endDate));
    }
  });

  return eventsByType;
};
//
// const mapDurationByTypeHumanized = (events) => {
//   const eventsByType = new Map();
//   events.forEach((event) => {
//     if (eventsByType.has(event.type)) {
//       eventsByType.set(event[`${event.type}Format`], getDuration(event.startDate, event.endDate));
//
//     } else {
//       eventsByType.set(event[`${event.type}Format`], getDuration(event.startDate, event.endDate));
//     }
//   });
//   return eventsByType;
// };


export {
  sortMapByValues,
  mapEventsByType,
  mapSpendingByType,
  mapDurationByType
};
