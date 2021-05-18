import {CreateEventsState} from './mocks/creating-destination';
import App from './presenter/app';
import {WAYPOINT_COUNT} from './const';

const events = new CreateEventsState().generateEvents(WAYPOINT_COUNT);
const app = new App();
app.init(events);
