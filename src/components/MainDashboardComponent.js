// Main Dashboard Component = renders the News Aggregation

// External Packages
import React, { Component } from 'react';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

// Internal Modules
import LoginButton from '../styledComponents/LoginButton';
import GlobalTheme from '../styledComponents/GlobalTheme';


const DashboardHeader = styled.h1`
    font-size: 28px;
    font-weight: 500;
    color: black;
    background-color: transparent;
    text-align: left;
    padding-left: 30px;
    margin-bottom: 0px;
`;

// #toDo: make paddingLeft and marginLeft below 30px

const Button = styled(LoginButton)`
    background-color: white;
    color: black;
    border-radius: 5px;
    border-style: solid;
    border-color: #D3D3D3;
    min-width: 60px;
    width: auto;
    padding-top: 5px;
    padding-bottom: 5px;
    height: 15px;
    &:hover {
        background-color: #F0F0F0;
    }
`;

const ButtonsContainer = styled.div`
    height: 50px;
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

// #toFix: resizing of the button when the bottom border is added
const ScopeButton = styled.button`
    width: auto;
    min-width: 50px;
    height: 100%;
    outline: none;
    background-color: white;
    color: black;
    border-bottom-style: solid;
    border-bottom-color: ${props => props.underlined == true ? 'black': 'white'};
    border-bottom-width: 2px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-top-width: 0px;
    cursor: pointer;
    &:hover {
        background-color: #F0F0F0;
    };
    box-sizing: border-width;
`;

const ScopeContainer = styled.div`
    background-color: red;
    height: 40px;
    width: 100%
    border-bottom-style: solid;
    border-bottom-color: #A9A9A9;
    border-bottom-length: 1px;
    justify-content: flex-start;
    display: flex;
    margin-left: 30px;
    margin-right: 30px;
`;

const ScopeContainerTwo = styled.div`
    background-color: transparent;
    height: 40px;
    width: 100%
    border-bottom-style: solid;
    border-bottom-color: black;
    border-bottom-width: 3px;
    justify-content: flex-start;
    display: flex;
    margin-left: 30px;
    margin-right: 30px;
`
class MainDashboardComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: ['Health', 'Food', 'Public Services', 'Social', 'Housing', 'Labor'],
            scope: ['Local', 'National'],
            scopeClicked: 'Local',
        }
    }

    // handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    
    handleScopeClick = (value) => {
        this.setState({scopeClicked: value})
    }

    // #toDo: figure out the clicked state of the categories button, same grey color?
    
    render(){
        return(
            <div>
            <DashboardHeader>
                News
            </DashboardHeader>
            <ButtonsContainer>
                {this.state.categories.map((value, index) => {
                    return <Button GlobalTheme={GlobalTheme} key={index}>{value}</Button>
                })}
            </ButtonsContainer>
            <ScopeContainerTwo>
                {this.state.scope.map((value, index) => {
                    return <ScopeButton key={index} value={value} onClick={e => this.handleScopeClick(e.target.value)} underlined={this.state.scopeClicked == value ? true : false}> {value} </ScopeButton>
                })}
            </ScopeContainerTwo>
            </div>
        )
    }
}

export default MainDashboardComponent;