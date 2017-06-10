// dependencies
import { combineReducers } from 'redux';

// duck modules
import location from './modules/location';
import weather from './modules/weather';
import widgetWindow from './modules/widgetWindow';

const allReducers = combineReducers({
  location,
  weather,
  widgetWindow,
});

export default allReducers;