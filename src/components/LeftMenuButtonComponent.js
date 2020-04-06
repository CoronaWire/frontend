// Left Menu Button Component
// Buttons used within the @LeftSideMenuComponent to display options to users
// E.g. Button for 'News', 'Numbers', 'COVID-19' facts, etc. each with their title and respective
// sub-titles

import React, { Component } from 'react';
import styled from 'styled-components';

const MenuButton = styled.div`
    cursor: pointer;
    background-color: transparent;
    &:hover {
        background-color: #F0F0F0;
    };
    height: auto;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    width: auto;
`

const MenuButtonTitle = styled.p`
    font-size: 14px;
    color: black;
    font-weight: 600;
    text-align: left;
    height: 100%;
    display: block;
    margin-top: 0px;
    margin-bottom: 0px;
`;
const MenuButtonSubTitle = styled.p`
    font-size: 12px;
    color: grey;
    text-align: left;
    width: 100%;
    font-style: italic;
    margin-top: 4px;
    margin-bottom: 4px;
`;

class LeftMenuButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Empty
        }
    }

    render(){
        return (
            <MenuButton> 
                <MenuButtonTitle>
                    {this.props.props.menuTitle} 
                </MenuButtonTitle>
                <MenuButtonSubTitle>
                    {this.props.props.menuSubtitle}
                </MenuButtonSubTitle>
            </MenuButton>
        )
    }
}

export default LeftMenuButtonComponent;
