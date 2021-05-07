import {render, RenderPosition} from '../utils/render';
import TripInfoView from './create-trip-info';
import ModesToggleView from './creating-menu';
import FiltersView from './creating-filter';
import SortingToggleView from './creating-sort';
import EventFormView from './create-event-form';
import EventsListView from './creating-waypoint';

const siteHeader = document.querySelector('.page-header');
const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const addEventButton = document.querySelector('.trip-main__event-add-btn');
const siteBodyPageMain = document.querySelector('.page-body__page-main');
const tripEvents = siteBodyPageMain.querySelector('.trip-events');

export default class AppComponent {

  setAddEventButtonBehavior(button) {
    const destinationBlock = document.querySelector('.trip-events__list');

    button.addEventListener('click', () => {
      render(destinationBlock, new EventFormView().getElement(), 'afterbegin');
    });
  }

  renderComponents(state) {
    //Рэндер всех пунктов маршрута
    render(tripEvents, new EventsListView(state), RenderPosition.BEFOREEND);
    //Рэндер сводной информации о всём путешествии
    render(tripMain, new TripInfoView(state), RenderPosition.AFTERBEGIN);
    //Рэндер переключателя режима отображения информации
    render(tripControlsNavigation, new ModesToggleView(), RenderPosition.AFTERBEGIN);
    //Рэндер переключения фильтрации
    render(tripControlsFilters, new FiltersView(), RenderPosition.AFTERBEGIN);
    //Настройка поведения кнопки добавления точки маршрута
    this.setAddEventButtonBehavior(addEventButton);
    //Рэндер переключения сортировки
    render(tripEvents, new SortingToggleView(), RenderPosition.AFTERBEGIN);
  }
}

