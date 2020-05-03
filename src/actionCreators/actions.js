import {
  AUTHENTICATE_USER,
  SIGNOUT_USER,
  SET_SCOPE,
  SET_LOCATION,
} from './constants';

export const authenticateUser = (state) => ({
    type: AUTHENTICATE_USER,
    isAuthenticated: true
});

export const signoutUser = (state) => ({
    type: SIGNOUT_USER,
    isAuthenticated: false
});

export const setScopeAction = (scope) => ({
  type: SET_SCOPE,
  scope,
});

export const setLocationAction = (location) => ({
  type: SET_LOCATION,
  location,
});
