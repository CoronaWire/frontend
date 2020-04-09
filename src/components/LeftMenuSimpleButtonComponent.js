// Left Menu Button Component
// Buttons used within the @LeftModeratorMenuComponent to display options to users

// External Packages
import React, { Component, PureComponent } from 'react';
import styled from 'styled-components';
// Internal Modules
import MenuButton from '../styledComponents/MenuButton';
import MenuButtonTitle from '../styledComponents/MenuButtonTitle';

const MenuButtonTitleWithEffect = styled(MenuButtonTitle)`
    color: ${ props => props.buttonMetaData.buttonTitle === props.buttonMetaData.buttonSelected ? '#B79AFF' : 'black'};
    border-left-width: 3px;
    border-left-color: ${ props => props.buttonMetaData.buttonTitle === props.buttonMetaData.buttonSelected ? '#B79AFF' : 'white'};
    &:hover {
        border-left-color: #B79AFF;
        color: #B79AFF;
    }
`;


class LeftMenuSimpleButtonComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // Empty
        }
    }


    render(){
        const buttonTitle = this.props.props.buttonTitle;
        const {handleButtonClick, buttonSelected} = this.props;

        const buttonMetaData = {
            buttonSelected: buttonSelected,
            buttonTitle: buttonTitle
        }

        return (
            <MenuButton>
                <MenuButtonTitleWithEffect onClick={() => handleButtonClick(buttonTitle)} buttonMetaData={buttonMetaData} >
                    {this.props.props.buttonTitle} 
                </MenuButtonTitleWithEffect>
            </MenuButton>
        )
    }
}

export default LeftMenuSimpleButtonComponent;
