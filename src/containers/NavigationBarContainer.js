// Navigation Bar Container

// External Packages
import React, { Component, PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LogoIcon } from './../components/core';

// Internal Modules
import SearchBarComponent from '../components/SearchBarComponent';
import { MobileFeedSelector } from './../components/MobileFeedSelector';
import { media } from './../helpers/media';

// #toDo: move all exports to index.js file to make quicker imports?
// #toDo #UIUX: figure out mobile responsiveness look

const LogoContainer = styled.div`
  width: 183px;
  ${media.mobile`
    margin-bottom: 21px;
    width: 137px;
  `};
`;

const NavigationBarWrapper = styled.div`
    width: 100%;
    height: 80px;
    background: ${({ isAuthenticated, theme }) => isAuthenticated ? '#CCB9E9' : theme.newsColors.ivory};
    padding: 0 24px;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 5;
    flex-direction: row;
    box-shadow: 0px 2px 2px rgba(36, 42, 73, 0.1);

    ${media.mobile`
      flex-direction: column;
      padding: 13px 0 0;
      height: auto;
    `};
`

const SearchBarContainer = styled.div`
    width: 55%;
    max-width: 684px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    ${media.mobile`
      width: 100%;
      padding: 0 16px;
      margin-bottom: 18px;
    `};
`;

const Spacer = styled.div`
  width: 183px;
`

const SelectorWrapper = styled.div`
  width: 100%;
  ${media.aboveMobile`
    display: none;
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
            <LogoContainer>
              <LogoIcon width="100%" />
            </LogoContainer>
            {isAuthenticated ? (
                <AuthenticationNavigationText>Editor</AuthenticationNavigationText>
            ) : (
              <SearchBarContainer>
                <SearchBarComponent />
                {false && this.state.isBrowserAdvanced && (
                  <Button onClick={this.findUserLocation}> Find News Near me </Button>
                )}
              </SearchBarContainer>
            )}
            <Spacer />
            <SelectorWrapper>
              <MobileFeedSelector />
            </SelectorWrapper>
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


