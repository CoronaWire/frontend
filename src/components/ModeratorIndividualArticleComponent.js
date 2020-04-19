// Moderator Individual Article Component
// Component displaying selected article's current data, also allowing moderators to edit said data, and 
// approve / reject article

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules

const IndividualArticleWrapper = styled.div`
    width: auto;
    height: auto;
    background-color: red;
    display: flex;
    flex-direction: row;
`;


class ModeratorIndividualArticleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render(){
        return (
            <IndividualArticleWrapper>
            </IndividualArticleWrapper>
        )
    }
}

export ModeratorIndividualArticleComponent;
