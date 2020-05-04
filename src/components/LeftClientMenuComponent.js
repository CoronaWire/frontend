// Left Menu Component = News, Numbers, CoronaVirus Facts

import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules
import LeftMenuButtonComponent from './LeftMenuComplexButtonComponent';
import DividingLine from '../styledComponents/DividingLine';

// #toDo: Needs to be connected to parent component, Dashboard and send up the actual news

const LeftMenuWrapper = styled.div`
  background-color: transparent;
  width: 100%
`

const Separator = styled(DividingLine)`
  ${({ theme }) => `background-color: ${theme.newsColors.midGrey}`};
  margin: 32px 24px 16px;
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
   title: 'About Covid-Wire',
   subTitle: 'Donate & learn about the site',
   path: '/about',
 },
];

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
    <Separator />
  </LeftMenuWrapper>
);

export default LeftClientMenuComponent;
