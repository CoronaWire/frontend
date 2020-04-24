// Container that will contain the Moderator's UI and UX

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules
import NavigationBarContainer from './NavigationBarContainer';
import ModeratorDashboard from './ModeratorDashboard';

// Same as 'ClientHomeWrapper', create a global one that you store in StyledComponents
const ModeratorHomeWrapper = styled.div`
    background-color: transparent;
    height: 100%;
    width: 100%;
    display: flex,
    justify-content: center;
    align-items: center;
`

class ModeratorHomeContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        
        } 
    } 

    render(){
        return(
            <ModeratorHomeWrapper>
                <NavigationBarContainer />
                <ModeratorDashboard />
            </ModeratorHomeWrapper>
        )
    }
}

export default ModeratorHomeContainer;