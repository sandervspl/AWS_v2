// dependencies
import { combineReducers } from 'redux';

// duck modules
import location from './modules/location';
import weather from './modules/weather';

const allReducers = combineReducers({
  location,
  weather,
});

export default allReducers;