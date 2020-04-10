// Navigation Bar Container

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Internal Modules
import SearchBarComponent from '../components/SearchBarComponent';

// #toDo: move all exports to index.js file to make quicker imports?
// #toDo #UIUX: figure out mobile responsiveness look

const NavigationBarWrapper = styled.div`
    width: 100%;
    height: 70px;
    background-color: ${props => props.isAuthenticated === true ? '#CCB9E9' : 'white'};
    display: flex;
    flex-direction: row;
    -webkit-box-shadow: 0px 7px 10px -1px #D8D8D8;
    -moz-box-shadow: 0px 7px 10px -1px #D8D8D8;
    box-shadow: 0px 7px 10px -1px #D8D8D8;
`

const NavigationBarHeader = styled.h1`
    font-weight: 900;
    font-size: 30px;
    letter-spacing: 1px;
    background-color: transparent;
    margin-left: 20px;
    text-align: left;
    position: relative;
    font-family: oldEnglish;
`;

const SearchBarContainer = styled.div`
    width: 33%;
    padding-left: 20px;
    padding-right: 20px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// #toFix: styling of height between nav bar text and nav bar header

const AuthenticationNavigationText = styled.h2`
    display: inline-block:
    font-size: 13px;
    color: black;
    font-weight: 400;
    background-color: transparent;
    margin-left: 14px;
    text-align: center;
`;

class NavigationBarContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render() {
        const isAuthenticated = this.props.isAuthenticated;

        return(
            <NavigationBarWrapper isAuthenticated={isAuthenticated} >
                <NavigationBarHeader> CoronavirusWire </NavigationBarHeader>
                {
                        isAuthenticated === true ?
                        <AuthenticationNavigationText>
                            Editor
                        </AuthenticationNavigationText>
                        :
                        <SearchBarContainer>
                            <SearchBarComponent />
                        </SearchBarContainer>
                }
            </NavigationBarWrapper>
        )
    }
}

NavigationBarContainer.propTypes = {
	isAuthenticated: PropTypes.bool,
};

NavigationBarContainer.defaultProps = {
	isAuthenticated: false
};

function mapStateToProps(state) {
	return {
			isAuthenticated: state.authentication.isAuthenticated
	};
}

export default connect(mapStateToProps)(NavigationBarContainer);


