const WAYPOINT_COUNT = 1;

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

const DATA_VIEW_PERIOD = [
  {
    type: 'everything',
    id: 'filter-everything',
    title: 'EVERYTHING',
  },
  {
    type: 'in-future',
    id: 'filter-future',
    title: 'FUTURE',
  },
  {
    type: 'in-past',
    id: 'filter-past',
    title: 'PAST',
  },
];

const OFFERS_SORT_OPTIONS = [
  'day',
  'event',
  'time',
  'price',
  'offers',
];

export {WAYPOINT_COUNT, DATA_VIEW_TYPES, DATA_VIEW_PERIOD, OFFERS_SORT_OPTIONS, STATISTICS_SETTINGS};
