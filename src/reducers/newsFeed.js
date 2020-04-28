// Reducer for general news feed
import {  SET_SCOPE } from '../actionCreators/constants';

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
      }
    default:
      return state;
  }
}
