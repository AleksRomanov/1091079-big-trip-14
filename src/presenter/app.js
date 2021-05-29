import {remove, render, RenderPosition} from '../utils/render';
import {sortByPrice} from '../utils/common';
import {sortByDay, sortByTime} from '../utils/dates';
import {DATA_VIEW_TYPES, SortTypes, UpdateType, UserAction} from '../const.js';
import {filter} from '../utils/filter';
import TripInfoView from '../view/create-trip-info';
import ModesToggleView from '../view/creating-menu';
import SortingToggleView from '../view/creating-sort';
import EventsContainerView from '../view/events-container';
import EventPresenter from './event';
import NoEventsView from '../view/creating-no-events';
import EventNew from './event-new';
import Filter from './filter';
import Statistics from '../view/statistics';

const siteHeader = document.querySelector('.page-header');
const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const addEventButton = document.querySelector('.trip-main__event-add-btn');
const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');
const pageContainer = siteBodyPageMain.querySelector('.page-body__container');

export default class App {
  constructor(eventsModel, filterModel, api) {
    this._api = api;
    this._currentSortType = SortTypes.DAY;
    this._currentViewMode = 'Table';
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._eventsContainer = new EventsContainerView();
    this._statisticsView = null;
    this.viewModeToggleComponent = new ModesToggleView();
    this.totalTripInfoComponent = null;
    this._sortToggleComponent = null;
    this._noEventsView = new NoEventsView();
    this._eventsPresenters = {};
    this._destinations = null;
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewModeToggle = this._handleViewModeToggle.bind(this);
    this._addEventButtonHandler = this._addEventButtonHandler.bind(this);
    this._newEventPresenter = null;
    this._filterPresenter = new Filter(tripControlsNavigation, this._filterModel);
  }


  init() {
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderApp();
    this._getWebData();
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
      case UpdateType.INIT:
        // console.log('init');
        // this._isLoading = false;
        // remove(this._loadingComponent);
        // console.log('init');
        // console.log('123');

        this._clearApp();
        // this._getDestinations();
        this._renderApp();
        // console.log(this._destinations);
        // console.log(this._eventsModel);
        // console.log('init');

        break;
    }
  }

  _getWebData() {
    this._api.getData()
      .then((data) => {
        this._eventsModel.setEvents(UpdateType.INIT, data);


        // this._getDestinations();
        // console.log('afterSet');

        // render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
        // siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
      })
      .catch(() => {
        // console.log('catch');
        // this._eventsModel.setEvents(UpdateType.INIT, []);
        // render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
        // siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
      });
  }

  _renderApp() {
    const events = this._getFilteredAndSortedEvents();
    const eventsCount = events.length;

    if (this.totalTripInfoComponent !== null) {
      remove(this.totalTripInfoComponent);
    }
    this._removeAddEventButtonHandler();
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
    this._setAddEventButtonHandler(addEventButton);
    this._renderStatistics();
    // this._eventsContainer.hide();

  }

  _renderStatistics() {
    this._statisticsView = new Statistics(this._eventsModel.getEvents());
    render(pageContainer, this._statisticsView, 'beforeend');
    this._setViewModeToggle();

  }

  _handleViewModeToggle(evt) {

    if (evt.target.innerText === this._currentViewMode) {
      return;
    }

    this.viewModeToggles.forEach((toggle) => {
      toggle.classList.contains('trip-tabs__btn--active') ? toggle.classList.remove('trip-tabs__btn--active')
        : toggle.classList.add('trip-tabs__btn--active');
    });

    const [TableView, StatView] = DATA_VIEW_TYPES;
    this._currentViewMode = evt.target.innerText;

    switch (evt.target.innerText) {
      case TableView:
        this._setAddEventButtonEnabled();
        this._showEventsSection();
        this._hideStatsSection();

        // remove(statisticsComponent);
        // filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
        // siteMenuComponent.setItem(MenuItem.TABLE);
        break;
      case StatView:
        this._hideEventsSection();
        this._setAddEventButtonDisabled();
        this._showStatsSection();
        break;
    }
  }

  _showStatsSection() {
    this._statisticsView.getElement().classList.remove('visually-hidden');
  }

  _hideStatsSection() {
    this._statisticsView.getElement().classList.add('visually-hidden');
  }

  _hideEventsSection() {
    this._eventsContainer.getElement().parentNode.classList.add('visually-hidden');
  }

  _showEventsSection() {
    this._eventsContainer.getElement().parentNode.classList.remove('visually-hidden');
  }

  _setViewModeToggle() {
    this.viewModeToggles = this.viewModeToggleComponent.getElement().querySelectorAll('.trip-tabs__btn');
    this.viewModeToggles.forEach((toggle) => {
      toggle.addEventListener('click', this._handleViewModeToggle);
    });
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
        return filteredEvents.sort(sortByDay);
      case SortTypes.TIME:
        return filteredEvents.sort(sortByTime);
      case SortTypes.PRICE:
        return filteredEvents.sort(sortByPrice);
    }
  }

  _destroyEventsSection() {
    if (Object.keys(this._eventsPresenters).length) {
      Object
        .values(this._eventsPresenters)
        .forEach((presenter) => presenter.destroy());
      this._eventsPresenters = {};
      remove(this._sortToggleComponent);
    }

  }

  _clearApp(resetSortType = false) {
    // console.log('clear');
    this._destroyEventsSection();
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
    this._newEventPresenter = new EventNew(this._eventsContainer, this._handleViewAction, this._api._dataModel);
    this._newEventPresenter.init(callback);
  }

  _setAddEventButtonDisabled() {
    addEventButton.disabled = true;
  }

  _setAddEventButtonEnabled() {
    addEventButton.disabled = false;
  }

  _removeAddEventButtonHandler() {
    document.removeEventListener('click', this._addEventButtonHandler);
  }

  _setAddEventButtonHandler(button) {
    button.addEventListener('click', this._addEventButtonHandler);
  }

  _addEventButtonHandler(evt) {
    evt.target.disabled = true;
    this._createNewEventForm(this._setAddEventButtonEnabled);
  }

  _renderEventsContainer() {
    render(tripEvents, this._eventsContainer, RenderPosition.BEFOREEND);
  }

  _renderEventsList(events) {
    // events.slice().forEach((event) => this._renderEvent(event));
    events.slice().forEach((event) => {
      this._renderEvent(event);
    });
  }

  _renderEvent(event) {
    // console.log(event);

    const eventPresenter = new EventPresenter(this._eventsContainer, this._handleViewAction, this._handleModeChange, this._api._dataModel);
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
      // case UserAction.UPDATE_EVENT:
      //   this._tripEventPresenter[update.id].setViewState(TripEventPresenterViewState.SAVING);
      //   this._api.updateTripEvent(update)
      //     .then((response) => {
      //       this._tripEventsModel.updateTripEvent(updateType, response);
      //     })
      //     .catch(() => {
      //       this._tripEventPresenter[update.id].setViewState(TripEventPresenterViewState.ABORTING);
      //     });
      //   break;

      case UserAction.UPDATE_EVENT:
        this._api.updatePoint(update)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          })
          .catch(() => {
            // this._tripEventPresenter[update.id].setViewState(TripEventPresenterViewState.ABORTING);
          });
        console.log(update);



        // this._api.updateTask(update).then((response) => {
        //   this._tasksModel.updateTask(updateType, response);
        // });
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
