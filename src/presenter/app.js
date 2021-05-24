import {remove, render, RenderPosition} from '../utils/render';
import TripInfoView from '../view/create-trip-info';
import ModesToggleView from '../view/creating-menu';
import FiltersView from '../view/creating-filter';
import SortingToggleView from '../view/creating-sort';
import EventsContainerView from '../view/events-container';
import EventPresenter from './event';
import {sortByPrice, updateItem} from '../utils/common';
import NoEventsView from '../view/creating-no-events';

const siteHeader = document.querySelector('.page-header');
const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const addEventButton = document.querySelector('.trip-main__event-add-btn');
const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');
import {FilterTypes, SortTypes, UpdateType, UserAction} from '../const.js';
import {filterFutureEvents, filterPastEvents, sortByTime} from '../utils/dates';
import NewEventForm from './new-event';
import NewEvent from './new-event';
import {filter} from '../utils/filter';
import Filter from './filter';

export default class App {
  constructor(eventsModel, filterModel) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._eventsContainer = new EventsContainerView();
    this.viewModeToggleComponent = new ModesToggleView();
    // this._filtreToggleComponent = new FiltersView();
    this._sortToggleComponent = new SortingToggleView();
    this._noEventsView = new NoEventsView();
    this._eventsPresenter = {};
    this._currentSortType = SortTypes.DAY;
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    // this._handleAddFormClose = this._handleAddFormClose.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    // this._newEventForm = new NewEventForm();
    this._newEventPresenter = new NewEvent(this._eventsContainer, this._handleViewAction);
    this._filterPresenter = new Filter(tripControlsNavigation, this._filterModel, this._eventsModel);
    // filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel)

  }

  init() {
    // this._events = events.slice();
    // this._sourcedEvents = this._events.slice();
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderEvents();

    // if(this._sourcedEvents.length) {
    //   this._renderEventsContainer();
    //   this._renderFilter();
    //   this._renderEventsList();
    //   this._renderEventControl();
    //   this._renderSort();
    // } else {
    //   this._renderNoEvents();
    // }
  }

  _getFilteredAndSortedEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortTypes.TIME:
        return filteredEvents.sort(sortByTime);
      case SortTypes.PRICE:
        return filteredEvents.sort(sortByPrice);
    }

    return filteredEvents;
  }

  _renderEvents() {
    const events = this._getFilteredAndSortedEvents();
    const eventsCount = events.length;

    if (eventsCount) {
      this._renderEventsContainer();
      this._renderEventsList(events);

      this._renderEventsTotal(events);
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

  _handleFilterTypeChange(filterType) {

    if (this._currentFilterType === filterType) {
      return;
    }

    this._filterTasks(filterType);
    this._clearEventsList();
    this._renderEventsList();
  }

  _clearEventsList(resetSortType = false) {
    Object
      .values(this._eventsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventsPresenter = {};

    remove(this._sortToggleComponent);
    remove(this._noEventsView);
    // На случай, если перерисовка доски вызвана
    // уменьшением количества задач (например, удаление или перенос в архив)
    // нужно скорректировать число показанных задач
    // this._renderedTaskCount = Math.min(taskCount, this._renderedTaskCount);

    if (resetSortType) {
      this._currentSortType = SortTypes.DAY;
    }
  }

  _renderViewModeToggle() {
    render(tripControlsNavigation, this.viewModeToggleComponent);
  }

  _renderFilter() {
    // console.log('111');
    this._filterPresenter.init();
    // render(tripControlsFilters, this.filtreToggleComponent);
    // this.filtreToggleComponent.setSortTimeChangeHandler(this._handleFilterTypeChange);
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
    this._eventsPresenter[event.id] = eventPresenter;
  }

  _handleModeChange() {
    Object
      .values(this._eventsPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderNoEvents() {
    render(tripEvents, this._noEventsView);
  }

  _handleSortTypeChange() {
    // this._sortTasks(sortType);
    this._clearEventsList();
    this._renderEventsList();
  }

  _renderSort() {
    render(tripEvents, this._sortToggleComponent);
    this._sortToggleComponent.setSortHandler(this._handleSortTypeChange);
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

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventsPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearEventsList();
        this._renderEvents();
        break;
      case UpdateType.MAJOR:
        this._clearEventsList({resetSortType: true});
        this._renderEvents();
        break;
    }
  }

}

