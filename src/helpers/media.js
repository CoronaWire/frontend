import { css } from 'styled-components';

const BREAKPOINTS = {
  MOBILE: 480,
  DESKTOP_LAYOUT_START: 860,
};

const queries = {
  mobile: `(max-width: ${BREAKPOINTS.MOBILE}px)`,
  aboveMobile: `(min-width: ${BREAKPOINTS.MOBILE}px)`,
  mobileLayout: `(max-width: ${BREAKPOINTS.DESKTOP_LAYOUT_START}px)`,
  desktopLayout: `(min-width: ${BREAKPOINTS.DESKTOP_LAYOUT_START}px)`,
};

export const media = Object.keys(queries).reduce((acc, label) => {
  acc[label] = (...args) => css`
    && {
      @media ${queries[label]} {
        ${css(...args)};
      }
    }
  `;
  return acc;
}, {});
