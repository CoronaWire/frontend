import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { setScopeAction } from './../actionCreators/actions';
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
    border-bottom: 1px solid ${({ theme }) => theme.newsColors.primary};
    ${OptionText} {
      color: ${theme.newsColors.primary};
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
  const activeScope = useSelector(({ newsFeed: { scope } }) => scope);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSelect = (id) => {
    dispatch(setScopeAction(id));
    if (location.pathname !== '/') {
      history.push('/');
    }
  };
  return (
    <Container width="100%">
      {options.map(({ id, name }, index) => (
        <Option
          onClick={() => handleSelect(id)}
          total={options.length}
          active={id === activeScope}
          key={id}
          name={name}
        />
      ))}
    </Container>
  );
};
