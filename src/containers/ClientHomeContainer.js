// Container that will contain the Client's UI and UX
// As opposed to the ModeratorHomeContainer which will support
// the moderator interface of the app

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules
import NavigationBarContainer from './NavigationBarContainer';
import NewsDashboard from './NewsDashboard';

const ClientHomeWrapper = styled.div`
    ${({ theme }) => `background-color: ${theme.newsColors.ivory}`};
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 100vh;
`

class ClientHomeContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        } 
        // Might later on hold state such as the category selected 
        // in search bar, the text written in the search bar, etc.
    } // For now, will also contain the retrieved article's, tweets, etc. But
    // those will either be stored in redux state or here. TBD.

    render(){
      return(
        <ClientHomeWrapper>
          <NavigationBarContainer />
          <NewsDashboard />
        </ClientHomeWrapper>
      );
    }
}

export default ClientHomeContainer;
