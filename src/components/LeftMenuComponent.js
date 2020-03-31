// Left Menu Component = News, Numbers, CoronaVirus Facts

import React, { Component } from 'react';
import styled from 'styled-components';

// #toDo: Needs to be connected to parent component, Dashboard and send up the actual news

const LeftMenuWrapper = styled.div`
    background-color: transparent;
    margin-top: 30px;
    width: 100%
`
// #toDo: move margin-top to GlobalTheming to ensure that it'll be shared across the Dashboard middle title
// and the main menu buttons

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

const DividingLine = styled.div`
    height: 1px;
    background-color: black;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
`

class LeftMenuComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            // Empty for now
        }
    }

    render(){
        return(
            <LeftMenuWrapper>
                    <MenuButton> 
                        <MenuButtonTitle>
                            News 
                        </MenuButtonTitle>
                        <MenuButtonSubTitle>
                            Learn what's reported locally
                        </MenuButtonSubTitle>
                    </MenuButton>
                    <MenuButton> 
                        <MenuButtonTitle>
                            Neighborhood Numbers 
                        </MenuButtonTitle>
                        <MenuButtonSubTitle>
                            Latest numbers on local resources
                        </MenuButtonSubTitle>
                    </MenuButton>
                    <MenuButton> 
                        <MenuButtonTitle>
                            Coronavirus Facts 
                        </MenuButtonTitle>
                        <MenuButtonSubTitle>
                            Knowledge on COVID-19
                        </MenuButtonSubTitle>
                    </MenuButton>
                    <DividingLine />
                    <MenuButton> 
                        <MenuButtonTitle>
                            About COVID Wire 
                        </MenuButtonTitle>
                        <MenuButtonSubTitle>
                            Donate and learn about the site
                        </MenuButtonSubTitle>
                    </MenuButton>
                    <MenuButton> 
                        <MenuButtonTitle>
                            Other Resources 
                        </MenuButtonTitle>
                        <MenuButtonSubTitle>
                            Alliance projects and organizations
                        </MenuButtonSubTitle>
                    </MenuButton>
            </LeftMenuWrapper>
        )
    }
}

export default LeftMenuComponent;