import {render} from '../utils';
import {CreateTripInfo as CreateTripInfoComponent} from './create-trip-info';
import {CreateMenu as CreateMenuComponent} from './creating-menu';
import {CreateFilterTime as createFilterComponent} from './creating-filter';
import {Events as EventsComponent} from './events-component';
import {addForm} from '../mocks/data';

const siteHeader = document.querySelector('.page-header');

const tripMain = siteHeader.querySelector('.trip-main');
const tripControlsNavigation = siteHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = siteHeader.querySelector('.trip-controls__filters');
const addEventButton = document.querySelector('.trip-main__event-add-btn');


class AppComponent {
  constructor(state) {
    this._state = state;
  }

  setAddEventButtonBehavior(button) {
    const destinationBlock = document.querySelector('.trip-events__list');

    button.addEventListener('click', () => {
      render(destinationBlock, addForm, 'afterbegin');
    });
  }

  renderComponents() {
    render(tripMain, new CreateTripInfoComponent(this._state).getElement(), 'afterbegin');
    render(tripControlsNavigation, new CreateMenuComponent().getElement());
    render(tripControlsFilters, new createFilterComponent().getElement());
    new EventsComponent(this._state).mountComponent();
    this.setAddEventButtonBehavior(addEventButton);
  }
}

export {AppComponent};