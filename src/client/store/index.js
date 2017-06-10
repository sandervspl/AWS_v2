import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

// reducers
import app from '../ducks';

// create store with middleware
const logger = createLogger();

const store = createStore(
    app,
    applyMiddleware(thunk, logger),
);

// debugging
// if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  window.store = store;
// }

export default store;