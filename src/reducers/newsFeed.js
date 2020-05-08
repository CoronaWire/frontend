// Reducer for general news feed
import { SET_LOCATION, SET_SCOPE } from '../actionCreators/constants';
import { getLocationFromLocalStorage } from './../helpers/localStorage';

const defaultLocation = {
  "lat": 37.7749295,
  "lng": -122.4194155,
  "name": "San Francisco, CA, USA",
  "state": "California",
  "countyFipsCode": "06075"
};

const initialState = {
  scope: 'local',
  location: getLocationFromLocalStorage() || defaultLocation,
}

export const newsFeed = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCOPE:
      return {
        ...state,
        scope: action.scope,
      };
    case SET_LOCATION:
      console.log(action.location);
      return {
        ...state,
        location: action.location,
        scope: 'local',
      };
    default:
      return state;
  }
}
