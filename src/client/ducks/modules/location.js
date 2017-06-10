// actions
export const START = 'AWS/location/START';
export const SUCCESS = 'AWS/location/SUCCESS';
export const FAIL = 'AWS/location/FAIL';


// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  errorMessage: '',
  locationData: {},
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
        locationData: action.payload,
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
export const fetchLocationData = () => async (dispatch) => {
  // set fetch state to start
  dispatch(fetchStart());

  try {
    // set options for position fetch
    const options = {
      enableHighAccuracy: true,
      // timeout: 10000,
      maximumAge: 0,
    };

    // fetch current position data
    navigator.geolocation.getCurrentPosition(
        (data) => {
          // save data to state
          dispatch(fetchSuccess(data));
        },
        (err) => {
          // console.log(`location ERROR(${err.code}): ${err.message}`);
          dispatch(fetchFail('Unable to retrieve location data.'));
        },
        options,
    );
  } catch (err) {
    console.error(`location ERROR: ${err}`);
    dispatch(fetchFail());
  }
};
