// Left Menu Button Component
// Buttons used within the @LeftSideMenuComponent to display options to users
// E.g. Button for 'News', 'Numbers', 'COVID-19' facts, etc. each with their title and respective
// sub-titles

// ExternalPackages
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
// Internal Modules
import MenuButton from '../styledComponents/MenuButton';
import { H2, H4 } from './core';

const MenuButtonTitle = styled(H2)`
  ${({ theme }) => `color: ${theme.newsColors.darkGrey}`};
  margin-bottom: 8px;
`;

const MenuButtonSubTitle = styled(H4)`
  ${({ theme }) => `color: ${theme.newsColors.darkGrey}`};
`;

const Wrapper = styled.div`
  padding: 5px 0 3px 24px;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  display: block;
  margin-top: 26px;
  &:first-child {
    margin-top: 0;
  }
  &.active {
    ${({ theme }) => css`
      ${Wrapper} {
        border-left: 4px solid ${theme.newsColors.pink};
      }
      ${MenuButtonTitle}, ${MenuButtonSubTitle} {
        color: ${theme.newsColors.pink};
      }
    `};
  }
`;

// For now, MenuButtonTitle here is the initial design made with Jeff's wireframe.
// The MenuButtonTitle in the Styled Components folder is the one designed by Linda
// #toDo: choose between one design and the other.

const LeftMenuComplexButtonComponent = ({ path, active, title, subTitle }) => (
  <StyledLink to={path}>
    <Wrapper active={active}>
      <MenuButtonTitle>
        {title}
      </MenuButtonTitle>
      <MenuButtonSubTitle>
        {subTitle}
      </MenuButtonSubTitle>
    </Wrapper>
  </StyledLink>
);

export default LeftMenuComplexButtonComponent;
