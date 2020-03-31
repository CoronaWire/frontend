// Navigation Bar Container

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules
import SearchBarComponent from '../components/SearchBarComponent';

// #toDo: move all exports to index.js file to make quicker imports?
// #toDo #UIUX: figure out mobile responsiveness look

const NavigationBarWrapper = styled.div`
    width: 100%;
    height: 70px;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    -webkit-box-shadow: 0px 7px 10px -1px #D8D8D8;
    -moz-box-shadow: 0px 7px 10px -1px #D8D8D8;
    box-shadow: 0px 7px 10px -1px #D8D8D8;
`

const NavigationBarHeader = styled.h1`
    font-weight: 600;
    font-size: 30px;
    letter-spacing: 2px;
    background-color: transparent;
    margin-left: 20px;
    width: 30%;
    text-align: left;
    positon: relative;
`

const SearchBarContainer = styled.div`
    width: 33%;
    padding-left: 20px;
    padding-right: 20px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`

class NavigationBarContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render() {
        return(
            <NavigationBarWrapper>
                <NavigationBarHeader> COVIDWIRE </NavigationBarHeader>
                <SearchBarContainer>
                    <SearchBarComponent />
                </SearchBarContainer>
            </NavigationBarWrapper>
        )
    }
}

export default NavigationBarContainer;