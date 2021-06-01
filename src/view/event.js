import {getDuration, getFormattedDate} from '../utils/dates';
import AbstractView from './abstract';

const generateOffers = (offers) => {
  return offers.map((item) => {
    return `
<li class="event__offer">
  <span class="event__offer-title">${item['title']}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${item['price']}</span>
</li>`;
  }).join('');
};

const isFavorite = (favoriteStatus) => {
  return favoriteStatus ? 'event__favorite-btn--active' : 'event__favorite-btn';
};

const createEvent = (event) => {
  const {startDate, endDate, type, destination, price, offers, favorite, id} = event;
  const isDestination = destination.city !== null ? destination.city : '';
  const isPrice = price !== null ? price : '';
  return `<li class="trip-events__item">
       <div class="event" id="${id}">
    <time class="event__date" datetime="${getFormattedDate(startDate, 'YYYY-MM-DD-hh:mm')}">${getFormattedDate(startDate, 'MMM DD')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${isDestination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${getFormattedDate(startDate, 'hh:mm')}">${getFormattedDate(startDate, 'HH:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="${getFormattedDate(endDate, 'hh:mm')}">${getFormattedDate(endDate, 'HH:mm')}</time>
      </p>
      <p class="event__duration">${getDuration(startDate, endDate)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${isPrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${generateOffers(offers)}
    </ul>
    <button class="event__favorite-btn ${isFavorite(favorite)}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>

    <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
     </button>

  </div>
</li>
`;
};

export default class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEvent(this._event, this._destinations);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }
}
