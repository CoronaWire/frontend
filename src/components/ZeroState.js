import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { H4, Container } from './core';

const ZeroText = styled(H4)`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.newsColors.navy};
`;

const Bold = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const LocalZeroState = () => {
  const name = useSelector(({ newsFeed: { location } }) => location && location.name);
  return (
    <Container flexColumn>
      <ZeroText>
        {`Local news for `}
        <Bold>{name}</Bold>
        {` currently not available.`}
      </ZeroText>
      <ZeroText>
        We currently support cities in the greater San Francisco and Seattle regions.
        Check back later as we’re always adding new cities to our feed!
      </ZeroText>
    </Container>
  );
}
