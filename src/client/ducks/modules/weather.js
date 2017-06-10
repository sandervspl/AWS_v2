// actions
export const START = 'AWS/weather/START';
export const SUCCESS = 'AWS/weather/SUCCESS';
export const FAIL = 'AWS/weather/FAIL';

// secret
import { weatherApiKey } from '../../../secret/vars';

// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  errorMessage: '',
  weatherData: {},
};

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        loading: true,
        error: false,
        loaded: false,
        errorMessage: '',
      };

    case SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        errorMessage: '',
        weatherData: action.payload,
      };

    case FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        loaded: false,
        errorMessage: action.errorMessage,
      };

    default:
      return state;
  }
};

// action creators
const fetchStart = () => ({
  type: START,
});

const fetchSuccess = payload => ({
  type: SUCCESS,
  payload,
});

const fetchFail = (errorMessage = 'Unable to connect to server.') => ({
  type: FAIL,
  errorMessage,
});

// async actions
export const fetchWeatherData = () => async (dispatch, getState) => {
  // set fetch state to start
  dispatch(fetchStart());

  try {
    const { latitude, longitude } = getState().location.locationData.coords;

    // create endpoint for OpenWeather API
    const endpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${weatherApiKey}`;

    // fetch weather data from open weather API
    let result = await fetch(endpoint);
    result = await result.json();

    // set state to result
    dispatch(fetchSuccess(result));
  } catch (err) {
    // console.error(`weather ERROR: ${err}`);
    dispatch(fetchFail('Unable to fetch weather data.'));
  }
};
