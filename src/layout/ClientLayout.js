import * as React from 'react';
import styled from 'styled-components';
import NavigationBarContainer from './../containers/NavigationBarContainer';
import LeftClientMenuComponent from '../components/LeftClientMenuComponent';
import { media } from './../helpers/media';

const ClientHomeWrapper = styled.div`
  ${({ theme }) => `background-color: ${theme.newsColors.ivory}`};
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`

const DashboardWrapper = styled.div`
  width: 100%;
  margin-top: 80px;
  padding-top: 40px;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  ${media.mobile`
    padding-top: 16px;
    margin-top: 147px;
  `};
`

const LeftSideContainer = styled.div`
  width: 330px;
  position: fixed;
  left: 0;
  top: 120px;
  ${media.mobile`
    display: none;
  `};
`

const MiddleContainer = styled.div`
  flex: 1;
  background-color: transparent;
  padding: 0 330px;
  ${media.mobile`
    width: 100%;
    padding: 0 16px;
  `};
`

const RightSideContainer = styled.div`
  width: 330px;
  top: 120px;
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0 24px;
  ${media.mobile`
    display: none;
  `};
`

export const ClientLayout = ({
  children,
  renderRight = () => null,
}) => (
  <ClientHomeWrapper>
    <NavigationBarContainer />
    <DashboardWrapper>
      <LeftSideContainer>
        <LeftClientMenuComponent />
      </LeftSideContainer>
      <MiddleContainer>
        {children}
      </MiddleContainer>
      <RightSideContainer>
        {renderRight()}
      </RightSideContainer>
    </DashboardWrapper>
  </ClientHomeWrapper>
);
