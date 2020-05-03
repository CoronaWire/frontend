// News Dashboard Container which holds the MenuSelectionComponent, NewsListComponent/Container
// and RightSideFeedContainer

// External Packages
import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
// Internal Modules
import LeftClientMenuComponent from '../components/LeftClientMenuComponent';
import NewsDashboardComponent from '../components/MainDashboardComponent';
import InformationFeedComponent from '../components/InformationFeedComponent';
import { media } from './../helpers/media';

const DashboardWrapper = styled.div`
  width: 100%;
  margin-top: 70px;
  padding-top: 40px;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  ${media.mobile`
    padding-top: 8px;
    margin-top: 138px;
  `};
`

const LeftSideContainer = styled.div`
  width: 330px;
  position: fixed;
  left: 0;
  top: 112px;
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
  `};
`

const RightSideContainer = styled.div`
  width: 330px;
  top: 112px;
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  ${media.mobile`
    display: none;
  `};
`

const NewsDashboard = () => {
  const isLocalScope = useSelector(({ newsFeed: { scope } = {} }) => scope === 'local');
  return (
    <DashboardWrapper>
      <LeftSideContainer>
        <LeftClientMenuComponent />
      </LeftSideContainer>
      <MiddleContainer>
        <NewsDashboardComponent />
      </MiddleContainer>
      {isLocalScope && (
        <RightSideContainer>
          <InformationFeedComponent />
        </RightSideContainer>
      )}
    </DashboardWrapper>
  );
};

// #toUpgrade: Information Feed Component currently only holds one component (Global News) but needs
// to be extended to also hold a National News component 

export default NewsDashboard;
