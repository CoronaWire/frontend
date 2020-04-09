// Moderator Dashboard Container 

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules
import LeftModeratorMenuComponent from '../components/LeftModeratorMenuComponent';
import MainDashboardComponent from '../components/MainDashboardComponent';
import GlobalTheme from '../styledComponents/GlobalTheme';

// #toDo: move all of these to styledComponent folder 

const DashboardWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: row;
`

const LeftSideContainer = styled.div`
    width: 20%;
    height: 100%;
    background-color: ${props => props.GlobalTheme.leftMenuStyling.backgroundColor} ;
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
                <LeftSideContainer GlobalTheme={GlobalTheme} >
                    <LeftModeratorMenuComponent />
                </LeftSideContainer>
                <MiddleContainer>
                </MiddleContainer>
            </DashboardWrapper>
        )
    }
}

// #toUpgrade: Information Feed Component currently only holds one component (Global News) but needs
// to be extended to also hold a National News component 

export default NewsDashboard;