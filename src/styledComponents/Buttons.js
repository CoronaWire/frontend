// Button File 
// Will hold the different core buttons which will be used across the application

import styled from 'styled-components';

export const Button = styled.div`
    background-color: black;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;
    width: 120px;
    min-width: 90px;
`;


// #toDo: move border radius of buttons to global theming

export const FilledButton = styled(Button)`
    background-color: #6558f5;
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
    color: #8779F1;
    background-color: white;
    border-color: #B3B3F0;
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    font-size: 16px;
    &:hover {
        border-color: #8779F1;
        color: #8779F1;
    }
`

// #toDo: move this red and green to global theming
export const AcceptRejectButton = styled(Button)`
    background-color: ${props => props.status === 'reject' ? '#D3455B': '#1AAE9F'};
    margin-left: 20px;
    font-weight: 500;
    font-size: 14px;
    border-radius: 5px;
    &:hover {
        background-color: ${props => props.status === 'reject' ? '#BF3449': '#139487'};
    }
`