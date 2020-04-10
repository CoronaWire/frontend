import {
    AUTHENTICATE_USER,
    SIGNOUT_USER,
    SET_GEOLOCATION,
} from './constants';

export const authenticateUser = (state) => ({
    type: AUTHENTICATE_USER,
    isAuthenticated: true
});

export const signoutUser = (state) => ({
    type: SIGNOUT_USER,
    isAuthenticated: false
});

export const setGeolocation = geolocation => ({
  type: SET_GEOLOCATION,
  geolocation,
});
