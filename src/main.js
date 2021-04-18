import {CreateEventsState} from './view/creating-destination';
import {AppComponent} from './view/app-component';
import {WAYPOINT_COUNT} from './const';

const state = new CreateEventsState().generateEvents(WAYPOINT_COUNT);

new AppComponent().renderComponents(state);
