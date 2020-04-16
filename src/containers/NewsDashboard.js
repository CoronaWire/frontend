// News Dashboard Container which holds the MenuSelectionComponent, NewsListComponent/Container
// and RightSideFeedContainer

// External Packages
import React, { Component } from 'react';
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
    margin-top: 132px;
  `};
`

const LeftSideContainer = styled.div`
  width: 330px;
  background-color: transparent;
  ${media.mobile`
    display: none;
  `};
`
const MiddleContainer = styled.div`
  flex: 1;
  background-color: transparent;
  ${media.mobile`
    width: 100%;
  `};
`

const RightSideContainer = styled.div`
  width: 330px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  ${media.mobile`
    display: none;
  `};
`

class NewsDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render(){
        return(
            <DashboardWrapper>
                <LeftSideContainer>
                    <LeftClientMenuComponent />
                </LeftSideContainer>
                <MiddleContainer>
                    <NewsDashboardComponent />
                </MiddleContainer>
                <RightSideContainer>
                    <InformationFeedComponent />
                </RightSideContainer>
            </DashboardWrapper>
        )
    }
}

// #toUpgrade: Information Feed Component currently only holds one component (Global News) but needs
// to be extended to also hold a National News component 

export default NewsDashboard;
