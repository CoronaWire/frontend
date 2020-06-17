// As the name suggests, will hold the core component library for re-usable drop down list selects and their respective options

import styled from 'styled-components';

export const BasicDropDownListWrapper = styled.select`
    width: 60%;
    font-size: 14px;
    background-color: white;
    color: black;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 4px;
`

export const BasicDropDownListOption = styled.option`
    height: 60px;
    background-color: transparent;
    color: black;
`

export const StateDropDownListWrapper = styled.select`
    font-size: 15px;
    font-weight: 500;
    height: 100%;
    background-color: white;
    outline: none;
    color: black;
    cursor: pointer;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: ${props => props.locationFilter === props.selectedState ? '#6558F5' : 'white'};
    min-width: 120px;
    &:hover {
        border-bottom: 3px solid #6558F5;
    }
    border-top: 0px none white;
    border-left: 0px none white;
    border-right: 0px none white;
`

export const StateDropDownOption = styled.option`
    margin: 0px;
    background-color: white;
    color: black;
`

