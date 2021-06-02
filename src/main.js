import App from './presenter/app';
import EventsModel from './model/events';
import FilterModel from './model/filter';
import Api from './api/api';
import DataModel from './model/data';
import {makeRandomString} from './utils/common';
import {AUTH_DATA} from './const';

const authCode = makeRandomString(AUTH_DATA.KEY_LENGTH);
if (localStorage.getItem(AUTH_DATA.KEY_NAME) === null) {
  localStorage.setItem(AUTH_DATA.KEY_NAME, authCode);
}
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const dataModel = new DataModel();

const api = new Api(dataModel, END_POINT, localStorage[AUTH_DATA.KEY_NAME]);
const app = new App(eventsModel, filterModel, api);

app.init();

window.addEventListener('load', () => {
  navigator.serviceWorker.register('./sw.js');
});
