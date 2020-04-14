import { css } from 'styled-components';

const BREAKPOINTS = {
  MOBILE: 480,
};

const queries = {
  mobile: `(max-width: ${BREAKPOINTS.MOBILE})`,
  aboveMobile: `(min-width: ${BREAKPOINTS.MOBILE})`,
};

export const media = Object.keys(queries.reduce((acc, label) => {
  acc[label] = (...args) => css`
    && {
      @media ${queries[label]} {
        ${css(...args)};
      }
    }
  `;
  return acc;
}, {});
