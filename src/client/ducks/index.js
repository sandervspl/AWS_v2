// dependencies
import { combineReducers } from 'redux';

// duck modules
import location from './modules/location';
import weather from './modules/weather';
import widgetWindow from './modules/widgetWindow';
import notifications from './modules/notifications';

const allReducers = combineReducers({
  location,
  weather,
  widgetWindow,
  notifications,
});

export default allReducers;
