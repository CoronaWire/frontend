// App component wrapper
// Div containers that wraps the whole page ans sets basic styling, width, height, etc.

import styled from 'styled-components';

const AppComponentWrapper = styled.div`
  height: 100%;
  width: 100% !important;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  min-width: 600px;
  font-family: 'Muli', sans-serif;
  position: fixed;
`;

// #toFix: Position fixed is a hack for now, set it differently.

export default AppComponentWrapper;
