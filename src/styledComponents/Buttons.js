// Button File 
// Will hold the different core buttons which will be used across the application

import styled from 'styled-components';

export const Button = styled.div`
    background-color: black;
    height: 30px;
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;
    width: 120px;
`;


// #toDo: move border radius of buttons to global theming

export const FilledButton = styled(Button)`
    background-color: #6558f5;
    margin-right: 40px;
    font-weight: 500;
    font-size: 14px;
    border-radius: 5px;
`;

export const NoBorderButton = styled(Button)`
    color: #6558f5;
    background-color: transparent;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #6558f5;
    width: auto;
    font-size: 15px;
`

export const OutlineButton = styled(Button)`
    color: #8177f7;
    background-color: white;
    border-color: #B3B3F0;
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    font-size: 15px;
`
export const AcceptRejectButton = styled(Button)`
    background-color: ${props => props.status === 'reject' ? '#D3455B': '#1AAE9F'};
    margin-right: 20px;
    font-weight: 500;
    font-size: 14px;
    border-radius: 5px;
`