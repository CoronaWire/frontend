// Reducer for authentication flow
import { 
    AUTHENTICATE_USER,
    SIGNOUT_USER,
 } from '../actionCreators/constants';

const initialState = {
    isAuthenticated: true,
}

export default function (state = initialState, action) {
    console.log('Passing through authentication reducer');
    switch(action.type) {
        case AUTHENTICATE_USER:
            return Object.assign({}, state, {isAuthenticated: action.isAuthenticated});
        case SIGNOUT_USER:
            return Object.assign({}, state, {isAuthenticated: action.isAuthenticated});
        default:
            return state;
    }
}