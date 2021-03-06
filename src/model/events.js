import Observer from '../utils/observer.js';

export default class Events extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  setEvents(updateType, events) {
    this._events = events.slice();
    this._notify(updateType);
  }

  getEvents() {
    return this._events;
  }

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(event) {
    const adaptedEvent = {
      ...event,
      price: event.base_price,
      startDate: event.date_from,
      endDate: event.date_to,
      destination: {
        photos: event.destination.pictures,
        city: event.destination.name,
        description: event.destination.description,
      },
      favorite: event.is_favorite,
    };

    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;
    delete adaptedEvent.is_favorite;
    delete adaptedEvent.base_price;
    return adaptedEvent;
  }

  static adaptToServer(event) {
    const adaptedEvent = {
      ...event,
      'base_price': event.price,
      'date_from': event.startDate,
      'date_to': event.endDate,
      'is_favorite': event.favorite,
      destination: {
        pictures: event.destination.photos,
        name: event.destination.city,
        description: event.destination.description,
      },
    };

    delete adaptedEvent.startDate;
    delete adaptedEvent.endDate;
    delete adaptedEvent.price;
    delete adaptedEvent.favorite;
    return adaptedEvent;
  }
}
