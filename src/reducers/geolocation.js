// Reducer for authentication flow
import { 
  SET_GEOLOCATION,
  SET_GEOLOCATION_REFUSED,
 } from '../actionCreators/constants';

const initialState = {
  geolocation: {},
  geolocationRefused: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
      case SET_GEOLOCATION:
        return { ...state, geolocation: action.geolocation };
      case SET_GEOLOCATION_REFUSED:
        return { ...state, geolocationRefused: true };
        default:
            return state;
    }
}
