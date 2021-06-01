import App from './presenter/app';
import EventsModel from './model/events';
import FilterModel from './model/filter';
import Api from './api/api';
import DataModel from './model/data';
// import {makeRandomString} from './utils/common';

// usage
// console.log(makeRandomString(17));

const AUTHORIZATION = 'Basic l6bp397ywsfd6x9sc';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const dataModel = new DataModel();

const api = new Api(dataModel, END_POINT, AUTHORIZATION);

// eventsModel.setEvents(events);
const app = new App(eventsModel, filterModel, api);

// _setServiceWorkerRegistrationOnLoad() {
window.addEventListener('load', () => {
  navigator.serviceWorker.register('./sw.js');
});
// }
// this._setServiceWorkerRegistrationOnLoad();

app.init();


