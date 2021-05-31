import App from './presenter/app';
import EventsModel from './model/events';
import FilterModel from './model/filter';
import Api from './api/api';
import DataModel from './model/data';


const AUTHORIZATION = 'Basic gL3vq1921ei3LLL4s';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';


const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const dataModel = new DataModel();

const api = new Api(dataModel, END_POINT, AUTHORIZATION);

// eventsModel.setEvents(events);
const app = new App(eventsModel, filterModel, api);

app.init();


