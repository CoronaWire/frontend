// Left Menu Component = News, Numbers, CoronaVirus Facts

import React, { Component } from 'react';
import styled from 'styled-components';
// Internal Modules
import LeftMenuButtonComponent from './LeftMenuComplexButtonComponent';
import GlobalTheme from '../styledComponents/GlobalTheme';
import DividingLine from '../styledComponents/DividingLine';

// #toDo: Needs to be connected to parent component, Dashboard and send up the actual news

const LeftMenuWrapper = styled.div`
    background-color: transparent;
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
                    menuTitle: 'News',
                    menuSubtitle: "Learn what's reported locally"
                },
                {
                    menuTitle: 'Neighborhood Numbers',
                    menuSubtitle: 'Latest numbers on local resources'
                }, 
                {
                    menuTitle: 'COVID-19 Facts',
                    menuSubtitle: 'Knowledge on the Virus'
                }
            ],
            secondMenuOptions: [
                {
                    menuTitle: 'About Covid-Wire',
                    menuSubtitle: 'Donate & learn about the site'
                },
                {
                    menuTitle: 'Other resources',
                    menuSubtitle: 'Alliance projects and organizations'
                }
            ], 
        }
    }

    render(){
        return(
            <LeftMenuWrapper GlobalTheme={GlobalTheme} >
                    {
                        this.state.menuOptions.map((menuObject, index) => {
                            return <LeftMenuButtonComponent props={menuObject} key={index} />
                        })
                    }
                    <DividingLine />
                    {
                        this.state.secondMenuOptions.map((menuObject, index) => {
                            return <LeftMenuButtonComponent props={menuObject} key={index} />
                        })
                    }
            </LeftMenuWrapper>
        )
    }
}

export default LeftClientMenuComponent;