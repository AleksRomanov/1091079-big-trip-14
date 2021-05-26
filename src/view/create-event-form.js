import {CITIES, DESCRIPTIONS, EVENT_TYPES, OFFERS} from '../mocks/data';
import {getFormattedDate} from '../utils/dates';
import Smart from './smart';
import {generateDescription, generatePhotos} from '../mocks/creating-destination';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

const EMPTY_EVENT = {
  type: EVENT_TYPES[0],
  destination: {city: null, photos: null, description: ''},
  startDate: null,
  endDate: null,
  price: null,
  offers: [],
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

const eventExtraOffers = ({type, offers}) => {
  const eventTypeOffersAll = OFFERS.find((offer) => {
    return offer['type'] === type ? offer : null;
  });

  const isChecked = (offer) => {
    return offers.find((eventOffer) => eventOffer.title === offer.title) ? 'checked' : '';
  };

  const getOffers = eventTypeOffersAll.offers.map((offer, index) => {
    return `<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${index}" type="checkbox" name="event-offer-luggage" ${isChecked(offer)}>
<label class="event__offer-label" for="event-offer-${type}-${index}">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</label>
</div>`;
  }).join('');

  return `<section class="event__section  event__section--offers">
<h3 class="event__section-title  event__section-title--offers">Offers</h3>

<div class="event__available-offers">
  ${getOffers}
</div>
</section>`;

};

const getEventPhotos = ({destination, isDestination}) => {

  const getPhotos = (photos) => {
    return photos.map((photo) => {
      return `<img class="event__photo" src="${photo}" alt="Event photo">`;
    }).join('');
  };

  if (isDestination) {
    return `
<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${getPhotos(destination.photos)}
        </div>
      </div>
</section>`;
  } else {
    return '';
  }
};

const createEventForm = (event) => {
  const {type, isDestination, isPrice, price, destination} = event;
  const destinationValue = isDestination ? `value="${destination.city}"` : '';
  const eventPrice = isPrice ? `value="${price}"` : '';

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
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
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" ${destinationValue} list="destination-list-1">
        <datalist id="destination-list-1">
          ${getDestinationOptions(CITIES)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time">
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
      ${eventExtraOffers(event)}
      ${getEventPhotos(event)}
    </section>
</form>`;
};

export default class EventForm extends Smart {
  constructor(event = EMPTY_EVENT) {
    super();
    this._state = EventForm.parseEventToState(event);
    this._startDatePicker = null;
    this._endDatePicker = null;
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._destinationFocusHandler = this._destinationFocusHandler.bind(this);
    this._destinationBlurHandler = this._destinationBlurHandler.bind(this);
    this._typeSelectHandler = this._typeSelectHandler.bind(this);
    this._endDateSelectHandler = this._endDateSelectHandler.bind(this);
    this._startDateSelectHandler = this._startDateSelectHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._pricePickerHandler = this._pricePickerHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__input--destination').addEventListener('focus', this._destinationFocusHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('blur', this._destinationBlurHandler);
    this._setTypeSelectHandlers();
    this._setDatePickers();
    this._setPricePicker();
  }

  _pricePickerHandler(evt) {
    const newPrice = parseInt(evt.target.value);
    if (!isNaN(newPrice)) {
      this.updateState({
        price: parseInt(evt.target.value),
        isPrice: true,
      });
    } else {
      evt.target.value = this._state.price;
    }
  }

  _setPricePicker() {
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._pricePickerHandler);
  }

  _setDatePicker(dateElement, isStart) {
    const datePrefix = isStart ? 'startDate' : 'endDate';
    const cbStateName = `_${datePrefix}Picker`;
    const dateHandler = isStart ? this._startDateSelectHandler : this._endDateSelectHandler;
    const getMinDate = isStart ? false : this._state.startDate;
    const getMaxDate = isStart ? this._state.endDate : false;
    this[cbStateName] = flatpickr(
      dateElement,
      {
        minDate: getMinDate,
        maxDate: getMaxDate,
        enableTime: true,
        time_24hr: true,
        dateFormat: 'y/m/d H:i',
        defaultDate: getFormattedDate(this._state[datePrefix], 'YY/MM/DD HH:mm'),
        onChange: dateHandler,
      },
    );
  }

  removeElement() {
    super.removeElement();
    if (this._startDatePicker !== null || this._endDatePicker !== null) {
      const dataPickers = [this._startDatePicker, this._endDatePicker];
      dataPickers.forEach((picker) => {
        picker.destroy();
        picker = null;
      });
    }
  }

  _setDatePickers() {
    const startDateElement = this.getElement().querySelector('#event-start-time-1');
    const endDateElement = this.getElement().querySelector('#event-end-time-1');
    this._setDatePicker(startDateElement, true);
    this._setDatePicker(endDateElement);
  }

  _startDateSelectHandler(evt) {
    this.updateState({startDate: dayjs(evt).format()});
  }

  _endDateSelectHandler(evt) {
    this.updateState({
      endDate: dayjs(evt).format(),
    });
  }

  _typeSelectHandler(evt) {
    this.updateState({
      type: evt.target.value,
    });
  }

  _setTypeSelectHandlers() {
    const typeSelects = this.getElement().querySelectorAll('.event__type-input');
    typeSelects.forEach((typeSelect) => typeSelect.addEventListener('change', this._typeSelectHandler));
  }

  _checkDestinationValidity(evtValue) {
    let destination = null;
    CITIES.forEach((city) => {
      if (city === evtValue) {
        destination = city;
      }
    });
    return destination;
  }

  _destinationBlurHandler(evt) {
    evt.preventDefault();
    const destination = this._checkDestinationValidity(evt.target.value);
    if (destination === null) {
      evt.target.value = '';
    } else {
      this.updateState({
        destination: {
          city: destination,
          photos: generatePhotos(),
          description: generateDescription(DESCRIPTIONS),
        },
        isDestination: true,
      });
    }
  }

  _destinationFocusHandler(evt) {
    evt.preventDefault();
    evt.target.value = '';
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventForm.parseStateToEvent(this._state));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  reset(event) {
    this.updateState(
      EventForm.parseEventToState(event),
    );
  }

  _getNewOffers() {
    const newOffers = this.getElement().querySelectorAll('.event__offer-selector');
    const newOffersArray = [];

    newOffers.forEach((offer) => {
      const isChecked = offer.querySelector('.event__offer-checkbox').checked;
      if (isChecked) {
        const newOfferTitle = offer.querySelector('.event__offer-title').innerHTML;
        const newOfferPrice = offer.querySelector('.event__offer-price').innerHTML;
        const newOffer = {title: newOfferTitle, price: newOfferPrice};
        newOffersArray.push(newOffer);
      }
    });

    this.updateState({
      offers: newOffersArray,
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._getNewOffers();
    this._callback.formSubmit(EventForm.parseStateToEvent(this._state));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener('submit', this._formSubmitHandler);
  }

  static parseEventToState(event) {
    return {
      ...event,
      isDestination: event.destination.city !== null,
      isDates: event.startDate !== null || event.endDate !== null,
      isPrice: event.price !== null,
      isStartDate: event.startDate !== null,
      isEndDate: event.endDate !== null,
    };
  }

  static parseStateToEvent(state) {
    // data = Object.assign({}, data);
    state = {...state};

    // if (!data.isDueDate) {
    //   data.dueDate = null;
    // }
    //
    // if (!data.isRepeating) {
    //   data.repeating = {
    //     mo: false,
    //     tu: false,
    //     we: false,
    //     th: false,
    //     fr: false,
    //     sa: false,
    //     su: false,
    //   };

    // delete state.isDueDate;
    // delete state.isRepeating;

    return state;
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

