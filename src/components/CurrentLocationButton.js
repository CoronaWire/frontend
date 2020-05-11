import * as React from 'react';
import styled, { css } from 'styled-components';
import { Container, Button as BaseButton } from './core';
import { useCurrentLocation } from './../helpers/hooks';

const Button = styled(BaseButton)`
  ${({ theme }) => css`
    background: ${theme.newsColors.pink};
    color: ${theme.newsColors.white};
  `};
  margin-bottom: 16px;
`;

export const CurrentLocationButton = () => {
  const [onPromptLocation, loading] = useCurrentLocation();
  return (
    <Button onClick={onPromptLocation}>
      {loading ? 'Loading...' : 'Use current location'}
    </Button>
  );
};
