// Left Menu Button Component
// Buttons used within the @LeftSideMenuComponent to display options to users
// E.g. Button for 'News', 'Numbers', 'COVID-19' facts, etc. each with their title and respective
// sub-titles

// ExternalPackages
import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules
import MenuButton from '../styledComponents/MenuButton';

const MenuButtonWitHover = styled(MenuButton)`
    &:hover {
        background-color: #F0F0F0;
    };
`

// For now, MenuButtonTitle here is the initial design made with Jeff's wireframe.
// The MenuButtonTitle in the Styled Components folder is the one designed by Linda
// #toDo: choose between one design and the other.

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

class LeftMenuComplexButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Empty
        }
    }

    render(){
        return (
            <MenuButtonWitHover> 
                <MenuButtonTitle>
                    {this.props.props.menuTitle} 
                </MenuButtonTitle>
                <MenuButtonSubTitle>
                    {this.props.props.menuSubtitle}
                </MenuButtonSubTitle>
            </MenuButtonWitHover>
        )
    }
}

export default LeftMenuComplexButtonComponent;
