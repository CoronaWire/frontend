// Left Menu Component = News, Numbers, CoronaVirus Facts
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
// Internal Modules
import LeftMenuButtonComponent from './LeftMenuComplexButtonComponent';
import DividingLine from '../styledComponents/DividingLine';
import { B1, Container, Button } from './core';

// #toDo: Needs to be connected to parent component, Dashboard and send up the actual news

const LeftMenuWrapper = styled.div`
  background-color: transparent;
  width: 100%
`

const Separator = styled(DividingLine)`
  ${({ theme }) => `background-color: ${theme.newsColors.midGrey}`};
  margin: 32px 0;
`;
// #toDo: move margin-top to GlobalTheming to ensure that it'll be shared across the Dashboard middle title
// and the main menu buttons

const menuOptions = [
 {
   title: 'News',
   subTitle: "Learn what's reported locally",
   path: '/',
 },
 {
   title: 'About Covid Wire',
   subTitle: 'Donate & learn about the site',
   path: '/about',
 },
];

const MenuContent = styled(Container)`
  padding: 0 24px;
  width: 100%;
`;

const FeedbackText = styled(B1)`
  ${({ theme }) => `color: ${theme.newsColors.navy}`};
  margin-bottom: 16px;
`;

const FeedbackButton = styled(Button)`
  ${({ theme }) => css`
    background: ${theme.newsColors.pink};
    color: ${theme.newsColors.white};
  `};
  text-transform: uppercase;
`;

const LeftClientMenuComponent = () => (
  <LeftMenuWrapper>
    {menuOptions.map(({ title, subTitle, path }) => (
      <LeftMenuButtonComponent
        path={path}
        title={title}
        subTitle={subTitle}
        key={title}
      />
    ))}
    <MenuContent flexColumn>
      <Separator />
      <FeedbackText>Made for local.</FeedbackText>
      <FeedbackButton as="a" target="_blank" href="https://forms.gle/XKZM3viPsEfE2bAB9">
        Give Feedback
      </FeedbackButton>
    </MenuContent>
  </LeftMenuWrapper>
);

export default LeftClientMenuComponent;
