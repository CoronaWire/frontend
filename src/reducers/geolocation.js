// Reducer for authentication flow
import { 
    SET_GEOLOCATION,
 } from '../actionCreators/constants';

const initialState = {
  geolocation: {},
};

export default function (state = initialState, action) {
    console.log('Passing through authentication reducer');
    switch(action.type) {
        case SET_GEOLOCATION:
          return { ...state, geolocation: action.geolocation };
        default:
            return state;
    }
}
