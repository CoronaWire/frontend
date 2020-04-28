// Reducer for general news feed
import { SET_LOCATION, SET_SCOPE } from '../actionCreators/constants';

const initialState = {
  scope: 'local',
  location: {},
}

export const newsFeed = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCOPE:
      return {
        ...state,
        scope: action.scope,
      };
    case SET_LOCATION:
      return {
        ...state,
        location: action.location,
        scope: 'local',
      };
    default:
      return state;
  }
}
