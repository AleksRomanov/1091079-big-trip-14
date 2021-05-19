import {CITIES, EVENT_TYPES, OFFERS} from '../mocks/data';
import {getFormattedDate} from '../utils/dates';
import Smart from './smart';

const EMPTY_EVENT = {
  eventType: EVENT_TYPES[0],
  destination: {city: null, photos: null, description: ''},
  startDate: null,
  endDate: null,
  price: '',
  offers: '',
};

const makeStringUppercase = ([first, ...rest]) => {
  return first.toUpperCase() + rest.join('');
};

const getEventsTypeList = (eventsType) => {
  return eventsType.map((event) => {
    return `<div class="event__type-event">
    <input id="event-type-${event}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${event}">
    <label class="event__type-label  event__type-label--${event}" for="event-type-${event}-1">${makeStringUppercase(event)}</label>
</div>`;
  }).join('');
};

const getDestinationOptions = (cities) => {
  return cities.map((city) => {
    return `<option value="${city}"></option>`;
  }).join('');
};

const getExtraOffers = (eventType, eventOffers) => {

  const eventTypeOffersAll = OFFERS.find((offer) => {
    return offer['type'] === eventType ? offer : null;
  });

  const isChecked = (offer) => {
    return eventOffers.find((event) => event.title === offer.title) ? 'checked' : '';
  };


  const getOffers = (eventType) => {
    return eventTypeOffersAll.offers.map((offer, index) => {
      return `<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="event-offer-${eventType}-${index}" type="checkbox" name="event-offer-luggage" ${isChecked(offer)}>
<label class="event__offer-label" for="event-offer-${eventType}-${index}">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</label>
</div>`;
    }).join('');
  };

  const isOffers = (eventType, offers) => {
    if (offers) {
      return `<section class="event__section  event__section--offers">
<h3 class="event__section-title  event__section-title--offers">Offers</h3>

<div class="event__available-offers">
  ${getOffers(eventType, offers)}
</div>
</section>`;
    } else {
      return '';
    }
  };

  return isOffers(eventType, eventOffers);

};

const getEventPhotos = (photos, description) => {

  const getPhotos = (photos) => {
    return photos.map((photo) => {
      return `
<img class="event__photo" src="${photo}" alt="Event photo">
      `;
    }).join('');
  };

  const isPhotos = (photos) => {
    if (photos) {
      return `
<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${getPhotos(photos)}
        </div>
      </div>
</section>`;
    } else {
      return '';
    }
  };


  return isPhotos(photos);
};

const createEventForm = (event) => {
  const destinationValue = event.destination.city ? `value="${event.destination.city}"` : '';
  const eventPrice = event.price ? `value="${event.price}"` : '';

  const getDataValue = (data) => data ? `value="${getFormattedDate(event.startDate, 'YY[/]MM[/]DD HH:MM')}"` : '';

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${event.eventType}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${getEventsTypeList(EVENT_TYPES)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${event.eventType}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" ${destinationValue} list="destination-list-1">
        <datalist id="destination-list-1">
          ${getDestinationOptions(CITIES)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" ${getDataValue(event.startDate)}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" ${getDataValue(event.endDate)}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" ${eventPrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${getExtraOffers(event.eventType, event.offers)}
      ${getEventPhotos(event.destination.photos, event.destination.description)}
    </section>
</form>`;
};

export default class EventForm extends Smart {
  constructor(event = EMPTY_EVENT) {
    super();
    // this._state = event;
    this._state = EventForm.parseEventToState(event);
    this._closeClickHandler = this._closeClickHandler.bind(this);
  }

  static parseEventToState(task) {
    return {
      ...task,
      isDestination: task.destination.city !== null,
      isDates: task.startDate !== null,
    };
  }

  getTemplate() {
    return createEventForm(this._state);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeClickHandler);
  }
}

