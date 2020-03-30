import {
    AUTHENTICATE_USER,
    SIGNOUT_USER
} from './constants';

export const authenticateUser = (state) => ({
    type: AUTHENTICATE_USER,
    isAuthenticated: true
});

export const signoutUser = (state) => ({
    type: SIGNOUT_USER,
    isAuthenticated: false
});