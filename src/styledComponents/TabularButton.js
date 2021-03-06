// Tabular Button
// Core Button Component with line that appears at the bottom when button is clicked
// border-bottom-color and color need to be set up within parent components because of click
// behavior
// Currently rendered in
// - ModeratorArticleFeedComponent
// - NavigationBarContainer

// #toFix: not dynamic enough

import styled from 'styled-components';

const TabularButton = styled.h2`
    font-size: 15px;
    font-weight: 500;
    height: 100%;
    padding-top: 10px;
    background-color: white;
    margin-right: 20px;
    display: inline-block;
    border-bottom-style: solid;
    color: ${props => props.selectedID === props.id ? '#6558F5' : 'black'};
    border-bottom-color: ${props => props.selectedID === props.id ? '#6558F5' : 'transparent'};
    border-bottom-width: 3px;
    min-width: 50px;
    text-align: center;
    cursor: pointer;
`
export default TabularButton;
