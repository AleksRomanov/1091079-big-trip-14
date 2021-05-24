const WAYPOINT_COUNT = 10;

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
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

const KeyType = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

export {WAYPOINT_COUNT, DATA_VIEW_TYPES, DATA_VIEW_PERIOD, OFFERS_SORT_OPTIONS, KeyType};
