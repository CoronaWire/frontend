import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { H3, Container } from './core';

const OptionText = styled(H3)`
  color: ${({ theme }) => theme.newsColors.midGrey};
`;

const OptionWrapper = styled(Container)`
  padding-bottom: 8px;
  cursor: pointer;
  justify-content: center;
  width: ${({ total }) => `calc(100% / ${total})`};
  border-bottom: 1px solid transparent;
  ${({ active, theme }) => active && css`
    border-bottom: 1px solid ${({ theme }) => theme.newsColors.pink};
    ${OptionText} {
      color: ${theme.newsColors.pink};
    }
  `};
`;

const Option = ({ total, onClick, active, name }) => (
  <OptionWrapper total={total} onClick={onClick} active={active}>
    <OptionText>{name}</OptionText>
  </OptionWrapper>
);

const options = [
  { id: 'local', name: 'LOCAL' },
  { id: 'national', name: 'NATIONAL' },
  { id: 'global', name: 'GLOBAL' },
];

export const MobileFeedSelector = () => {
  const [activeFeed, setActiveFeed] = useState('local');
  return (
    <Container width="100%">
      {options.map(({ id, name }, index) => (
        <Option
          onClick={() => {
            setActiveFeed(id);
          }}
          total={options.length}
          active={id === activeFeed}
          name={name}
        />
      ))}
    </Container>
  );
};
