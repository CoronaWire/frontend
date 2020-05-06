// Positioned Wrappers
// Contains a series of div elements that have inherent margin positioning in terms of it's parent container

import styled from 'styled-components';

export const LeftPositionedWrapper = styled.div`
    height: 100%;
    background-color: transparent;
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const MiddleWrapper = styled.div`
    height: 100%;
    background-color: transparent;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-left: 2px solid #DFE6ED;
    border-right: 2px solid #DFE6ED;
    padding-left: 20px;
    padding-right: 10px;
    justify-content: center;
`


export const RightPositionedWrapper = styled.div`
    height: 100%;
    background-color: transparent;
    margin-right: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;