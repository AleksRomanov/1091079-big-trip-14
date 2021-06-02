import App from './presenter/app';
import EventsModel from './model/events';
import FilterModel from './model/filter';
import Api from './api/api';
import DataModel from './model/data';
import {makeRandomString} from './utils/common';

const AUTHORIZATION = makeRandomString(23);
const AUTHORIZATION_KEY = 'AUTHORIZATION';
if (localStorage.getItem(AUTHORIZATION_KEY) === null) {
  localStorage.setItem(AUTHORIZATION_KEY, AUTHORIZATION);
}
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const dataModel = new DataModel();

const api = new Api(dataModel, END_POINT, localStorage.AUTHORIZATION);

const app = new App(eventsModel, filterModel, api);

app.init();

window.addEventListener('load', () => {
  navigator.serviceWorker.register('./sw.js');
});
