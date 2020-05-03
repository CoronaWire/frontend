import styled, { css } from 'styled-components';
import { h3Css } from './Text';

export const Button = styled.button`
  height: 40px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  outline: none;
  ${h3Css};
  ${({ block }) => {
    if (block) {
      return css`
        display: block;
        width: 100%;
      `;
    }
    return 'width: 212px';
  }};
`
