import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { H3, Container } from './core';

const OptionText = styled(H3)`
  color: ${({ theme }) => theme.newsColors.midGrey};
`;

const OptionWrapper = styled(Container)`
  padding-bottom: 8px;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.newsColors.midGrey};
  ${({ active, theme }) => active && css`
    border-bottom: 2px solid ${({ theme }) => theme.newsColors.pink};
    ${OptionText} {
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
  <OptionWrapper onClick={onClick} active={active}>
    <OptionText>{name}</OptionText>
  </OptionWrapper>
);

const options = [
  { id: 'national', name: 'NATIONAL NEWS' },
  { id: 'global', name: 'GLOBAL NEWS' },
];

export const FeedSelector = ({ activeFeed, setActiveFeed }) => (
  <Container align="flex-end" width="100%">
    {options.map(({ id, name }, index) => (
      <React.Fragment key={id}>
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
  </Container>
);
