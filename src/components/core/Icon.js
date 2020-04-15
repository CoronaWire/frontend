import * as React from 'react';

export const DownArrowIcon = ({ width = 16 }) => (
  <svg width={width} viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.654 1.40082L13.8119 10.9445L0.969818 1.40082" stroke="#828282" strokeWidth="2"/>
  </svg>
);

export const UpArrowIcon = ({ width = 16 }) => (
  <svg width={width} viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.970018 11.5433L13.8124 2.00011L26.6542 11.5442" stroke="#828282" strokeWidth="2"/>
  </svg>
);

export const CheckMarkIcon = ({width= 10}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height="24" viewBox="0 0 24 24">
    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
  </svg>
);