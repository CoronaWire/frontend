import { combineReducers } from 'redux';
import authentication from './authentication';
import geolocation from './geolocation';

// Reducers will be subdivided in terms of functionality for more clarity and modularity.
export default combineReducers({
    authentication,
    geolocation,
})

