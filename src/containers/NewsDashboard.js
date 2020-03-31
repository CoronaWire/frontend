// News Dashboard Container which holds the MenuSelectionComponent, NewsListComponent/Container
// and RightSideFeedContainer

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules
import LeftMenuComponent from '../components/LeftMenuComponent';
import MainDashboardComponent from '../components/MainDashboardComponent';
import InformationFeedComponent from '../components/InformationFeedComponent';

const DashboardWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: row;
`

const LeftSideContainer = styled.div`
    width: 18%;
    height: 100%;
    background-color: transparent;
`
const MiddleContainer = styled.div`
    width: 60%;
    height: 100%;
    background-color: transparent;
`

const RightSideContainer = styled.div`
    width: 22%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
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
                    <LeftMenuComponent />
                </LeftSideContainer>
                <MiddleContainer>
                    <MainDashboardComponent />
                </MiddleContainer>
                <RightSideContainer>
                    <InformationFeedComponent />
                </RightSideContainer>
            </DashboardWrapper>
        )
    }
}

export default NewsDashboard;