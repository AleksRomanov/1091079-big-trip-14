import {remove, render, RenderPosition} from '../utils/render';
import {sortByPrice} from '../utils/common';
import {sortByDay, sortByTime} from '../utils/dates';
import {SortTypes, UpdateType, UserAction} from '../const.js';
import {filter} from '../utils/filter';
import TripInfoView from '../view/create-trip-info';
import ModesToggleView from '../view/creating-menu';
import SortingToggleView from '../view/creating-sort';
import EventsContainerView from '../view/events-container';
import EventPresenter from './event';
import NoEventsView from '../view/creating-no-events';
import EventNew from './event-new';
import Filter from './filter';

const siteHeader = document.querySelector('.page-header');
const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const addEventButton = document.querySelector('.trip-main__event-add-btn');
const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');


export default class App {
  constructor(eventsModel, filterModel) {
    this._currentSortType = SortTypes.DAY;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._eventsContainer = new EventsContainerView();
    this.viewModeToggleComponent = new ModesToggleView();
    this.totalTripInfoComponent = null;
    // console.log(this._currentSortType);
    this._sortToggleComponent = null;
    this._noEventsView = new NoEventsView();
    this._eventsPresenters = {};
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    // this._handleAddFormClose = this._handleAddFormClose.bind(this);
    // this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    // this._newEventForm = new NewEventForm();
    this._newEventPresenter = new EventNew(this._eventsContainer, this._handleViewAction);
    this._filterPresenter = new Filter(tripControlsNavigation, this._filterModel);
    // filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel)
  }

  init() {
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderApp();
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventsPresenters[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearApp();
        this._renderApp();
        break;
      case UpdateType.MAJOR:
        this._clearApp({resetSortType: true});
        this._renderApp();
        break;
    }
  }

  _renderApp() {
    const events = this._getFilteredAndSortedEvents();
    const eventsCount = events.length;

    if (this.totalTripInfoComponent !== null) {
      remove(this.totalTripInfoComponent);
    }

    if (eventsCount) {
      this._renderEventsContainer();
      this._renderEventsList(events);

      this._renderEventsTotal(this._eventsModel.getEvents());
      this._renderViewModeToggle();
      this._renderFilter();

      this._renderSort();
    } else {
      this._renderNoEvents();
    }
    this._setAddEventButtonBehavior(addEventButton);
  }

  _renderEventsTotal(events) {
    this.totalTripInfoComponent = new TripInfoView(events);
    render(tripMain, this.totalTripInfoComponent);
  }

  _getFilteredAndSortedEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortTypes.DAY:
        // console.log(events);
        return filteredEvents.sort(sortByDay);
      case SortTypes.TIME:
        return filteredEvents.sort(sortByTime);
      case SortTypes.PRICE:
        return filteredEvents.sort(sortByPrice);
    }
  }

  _clearApp(resetSortType = false) {
    Object
      .values(this._eventsPresenters)
      .forEach((presenter) => presenter.destroy());
    this._eventsPresenters = {};
    remove(this._noEventsView);
    if (resetSortType) {
      this._currentSortType = SortTypes.DAY;
    }
  }

  _renderViewModeToggle() {
    render(tripControlsNavigation, this.viewModeToggleComponent);
  }

  _renderFilter() {
    this._filterPresenter.init();
  }

  _createNewEventForm(callback) {
    this._newEventPresenter.init(callback);
  }

  _handleNewEventFormClose() {
    addEventButton.disabled = false;
  }

  _setAddEventButtonBehavior(button) {
    button.addEventListener('click', () => {
      button.disabled = true;
      this._createNewEventForm(this._handleNewEventFormClose);
    });
  }

  _renderEventsContainer() {
    render(tripEvents, this._eventsContainer, RenderPosition.BEFOREEND);
  }

  _renderEventsList(events) {
    events.slice().forEach((event) => this._renderEvent(event));
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsContainer, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventsPresenters[event.id] = eventPresenter;
  }

  _handleModeChange() {
    Object
      .values(this._eventsPresenters)
      .forEach((presenter) => presenter.resetView());
  }

  _renderNoEvents() {
    render(tripEvents, this._noEventsView);
  }

  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;
    this._clearApp();
    this._renderApp();
  }

  _renderSort() {
    if (this._sortToggleComponent === null) {
      this._sortToggleComponent = new SortingToggleView();
      render(tripEvents, this._sortToggleComponent);
      this._sortToggleComponent.setSortHandler(this._handleSortTypeChange);
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }
}

