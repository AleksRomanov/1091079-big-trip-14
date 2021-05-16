const WAYPOINT_COUNT = 8;

const DATA_VIEW_TYPES = [
  'Table',
  'Stats',
];

const DATA_VIEW_PERIOD = [
  {
    id: 'filter-everything',
    title: 'EVERYTHING',
  },
  {
    id: 'filter-future',
    title: 'FUTURE',
  },
  {
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
