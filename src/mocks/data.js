const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

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
    'type': 'flight',
    'offers': [
      {
        'title': 'Add luggage',
        'price': 60,
      },
      {
        'title': 'Switch to comfort',
        'price': 80,
      }, {
        'title': 'Add meal',
        'price': 60,
      },
      {
        'title': 'Choose seats',
        'price': 120,
      }, {
        'title': 'Travel by train',
        'price': 60,
      },
    ],
  },
  {
    'type': 'taxi',
    'offers': [
      {
        'title': 'Order Uber',
        'price': 20,
      },
      {
        'title': 'taxi+2',
        'price': 80,
      }, {
        'title': 'taxi+3',
        'price': 60,
      },
      {
        'title': 'taxi+4',
        'price': 120,
      }, {
        'title': 'taxi+5',
        'price': 60,
      },
    ],
  },
  {
    'type': 'train',
    'offers': [
      {
        'title': 'Train+1',
        'price': 20,
      },
      {
        'title': 'Train+2',
        'price': 20,
      },
      {
        'title': 'Train+3',
        'price': 20,
      },
      {
        'title': 'Train+4',
        'price': 20,
      },
      {
        'title': 'Train+5',
        'price': 20,
      },
    ],
  },
  {
    'type': 'drive',
    'offers': [
      {
        'title': 'drive+1',
        'price': 20,
      },
      {
        'title': 'drive+2',
        'price': 20,
      },
      {
        'title': 'drive+3',
        'price': 20,
      },
      {
        'title': 'drive+4',
        'price': 20,
      },
      {
        'title': 'drive+5',
        'price': 20,
      },
    ],
  },
  {
    'type': 'bus',
    'offers': [
      {
        'title': 'bus+1',
        'price': 20,
      },
      {
        'title': 'bus+2',
        'price': 20,
      },
      {
        'title': 'bus+3',
        'price': 20,
      },
      {
        'title': 'bus+4',
        'price': 20,
      },
      {
        'title': 'bus+5',
        'price': 20,
      },
    ],
  },
  {
    'type': 'transport',
    'offers': [
      {
        'title': 'transport+1',
        'price': 20,
      },
      {
        'title': 'transport+2',
        'price': 20,
      },
      {
        'title': 'transport+3',
        'price': 20,
      },
      {
        'title': 'transport+4',
        'price': 20,
      },
      {
        'title': 'transport+5',
        'price': 20,
      },
    ],
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'title': 'check-in+1',
        'price': 20,
      },
      {
        'title': 'check-in+2',
        'price': 20,
      },
      {
        'title': 'check-in+3',
        'price': 20,
      },
      {
        'title': 'check-in+4',
        'price': 20,
      },
      {
        'title': 'check-in+5',
        'price': 20,
      },
    ],
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'title': 'sightseeing+1',
        'price': 20,
      },
      {
        'title': 'sightseeing+2',
        'price': 20,
      },
      {
        'title': 'sightseeing+3',
        'price': 20,
      },
      {
        'title': 'sightseeing+4',
        'price': 20,
      },
      {
        'title': 'sightseeing+5',
        'price': 20,
      },
    ],
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'title': 'restaurant+1',
        'price': 20,
      },
      {
        'title': 'restaurant+2',
        'price': 20,
      },
      {
        'title': 'restaurant+3',
        'price': 20,
      },
      {
        'title': 'restaurant+4',
        'price': 20,
      },
      {
        'title': 'restaurant+5',
        'price': 20,
      },
    ],
  },
  {
    'type': 'ship',
    'offers': [
      {
        'title': 'ship+1',
        'price': 20,
      },
      {
        'title': 'ship+2',
        'price': 20,
      },
      {
        'title': 'ship+3',
        'price': 20,
      },
      {
        'title': 'ship+4',
        'price': 20,
      },
      {
        'title': 'ship+5',
        'price': 20,
      },
    ],
  },
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

export {EVENT_TYPES, CITIES, OFFERS, DESCRIPTIONS, RenderPosition};
