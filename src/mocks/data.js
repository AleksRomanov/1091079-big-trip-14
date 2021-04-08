const EVENT_TYPES = {
  transfers: [
    'bus',
    'drive',
    'flight',
    'ship',
    'taxi',
    'train',
    'transport',
  ],
  activities: [
    'check-in',
    'restaurant',
    'sightseeing',
  ],
};

const CHOOSEN_EVENTS = [
  {
    eventType: "drive",
    city: 'Valencia',
    startMonth: 'Apr',
    startDate: '06',
    startTime: '03:57',
    endTime: '19:50',
    price: '500',
  },
];

const CITIES = [
  'Amsterdam',
  'Rotterdam',
  'Berlin',
  'Vienna',
  'Prague',
  'Paris',
];

const OFFERS = [
  {
    type: 'luggage',
    title: 'Add luggage',
    price: 10,
  },
  {
    type: 'comfort',
    title: 'Switch to comfort class',
    price: 150,
  },
  {
    type: 'meal',
    title: 'Add meal',
    price: 2,
  },
  {
    type: 'seats',
    title: 'Choose seats',
    price: 9,
  },
  {
    type: 'train',
    title: 'Travel by train',
    price: 40,
  },
];

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
  'EVENT',
  'TIME',
  'PRICE',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export {EVENT_TYPES, CITIES, OFFERS, DATA_VIEW_TYPES, DATA_VIEW_PERIOD, OFFERS_SORT_OPTIONS, DESCRIPTIONS, RenderPosition};
