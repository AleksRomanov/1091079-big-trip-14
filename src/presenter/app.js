import {render, RenderPosition} from '../utils/render';
import TripInfoView from '../view/create-trip-info';
import ModesToggleView from '../view/creating-menu';
import FiltersView from '../view/creating-filter';
import SortingToggleView from '../view/creating-sort';
import EventFormView from '../view/create-event-form';
import EventsListView from '../view/creating-waypoint';
import EventsContainerView from '../view/events-container';
import PointPresenter from './event';
import {updateItem} from '../utils/common';

const siteHeader = document.querySelector('.page-header');
const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const addEventButton = document.querySelector('.trip-main__event-add-btn');
const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');

export default class App {
  constructor(state) {
    this._events = state;
    this._eventsContainer = new EventsContainerView();
    this.eventsListComponent = new EventsListView(this._events);
    this.totalTripInfoComponent = new TripInfoView(this._events);
    this.viewModeToggleComponent = new ModesToggleView();
    this.filtreToggleComponent = new FiltersView();
    this.sortToggleComponent = new SortingToggleView();
    this._eventPresenter = {};
    // this._eventsContainer = document.querySelector('.');
    // console.log(this._eventsContainer);

  }

  init() {
    this._renderEventsContainer();
    this._renderEventsList();
    this._renderEventControl();
    // console.log(tripEvents);

  }

  _setAddEventButtonBehavior(button) {
    const destinationBlock = document.querySelector('.trip-events__list');

    button.addEventListener('click', () => {
      render(destinationBlock, new EventFormView().getElement());
    });
  }
  _renderEventsContainer() {
    render(tripEvents, this._eventsContainer, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    this._events.slice().forEach((event) => this._renderEvent(event));
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._boardTasks = updateItem(this._boardTasks, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _renderEvent(event) {
    // console.log(this._eventsContainer);
    // const cont = document.querySelector('.trip-events__list');
    // const eventPresenter = new PointPresenter(cont, this._handleEventChange);
    const eventPresenter = new PointPresenter(this._eventsContainer, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
    // console.log(this._eventPresenter);
  }

  _renderEventControl() {
    render(tripMain, this.totalTripInfoComponent);
    //Рэндер сводной информации о всём путешествии
    //Рэндер переключателя режима отображения информации
    render(tripControlsNavigation, this.viewModeToggleComponent);
    //Рэндер переключения фильтрации
    render(tripControlsFilters, this.filtreToggleComponent);
    //Настройка поведения кнопки добавления точки маршрута
    this._setAddEventButtonBehavior(addEventButton);
    //Рэндер переключения сортировки
    render(tripEvents, this.sortToggleComponent);
  }

}

