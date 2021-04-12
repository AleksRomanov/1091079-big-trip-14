import {CreateEventsState} from './view/creating-destination';
import {AppComponent} from './view/app-component';

const WAYPOINT_COUNT = 29;
const props = [WAYPOINT_COUNT];


const state = new CreateEventsState(props).generateEvents();

new AppComponent(state).renderComponents();
