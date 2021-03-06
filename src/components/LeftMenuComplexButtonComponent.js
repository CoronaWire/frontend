// Left Menu Button Component
// Buttons used within the @LeftSideMenuComponent to display options to users
// E.g. Button for 'News', 'Numbers', 'COVID-19' facts, etc. each with their title and respective
// sub-titles

// ExternalPackages
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
// Internal Modules
import { media } from './../helpers/media';
import MenuButton from '../styledComponents/MenuButton';
import { H2, H4 } from './core';

const MenuButtonTitle = styled(H2)`
  ${({ theme }) => `color: ${theme.newsColors.darkGrey}`};
  margin-bottom: 8px;
  ${media.mobile`
    ${({ theme }) => `color: ${theme.newsColors.lightGrey}`};
  `};
`;

const MenuButtonSubTitle = styled(H4)`
  ${({ theme }) => `color: ${theme.newsColors.darkGrey}`};
  ${media.mobile`
    ${({ theme }) => `color: ${theme.newsColors.lightGrey}`};
  `};
`;

const Wrapper = styled.div`
  padding: 5px 0 3px 24px;
  border-left: 4px solid transparent;
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
        border-left: 4px solid ${theme.newsColors.primary};
      }
      ${MenuButtonTitle}, ${MenuButtonSubTitle} {
        color: ${theme.newsColors.primary};
      }
    `};
  }
  ${({ theme }) => css`
    &:hover {
      ${MenuButtonTitle}, ${MenuButtonSubTitle} {
        color: ${theme.newsColors.primary};
      }
    }
  `};
`;

// For now, MenuButtonTitle here is the initial design made with Jeff's wireframe.
// The MenuButtonTitle in the Styled Components folder is the one designed by Linda
// #toDo: choose between one design and the other.

const LeftMenuComplexButtonComponent = ({ onClick, path, title, subTitle }) => (
  <StyledLink exact to={path} onClick={onClick}>
    <Wrapper>
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
