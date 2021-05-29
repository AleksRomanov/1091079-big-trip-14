import {generateEvents} from './mocks/creating-destination';
import App from './presenter/app';
import {UpdateType, WAYPOINT_COUNT} from './const';
import EventsModel from './model/events';
import FilterModel from './model/filter';
import Api from './api';
import {render, RenderPosition} from './utils/render';
import DataModel from './model/data';

// const events = generateEvents(WAYPOINT_COUNT);
// console.log(events[0]);

const AUTHORIZATION = 'Basic gA5vq8pnRlip8nw9c';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const api = new Api(END_POINT, AUTHORIZATION);


const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const dataModel = new DataModel();
// eventsModel.setEvents(events);
const app = new App(eventsModel, filterModel, api, dataModel);
app.init();
