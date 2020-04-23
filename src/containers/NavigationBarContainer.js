// Navigation Bar Container

// External Packages
import React, { Component, PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LogoIcon } from './../components/core';

// Internal Modules
import SearchBarComponent from '../components/SearchBarComponent';
import GlobalTheme from '../styledComponents/GlobalTheme';
import TabularButton from '../styledComponents/TabularButton';

// React-Redux
import store from '../store/store';
import { signoutUser } from '../actionCreators/actions';
import { MobileFeedSelector } from './../components/MobileFeedSelector';
import { media } from './../helpers/media';

// #toDo: move all exports to index.js file to make quicker imports?
// #toDo #UIUX: figure out mobile responsiveness look
// #toDo #toFix: every component re-renders twice

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
    background: ${({ isAuthenticated, theme }) => isAuthenticated ? theme.moderationPlatform.sharedLightGrey : theme.newsColors.ivory};
    padding: 0 24px;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 5;
    flex-direction: row;
    -webkit-box-shadow: 0px 2px 2px rgba(36, 42, 73, 0.1);
    -moz-box-shadow: 0px 2px 2px rgba(36, 42, 73, 0.1);
    box-shadow: 0px 2px 2px rgba(36, 42, 73, 0.1);
    min-width: 640px;
    ${media.mobile`
      flex-direction: column;
      padding: 13px 0 0;
      height: auto;
    `};
`

const NavigationBarHeader = styled.h1`
    font-weight: 900;
    font-size: 26px;
    background-color: transparent;
    margin-left: 20px;
    text-align: left;
    height: auto;
`;
// font-family: oldEnglish;

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

const AuthenticationNavigationText = styled.h4`
    display: inline-block:
    font-size: 13px;
    height: 36px;
    box-sizing: border-box;
    color: black;
    font-weight: 400;
    background-color: transparent;
    text-align: center;
    height: auto;
    margin-top: 29px;
    margin-left: 16px;
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

const NavBarLeftWrapper = styled.div`
    width: 350px;
    height: auto;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const NavBarRightWrapper = styled.div`
    margin-right: 40px;
    width: auto;
    height: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    min-width: 290px;
`

const NavBarButton = styled(TabularButton)`
    height: 100%;
    font-weight: 600;
    padding-top: 30px;
    margin-right: 15px;
    background-color: transparent
`

class AuthenticatedNavigationBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            buttonSelected: 'curate'
        }
    }

    handleButtonToggle = (event) => {
        this.setState({
            buttonSelected: event.target.id
        })
    }

    handleSignOut = () => {
        store.dispatch(signoutUser());
    }

    render(){
        return (
            <NavigationBarWrapper isAuthenticated={this.props.isAuthenticated} GlobalTheme={GlobalTheme} >
                <NavBarLeftWrapper>
                    <NavigationBarHeader> CovidWire </NavigationBarHeader>
                    <AuthenticationNavigationText> Editor </AuthenticationNavigationText>
                </NavBarLeftWrapper>
                <NavBarRightWrapper>
                    <NavBarButton 
                    selectedID={this.state.buttonSelected}
                    onClick={this.handleButtonToggle}
                    id='curate'
                    > 
                    Curate
                    </NavBarButton>
                    {/* <NavBarButton 
                    selectedState={this.state.buttonSelected}
                    onClick={this.handleButtonToggle}
                    id='moderate'
                    > 
                    Moderate 
                    </NavBarButton>
                    <NavBarButton 
                    selectedState={this.state.buttonSelected}
                    onClick={this.handleButtonToggle}
                    id='team'>
                    Team 
                    </NavBarButton> */}
                    <NavBarButton 
                    selectedState={this.state.buttonSelected}
                    onClick={this.handleSignOut}
                    id='signout'
                    > 
                    Sign Out 
                    </NavBarButton>
                </NavBarRightWrapper>
            </NavigationBarWrapper>
        )
    }
}

class UnauthenticatedNavigationBar extends Component {
    render(){
        return (
            <NavigationBarWrapper isAuthenticated={this.props.isAuthenticated} >
            <LogoContainer>
              <LogoIcon width="100%" />
            </LogoContainer>

              <SearchBarContainer>
                <SearchBarComponent />
                {false && this.props.isBrowserAdvanced && (
                  <Button onClick={this.props.findUserLocation}> Find News Near me </Button>
                )}
              </SearchBarContainer>
            <Spacer />
            <SelectorWrapper>
              <MobileFeedSelector />
            </SelectorWrapper>
          </NavigationBarWrapper>
        )
    }
}

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
        return(
            <>
            {
                isAuthenticated === true ? 
                <AuthenticatedNavigationBar findUserLocation={this.findUserLocation} isAuthenticated={isAuthenticated} /> 
                : 
                <UnauthenticatedNavigationBar findUserLocation={this.findUserLocation} isAuthenticated={isAuthenticated} isBrowserAdvanced={this.state.isBrowserAdvanced} />
            }
            </>
            
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


