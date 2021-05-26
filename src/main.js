import {generateEvents} from './mocks/creating-destination';
import App from './presenter/app';
import {WAYPOINT_COUNT} from './const';
import EventsModel from './model/events';
import FilterModel from './model/filter';

const events = generateEvents(WAYPOINT_COUNT);
// console.log(events);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
eventsModel.setEvents(events);


const app = new App(eventsModel, filterModel);
app.init();

