import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { H3, Container } from './core';

const SelectorText = styled(H3)`
  color: ${({ theme }) => theme.newsColors.midGrey};
`;

const Item = styled(Container)`
  padding-bottom: 8px;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.newsColors.midGrey};
  ${({ active, theme }) => active && css`
    border-bottom: 2px solid ${({ theme }) => theme.newsColors.pink};
    ${SelectorText} {
      color: ${theme.newsColors.pink};
    }
  `};
`;

const Divider = styled.div`
  width: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.newsColors.midGrey};
`;

const EndDivider = styled.div`
  flex: 1;
  border-bottom: 2px solid ${({ theme }) => theme.newsColors.midGrey};
`;

const Option = ({ onClick, active, name }) => (
  <Item onClick={onClick} active={active}>
    <SelectorText>{name}</SelectorText>
  </Item>
);

const options = [
  { id: 'national', name: 'NATIONAL NEWS' },
  { id: 'global', name: 'GLOBAL NEWS' },
];

export const FeedSelector = () => {
  const [activeFeed, setActiveFeed] = useState('national');
  return (
    <Container align="flex-end" width="100%">
      {options.map(({ id, name }, index) => (
        <React.Fragment>
          {!!index && <Divider />}
          <Option
            onClick={() => {
              setActiveFeed(id);
            }}
            active={id === activeFeed}
            name={name}
          />
        </React.Fragment>
      ))}
      <EndDivider />
    </Container>
  );
};
