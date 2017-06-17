// actions
export const NEW = 'AWS/Notifications/NEW';

// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  errorMessage: '',
  notifications: [],
};

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case NEW:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    default:
      return state;
  }
};

// action creators
const newNotification = payload => ({
  type: NEW,
  payload,
});

// actions
export const createNotification = (kind, text, expires_at) => (
  dispatch,
  getState
) => {
  // positioning
  const start = 45;
  const height = 35;
  const offset = start + getState().notifications.length * height;

  // create new notification
  dispatch(
    newNotification({
      // id: this.counter,
      kind,
      text,
      offset,
      created_at: Date.now(),
      expires_at,
    })
  );
};

// async actions
// export const fetch = () => async dispatch => {
//   // set fetch state to start
//   dispatch(fetchStart());
//
//   try {
//     // set state to result
//     dispatch(fetchSuccess(payload));
//   } catch (err) {
//     // console.error(`Notifications ERROR: ${err}`);
//     dispatch(fetchFail());
//   }
// };
