// Left Menu Component = News, Numbers, CoronaVirus Facts

import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules
import LeftMenuButtonComponent from './LeftMenuSimpleButtonComponent';
// React-Redux
import store from '../store/store';
import { signoutUser } from '../actionCreators/actions';
// Styled Components
import GlobalTheme from '../styledComponents/GlobalTheme';
import MenuButton from '../styledComponents/MenuButton';
import MenuButtonTitle from '../styledComponents/MenuButtonTitle'; // MenuButtonTitle does not hav
import DividingLine from '../styledComponents/DividingLine';

const MenuButtonTitleWithEffect = styled(MenuButtonTitle)`
    color: black;
    border-left-width: 3px;
    border-left-color: white;
    &:hover {
        border-left-color: #B79AFF;
        color: #B79AFF;
    }
`;

// #toDo: Needs to be connected to parent component, Dashboard and send up the actual news

const LeftMenuWrapper = styled.div`
    background-color: ${props => props.GlobalTheme.leftMenuStyling.backgroundColor} ;;
    margin-top: ${props => props.GlobalTheme.dashboardStyling.marginTop};
    width: 100%
`
// #toDo: move margin-top to GlobalTheming to ensure that it'll be shared across the Dashboard middle title
// and the main menu buttons

class LeftClientMenuComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuOptions: [
                {
                    buttonTitle: 'Article Feeds',
                },
                {
                    buttonTitle: 'Article Submissions',
                }, 
                {
                    buttonTitle: 'Team Activity',
                }
            ],
            secondMenuOptions: [
                {
                    buttonTitle: 'Resources',
                },
                {
                    buttonTitle: 'Profile',
                }
            ], 
            buttonSelected: 'Article Feeds'
        }
    }

    handleButtonClick = (buttonTitle) => {
        this.setState({
            buttonSelected: buttonTitle
        })
    }

    handleSignOut = () => {
        store.dispatch(signoutUser());
    }

    render(){
        return(
            <LeftMenuWrapper GlobalTheme={GlobalTheme} >
                    {
                        this.state.menuOptions.map((menuObject, index) => {
                            return <LeftMenuButtonComponent props={menuObject} key={index} handleButtonClick={this.handleButtonClick} buttonSelected={this.state.buttonSelected} />
                        })
                    }
                    <DividingLine />
                    {
                        this.state.secondMenuOptions.map((menuObject, index) => {
                            return <LeftMenuButtonComponent props={menuObject} key={index} handleButtonClick={this.handleButtonClick} buttonSelected={this.state.buttonSelected} />
                        })
                    }
                <MenuButton>
                    
                <MenuButtonTitleWithEffect onClick={this.handleSignOut} >
                    Log Out
                </MenuButtonTitleWithEffect>
                </MenuButton>
            </LeftMenuWrapper>
        )
    }
}

export default LeftClientMenuComponent;