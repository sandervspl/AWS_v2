// actions
export const OPEN = 'AWS/widgetMenu/OPEN';
export const CLOSE = 'AWS/widgetMenu/CLOSE';

// state
export const initialState = {
  active: false,
  kind: null,
};

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN:
      console.log('open window');
      return {
        active: true,
        kind: action.kind,
      }

    case CLOSE:
      return {
        active: false,
      }

    default:
      return state;
  }
};

// actions
const open = kind => ({
  type: OPEN,
  kind,
});

const close = () => ({
  type: CLOSE,
});

// action creators
export const openWindow = kind => dispatch => dispatch(open(kind));

export const closeWindow = () => dispatch => dispatch(close());
