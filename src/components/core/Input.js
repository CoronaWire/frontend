import styled from 'styled-components';
import { b1Css } from './Text';

export const Input = styled.input`
  padding: 13px;
  ${b1Css};
  color: ${({ theme }) => theme.newsColors.secondary};
  ::placeholder {
    color: ${({ theme }) => theme.newsColors.midGrey};
  }
  border-radius: 2px;
  width: 100%;
  border 1px solid ${({ theme }) => theme.newsColors.lightGrey};
  height: 48px;
  text-decoration: none;
  &:focus {
    outline: none;
  }
`;
