import {render, RenderPosition} from '../utils/render';
import TripInfoView from '../view/create-trip-info';
import ModesToggleView from '../view/creating-menu';
import FiltersView from '../view/creating-filter';
import SortingToggleView from '../view/creating-sort';
import EventFormView from '../view/create-event-form';
import EventsContainerView from '../view/events-container';
import PointPresenter from './event';
import {sortByPrice, updateItem} from '../utils/common';
import NoEventsView from '../view/creating-no-events';

const siteHeader = document.querySelector('.page-header');
const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const addEventButton = document.querySelector('.trip-main__event-add-btn');
const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');
import {FilterTypes, SortTypes} from '../const.js';
import {filterFutureEvents, filterPastEvents, sortByTime} from '../utils/dates';

export default class App {
  constructor() {
    this._eventsContainer = new EventsContainerView();
    this.viewModeToggleComponent = new ModesToggleView();
    this.filtreToggleComponent = new FiltersView();
    this.sortToggleComponent = new SortingToggleView();
    this.eventForm = new EventFormView();
    this._eventsPresenter = {};
    this._currentFilterType = FilterTypes.EVERYTHING;
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleAddFormClose = this._handleAddFormClose.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();
    this._sourcedEvents = this._events.slice();

    if(this._sourcedEvents.length) {
      this._renderEventsContainer();
      this._renderFilter();
      this._renderEventsList();
      this._renderEventControl();
      this._renderSort();
    } else {
      this._renderNoEvents();
    }
  }

  _filterTasks(filterType) {
    switch (filterType) {
      case FilterTypes.IN_FUTURE:
        this._events = this._sourcedEvents.filter(filterFutureEvents);
        break;
      case FilterTypes.IN_PAST:
        this._events = this._sourcedEvents.filter(filterPastEvents);
        break;
      default:
        this._events = this._sourcedEvents.slice();
    }
  }

  _handleFilterTypeChange(filterType) {

    if (this._currentFilterType === filterType) {
      return;
    }

    this._filterTasks(filterType);
    this._clearEventsList();
    this._renderEventsList();
  }

  _clearEventsList() {
    Object
      .values(this._eventsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventsPresenter = {};
  }

  _renderFilter() {
    render(tripControlsFilters, this.filtreToggleComponent);
    this.filtreToggleComponent.setSortTimeChangeHandler(this._handleFilterTypeChange);
  }

  _setAddEventButtonBehavior(button) {
    const destinationBlock = document.querySelector('.trip-events__list');

    button.addEventListener('click', () => {
      render(destinationBlock, this.eventForm.getElement());
      this._setAddFormClose();
    });
  }

  _setAddFormClose() {
    this.eventForm.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._handleAddFormClose);
  }

  _handleAddFormClose() {
    this.eventForm.getElement().remove();
  }

  _renderEventsContainer() {
    render(tripEvents, this._eventsContainer, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    this._events.slice().forEach((event) => this._renderEvent(event));
  }

  _handleModeChange() {
    Object
      .values(this._eventsPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._eventsPresenter[updatedEvent.id].init(updatedEvent);
  }

  _renderEvent(event) {
    const eventPresenter = new PointPresenter(this._eventsContainer, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventsPresenter[event.id] = eventPresenter;
  }

  _renderNoEvents() {
    const noEvents = new NoEventsView();
    render(tripEvents, noEvents);
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortTypes.DAY:
        this._events = this._sourcedEvents;
        break;
      case SortTypes.PRICE:
        this._events = this._sourcedEvents.slice().sort(sortByPrice);
        break;
      case SortTypes.TIME:
        this._events = this._sourcedEvents.slice().sort(sortByTime);
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    this._sortTasks(sortType);
    this._clearEventsList();
    this._renderEventsList();
  }

  _renderSort() {
    render(tripEvents, this.sortToggleComponent);
    this.sortToggleComponent.setSortHandler(this._handleSortTypeChange);
  }

  _renderEventControl() {
    this.totalTripInfoComponent = new TripInfoView(this._events);
    //Рэндер сводной информации о всём путешествии
    render(tripMain, this.totalTripInfoComponent);
    //Рэндер переключателя режима отображения информации
    render(tripControlsNavigation, this.viewModeToggleComponent);
    //Настройка поведения кнопки добавления точки маршрута
    this._setAddEventButtonBehavior(addEventButton);

  }

}

