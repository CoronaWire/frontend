// Navigation Bar Container

// External Packages
import React, { Component, PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Internal Modules
import SearchBarComponent from '../components/SearchBarComponent';
import GlobalTheme from '../styledComponents/GlobalTheme';

// #toDo: move all exports to index.js file to make quicker imports?
// #toDo #UIUX: figure out mobile responsiveness look
// #toDo #toFix: every component re-renders twice

const NavigationBarWrapper = styled.div`
    width: 100%;
    height: 70px;
    background-color: ${props => props.isAuthenticated === true ? `${props.GlobalTheme.moderationPlatform.sharedLightGrey}` : 'white'};
    display: flex;
    flex-direction: row;
    -webkit-box-shadow: 0px 7px 10px -1px #D8D8D8;
    -moz-box-shadow: 0px 7px 10px -1px #D8D8D8;
    box-shadow: 0px 7px 10px -1px #D8D8D8;
    align-items: center;
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
    padding-left: 20px;
    padding-right: 20px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
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
    border-style: solid;
    border-width: black;
    border-color: black;
    display: flex;
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

class AuthenticatedNavigationBar extends Component {
    constructor(props){
        super(props);
    }

    render(){
        console.log('Props passed are', this.props)
        return (
            <NavigationBarWrapper isAuthenticated={this.props.isAuthenticated} GlobalTheme={GlobalTheme} >
                <NavBarLeftWrapper>
                    <NavigationBarHeader> CoronavirusWire </NavigationBarHeader>
                    <AuthenticationNavigationText> Editor </AuthenticationNavigationText>
                </NavBarLeftWrapper>
            </NavigationBarWrapper>
        )
    }
}

class UnauthenticatedNavigationBar extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <NavigationBarWrapper isAuthenticated={this.props.isAuthenticated} GlobalTheme={GlobalTheme} >
                <NavigationBarHeader> CoronavirusWire </NavigationBarHeader>
                <SearchBarContainer>
                    <SearchBarComponent />
                    {
                        this.props.isBrowserAdvanced 
                        && 
                        <Button onClick={this.props.findUserLocation}> Find News Near me </Button>
                    }
                </SearchBarContainer>
                }
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


