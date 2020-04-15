// Navigation Bar Container

// External Packages
import React, { Component, PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Internal Modules
import SearchBarComponent from '../components/SearchBarComponent';
import { media } from './../helpers/media';

// #toDo: move all exports to index.js file to make quicker imports?
// #toDo #UIUX: figure out mobile responsiveness look

const NavigationBarWrapper = styled.div`
    width: 100%;
    height: 70px;
    background: ${props => props.isAuthenticated === true ? '#CCB9E9' : 'white'};
    position: fixed;
    top: 0;
    display: flex;
    z-index: 5;
    flex-direction: row;
    -webkit-box-shadow: 0px 7px 10px -1px #D8D8D8;
    -moz-box-shadow: 0px 7px 10px -1px #D8D8D8;
    box-shadow: 0px 7px 10px -1px #D8D8D8;
    ${media.mobile`
      flex-direction: column;
      height: auto;
      padding-bottom: 16px;
    `};
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
    width: 55%;
    padding: 0 20px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    ${media.mobile`
      width: auto;
      padding: 0 16px;
    `};
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

const Button = styled.button`
    background-color: transparent;
    border 1px solid black;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    margin-left: 30px;
    cursor: pointer;
    height: 30px;
    width: 140px;
    border-radius: 5px;
`

class NavigationBarContainer extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
            isBrowserAdvanced: false
        }
    }

    // Ensures that the Find Near Me button only appears with browsers that have the navigation API
    // Navigator Geolocation API available across all web and mobile browsers.
    componentDidMount = () => {
        if (navigator.geolocation) {
            this.setState({
                isBrowserAdvanced: true
            })
        }
    }

    // #toDo: figure out asking users for location flow
    // #toDo: figure out which browsers have access to navigator API
    findUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
        } 
    }

    displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        
        console.log(`longitude: ${ lng } | latitude: ${ lat }`);
    }

    render() {
        const isAuthenticated = this.props.isAuthenticated;
        console.log('state', this.state);

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
                            {
                                this.state.isBrowserAdvanced 
                                && 
                                <Button onClick={this.findUserLocation}> Find News Near me </Button>
                            }
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


