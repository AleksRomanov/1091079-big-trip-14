import {render, RenderPosition} from '../utils/render';
import TripInfoView from '../view/create-trip-info';
import ModesToggleView from '../view/creating-menu';
import FiltersView from '../view/creating-filter';
import SortingToggleView from '../view/creating-sort';
import EventFormView from '../view/create-event-form';
import EventsContainerView from '../view/events-container';
import PointPresenter from './event';
import {updateItem} from '../utils/common';
import NoEventsView from '../view/creating-no-events';

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
    this.totalTripInfoComponent = new TripInfoView(this._events);
    this.viewModeToggleComponent = new ModesToggleView();
    this.filtreToggleComponent = new FiltersView();
    this.sortToggleComponent = new SortingToggleView();
    this.eventForm = new EventFormView();
    this._eventPresenter = {};
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleAddFormClose = this._handleAddFormClose.bind(this);
  }

  init() {
    if(this._events.length) {
      this._renderEventsContainer();
      this._renderEventsList();
      this._renderEventControl();
    } else {
      this._renderNoEvents();
    }
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
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _renderEvent(event) {
    const eventPresenter = new PointPresenter(this._eventsContainer, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderNoEvents() {
    const noEvents = new NoEventsView();
    render(tripEvents, noEvents);
  }

  _renderEventControl() {
    //Рэндер сводной информации о всём путешествии
    render(tripMain, this.totalTripInfoComponent);
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

