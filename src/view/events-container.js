import Abstract from './abstract';

const createEventsContainer = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class EventsContainer extends Abstract{
  getTemplate() {
    return createEventsContainer();
  }
}

