import {render} from '../utils';
import {CreateTripInfo as CreateTripInfoComponent} from './create-trip-info';
import {CreateMenu as CreateMenuComponent} from './creating-menu';
import {CreateFilterTime as createFilterComponent} from './creating-filter';
import {Events as EventsComponent} from './events-component';
import {addForm, editForm} from '../mocks/data';
import {CreateSortingOffers as CreateSortingOffersComponent} from './creating-sort';

const siteHeader = document.querySelector('.page-header');

const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const addEventButton = document.querySelector('.trip-main__event-add-btn');


class AppComponent {

  setAddEventButtonBehavior(button) {
    const destinationBlock = document.querySelector('.trip-events__list');

    button.addEventListener('click', () => {
      render(destinationBlock, addForm, 'afterbegin');
    });
  }

  renderComponents(state) {
    //Рэндер всех пунктов маршрута
    console.log(state);
    new EventsComponent().mountComponent(state);
    //Рэндер сводной информации о всём путешествии
    render(tripMain, new CreateTripInfoComponent().getElement(state), 'afterbegin');
    //Рэндер переключателя режима отображения информации
    render(tripControlsNavigation, new CreateMenuComponent().getElement());
    //Рэндер переключения фильтрации
    render(tripControlsFilters, new createFilterComponent().getElement());
    //Настройка поведения кнопки добавления точки маршрута
    this.setAddEventButtonBehavior(addEventButton);
    //Рэндер переключения сортировки
    render(tripEvents, new CreateSortingOffersComponent().getElement(), 'afterbegin');
  }
}

export {AppComponent};
