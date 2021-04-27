import {render, RenderPosition} from '../utils';
import TripInfoView from './create-trip-info';
import ModesToggleView from './creating-menu';
import FiltersView from './creating-filter';
import Events from './events-component';
import SortingToggleView from './creating-sort';
import EventFormView from './create-event-form';

const siteHeader = document.querySelector('.page-header');

const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const addEventButton = document.querySelector('.trip-main__event-add-btn');


export default class AppComponent {

  setAddEventButtonBehavior(button) {
    const destinationBlock = document.querySelector('.trip-events__list');

    button.addEventListener('click', () => {
      render(destinationBlock, new EventFormView().getElement(), 'afterbegin');
    });
  }

  renderComponents(state) {
    //Рэндер всех пунктов маршрута
    new Events().mountComponent(state);
    //Рэндер сводной информации о всём путешествии
    render(tripMain, new TripInfoView(state).getElement(), RenderPosition.AFTERBEGIN);
    //Рэндер переключателя режима отображения информации
    render(tripControlsNavigation, new ModesToggleView().getElement(), RenderPosition.AFTERBEGIN);
    //Рэндер переключения фильтрации
    render(tripControlsFilters, new FiltersView().getElement(), RenderPosition.AFTERBEGIN);
    //Настройка поведения кнопки добавления точки маршрута
    this.setAddEventButtonBehavior(addEventButton);
    //Рэндер переключения сортировки
    render(tripEvents, new SortingToggleView().getElement(), RenderPosition.AFTERBEGIN);
  }
}

