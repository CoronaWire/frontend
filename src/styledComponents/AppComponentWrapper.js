// App component wrapper
// Div containers that wraps the whole page ans sets basic styling, width, height, etc.

import styled from 'styled-components';
import { media } from './../helpers/media';

const AppComponentWrapper = styled.div`
  width: 100% !important;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  ${media.aboveMobile`
    min-width: 600px;
  `};
  font-family: 'Muli', sans-serif;
`;

// #toFix: Position fixed is a hack for now, set it differently.

export default AppComponentWrapper;
