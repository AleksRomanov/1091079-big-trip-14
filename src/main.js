import {CreateEventsState} from './view/creating-destination';
import App from './view/app-component';
import {WAYPOINT_COUNT} from './const';

const events = new CreateEventsState().generateEvents(WAYPOINT_COUNT);

new App().renderComponents(events);
