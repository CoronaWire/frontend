import * as React from 'react';
import styled from 'styled-components';
import { Container } from './core';

const NotSupportedText = styled.p`
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.18px;
  width: 467px;
  text-align: center;
`;

export const RegionNotSupported = () => (
  <Container
    justify="center"
    align="center"
    width="100%"
    height="838px"
    bg="#F2F2F2"
  >
    <NotSupportedText>
      We don’t have enough local information for your area yet. You can still view national news. Check back soon as we are constantly updating this with the latest COVID information
    </NotSupportedText>
  </Container>
);

const NotSpecifiedText = styled.p`
  width: 322px;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.18px;
  font-weight: bold;
  text-align: center;
`;

export const RegionNotSpecified = () => (
  <Container
    justify="center"
    align="center"
    width="100%"
    height="838px"
  >
    <NotSpecifiedText>
      Select your neighborhood or allow Coronavirus Wire to find your location
    </NotSpecifiedText>
  </Container>
);
