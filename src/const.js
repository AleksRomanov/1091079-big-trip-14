export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterTypes = {
  EVERYTHING: 'everything',
  IN_PAST: 'in-past',
  IN_FUTURE: 'in-future',
  AS_IS: 'as-is',
};

export const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const STATISTICS_SETTINGS = {
  type: 'horizontalBar',
  backgroundColor: '#ffffff',
  hoverBackgroundColor: '#ffffff',
  dataAnchor: 'start',
  basicFontSize: 13,
  datalabelsColor: '#000000',
  fontColor: '#000000',
  datalabelsAnchor: 'end',
  datalabelsAlign: 'start',
  titleFontSize: 23,
  titlePosition: 'left',
  padding: 5,
  minBarLength: 85,
  barHeight: 55,
  barThickness: 44,
};


const DATA_VIEW_TYPES = [
  'Table',
  'Stats',
];

const OFFERS_SORT_OPTIONS = [
  'day',
  'event',
  'time',
  'price',
  'offers',
];

const AUTH_DATA = {
  KEY_LENGTH: 23,
  KEY_NAME: 'AUTHORIZATION',
};

const TRIP_LENGTH_DATA = {
  LONG_TRIP: 3,
  SHORT_TRIP: 2,
};

export {DATA_VIEW_TYPES, OFFERS_SORT_OPTIONS, STATISTICS_SETTINGS, AUTH_DATA, TRIP_LENGTH_DATA};
