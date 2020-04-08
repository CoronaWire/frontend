// Initialization of Redux Store

// External Packages
import { createStore } from 'redux';
// Internal Modules
// Redux
import reducer from '../reducers/index';

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
);

