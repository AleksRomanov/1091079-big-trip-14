import {render, RenderPosition} from '../utils/render';
import TripInfoView from '../view/create-trip-info';
import ModesToggleView from '../view/creating-menu';
import FiltersView from '../view/creating-filter';
import SortingToggleView from '../view/creating-sort';
import EventFormView from '../view/create-event-form';
import EventsListView from '../view/creating-waypoint';

const siteHeader = document.querySelector('.page-header');
const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const addEventButton = document.querySelector('.trip-main__event-add-btn');
const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');

export default class Events {
  constructor(state) {
    this._state = state;
    this.eventsListComponent = new EventsListView(this._state);
    this.totalTripInfoComponent = new TripInfoView(this._state);
    this.viewModeToggleComponent = new ModesToggleView();
    this.filtreToggleComponent = new FiltersView();
    this.sortToggleComponent = new SortingToggleView();
  }

  setAddEventButtonBehavior(button) {
    const destinationBlock = document.querySelector('.trip-events__list');

    button.addEventListener('click', () => {
      render(destinationBlock, new EventFormView().getElement(), 'afterbegin');
    });
  }

  _renderEventsList() {
    render(tripEvents, this.eventsListComponent, RenderPosition.BEFOREEND);
    render(tripMain, this.totalTripInfoComponent);
  }

  _renderEventControl() {
    //Рэндер сводной информации о всём путешествии
    //Рэндер переключателя режима отображения информации
    render(tripControlsNavigation, this.viewModeToggleComponent);
    //Рэндер переключения фильтрации
    render(tripControlsFilters, this.filtreToggleComponent);
    //Настройка поведения кнопки добавления точки маршрута
    this.setAddEventButtonBehavior(addEventButton);
    //Рэндер переключения сортировки
    render(tripEvents, this.sortToggleComponent);
  }

  init() {
    this._renderEventsList();
    this._renderEventControl();
  }
}

